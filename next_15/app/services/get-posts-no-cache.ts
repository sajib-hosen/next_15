import { PostType } from "../interfaces/post-type";

export const getPostsNoCache = async (): Promise<PostType[]> => {
  const url = `https://jsonplaceholder.typicode.com/posts`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache", // This ensures the data is cached like static generation
  });

  if (!res.ok) {
    throw new Error("Error getting place holder data");
  }

  return await res.json();
};
