"use server";

import { cookies } from "next/headers";
import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
  Users,
} from "node-appwrite";
import { appwriteConfig } from "./config";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  const appwriteSession = (await cookies()).get("appwrite-session");
  if (!appwriteSession || !appwriteSession.value) {
    throw new Error("No Session");
  }

  client.setSession(appwriteSession.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
