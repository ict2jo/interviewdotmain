"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";

export async function createUser(formData) {
  const data = { id, name, email };
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
