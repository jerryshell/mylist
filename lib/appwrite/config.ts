export const appwriteConfig = {
  endpoint: process.env.NEXT_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_APPWRITE_DATABASE_ID!,
  collectionUserFileId: process.env.NEXT_APPWRITE_COLLECTION_USER_FILE_ID!,
  bucketId: process.env.NEXT_APPWRITE_BUCKET_ID!,
  apiKey: process.env.NEXT_APPWRITE_API_KEY!,
};
