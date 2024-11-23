import { UserType } from "../interfaces/user-type";

export const getUsers = async (): Promise<UserType[]> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/users`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    throw new Error("Error getting place holder data");
  }

  return await res.json();
};
