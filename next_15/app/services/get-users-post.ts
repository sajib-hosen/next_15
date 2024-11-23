import { PostType } from "../interfaces/post-type";

export const getUsersPosts = async (userId: string): Promise<PostType[]> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/users/${userId}/posts`;

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
