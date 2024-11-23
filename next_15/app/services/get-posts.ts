import { PostType } from "../interfaces/post-type";

export const getPosts = async (): Promise<PostType[]> => {
  const url = `https://jsonplaceholder.typicode.com/posts`;

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
