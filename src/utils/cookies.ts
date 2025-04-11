"use server";

import { cookies } from "next/headers";

export default async function fetchAccessToken() {
  const cookieStore = cookies();
  return cookieStore.get("next-auth.accessToken")?.value;
}

export async function deleteAccessToken() {
  cookies().delete("next-auth.accessToken");
}
