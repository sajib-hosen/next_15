import { PostType } from "../interfaces/post-type";

export const getPostById = async (postId: string): Promise<PostType> => {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 108000 }, // 30M
  });

  if (!res.ok) {
    throw new Error("Error getting place holder data");
  }

  return await res.json();
};
