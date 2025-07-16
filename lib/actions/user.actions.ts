"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const getCurrentUser = async () => {
  const sessionClient = await createSessionClient();
  return await sessionClient.account.get();
};

export const logout = async () => {
  const sessionClient = await createSessionClient();
  return await sessionClient.account.deleteSession("current");
};

export const getUserById = async (id: string) => {
  const { users } = await createAdminClient();
  return users.get(id);
};

export const sendEmailOtp = async (email: string) => {
  const { account } = await createAdminClient();

  const token = await account
    .createEmailToken(ID.unique(), email)
    .catch((e) => {
      console.error("Error createEmailToken", e);
      throw e;
    });

  return token.userId;
};

export const verifyOtp = async (userId: string, code: string) => {
  const { account } = await createAdminClient();

  const session = await account.createSession(userId, code).catch((e) => {
    console.error("Error createSession", e);
    throw e;
  });

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    expires: new Date(session.expire),
  });

  return session.$id;
};
