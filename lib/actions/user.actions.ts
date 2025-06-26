"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  return createSessionClient()
    .then((sessionClient) => sessionClient.account.get())
    .catch(() => {
      redirect("/login");
    });
};

export const logout = async () => {
  return createSessionClient()
    .then((sessionClient) => sessionClient.account.deleteSession("current"))
    .finally(async () => {
      redirect("/login");
    });
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
    sameSite: "strict",
    secure: true,
  });

  return session.$id;
};
