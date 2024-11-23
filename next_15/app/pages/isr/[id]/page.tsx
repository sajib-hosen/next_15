import { PostType } from "@/app/interfaces/post-type";
import { getPostById } from "@/app/services/get-post";
// import { getPosts } from "@/app/services/get-posts";
import Link from "next/link";
import React, { FC } from "react";

// Revalidate every 60 seconds (ISR)
export const revalidate = 108000; // 30M

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  //   const posts = await getPosts();

  //   return posts.map((e) => {
  //     return {
  //       id: e.id.toString(),
  //     };
  //   });

  const postsId = ["1", "2", "3", "4", "5"]; // rest of page will be generated as ISR on demand

  return postsId.map((e) => {
    return {
      id: e.toString(),
    };
  });
}

const ProductPage: FC<PageProps> = async ({ params }) => {
  const par = await params;
  const post: PostType = await getPostById(par.id);

  console.log(
    `post ${par.id} updated ${new Date().toLocaleString()} >>`,
    post.title
  );

  return (
    <main className=" p-10">
      <Link className=" pb-2 underline" href={`/pages/isr`}>
        go back
      </Link>
      <p className=" pb-4 italic">
        Last updated at {new Date().toLocaleString()}
      </p>

      <h1>page id {par.id}</h1>
      <p>{post.title}</p>

      <p>{post.body}</p>
    </main>
  );
};

export default ProductPage;
