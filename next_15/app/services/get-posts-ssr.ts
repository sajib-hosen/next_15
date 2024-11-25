import { PostType } from "../interfaces/post-type";

export const getPostsSSR = async (): Promise<PostType[]> => {
  const url = `https://jsonplaceholder.typicode.com/posts`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error getting place holder data");
  }

  return await res.json();
};
