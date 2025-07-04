"use server";

import { InputFile } from "node-appwrite/file";
import { getCurrentUser } from "./user.actions";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, totalSizeInBytes } from "../utils";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

export const uploadFile = async ({ file }: { file: File }) => {
  const currentUser = await getCurrentUser();

  const { storage, databases } = await createAdminClient();

  const inputFile = InputFile.fromBuffer(file, file.name);

  const bucketFile = await storage.createFile(
    appwriteConfig.bucketId,
    ID.unique(),
    inputFile,
  );

  const userFileDocument = {
    name: bucketFile.name,
    url: constructFileUrl(bucketFile.$id),
    type: getFileType(bucketFile.name).type,
    bucketFileId: bucketFile.$id,
    userId: currentUser.$id,
    extension: getFileType(bucketFile.name).extension,
    size: bucketFile.sizeOriginal,
    sharedUser: [],
  };

  return await databases
    .createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionUserFileId,
      ID.unique(),
      userFileDocument,
    )
    .catch(async (e) => {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
      console.error("Failed to upload file", e);
      throw e;
    });
};

const buildQueryList = (
  currentUser: Models.User<Models.Preferences>,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queryList = [
    Query.or([
      Query.equal("userId", [currentUser.$id]),
      Query.contains("sharedUser", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) {
    queryList.push(Query.equal("type", types));
  }

  if (searchText) {
    queryList.push(Query.contains("name", searchText));
  }

  if (limit) {
    queryList.push(Query.limit(limit));
  }

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");

    queryList.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }

  return queryList;
};

export const getUserFileList = async ({
  types = [],
  searchText = "",
  sort,
  limit,
}: {
  types: string[];
  searchText?: string;
  sort?: string;
  limit?: number;
}) => {
  const currentUser = await getCurrentUser();

  const { databases } = await createAdminClient();

  sort = sort ? sort : "$createdAt-desc";

  const queryList = buildQueryList(currentUser, types, searchText, sort, limit);

  const userFileList = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.collectionUserFileId,
    queryList,
  );

  return userFileList;
};

export const renameFile = async ({
  fileId,
  name,
  extension,
}: {
  fileId: string;
  name: string;
  extension: string;
}) => {
  const { databases } = await createAdminClient();

  const newName = `${name}.${extension}`;
  const updatedFile = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionUserFileId,
    fileId,
    {
      name: newName,
    },
  );

  return updatedFile;
};

export const updateSharedUser = async ({
  fileId,
  emailList,
}: {
  fileId: string;
  emailList: string[];
}) => {
  const { databases } = await createAdminClient();

  const updatedFile = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionUserFileId,
    fileId,
    {
      sharedUser: emailList,
    },
  );

  return updatedFile;
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
}: {
  fileId: string;
  bucketFileId: string;
}) => {
  const { databases, storage } = await createAdminClient();

  const deletedFile = await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionUserFileId,
    fileId,
  );

  if (deletedFile) {
    await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
  }

  return { status: "success" };
};

declare type FileType = "document" | "image" | "video" | "audio" | "other";

export async function getTotalSpaceUsed() {
  const currentUser = await getCurrentUser();

  const { databases } = await createAdminClient();

  const userFileList = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.collectionUserFileId,
    [Query.equal("userId", [currentUser.$id]), Query.limit(40960)],
  );

  const totalSpace = {
    image: { size: 0, latestDate: "" },
    document: { size: 0, latestDate: "" },
    video: { size: 0, latestDate: "" },
    audio: { size: 0, latestDate: "" },
    other: { size: 0, latestDate: "" },
    used: 0,
    all: totalSizeInBytes,
  };

  userFileList.documents.forEach((file) => {
    const fileType = file.type as FileType;
    totalSpace[fileType].size += file.size;
    totalSpace.used += file.size;

    if (
      !totalSpace[fileType].latestDate ||
      new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
    ) {
      totalSpace[fileType].latestDate = file.$updatedAt;
    }
  });

  return totalSpace;
}
