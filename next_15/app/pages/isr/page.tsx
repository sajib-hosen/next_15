import { getPosts } from "@/app/services/get-posts";
// import { getUsers } from "@/app/services/get-users";
import Link from "next/link";
import React from "react";

const Page = async () => {
  // Incremental Static Regeneration (ISR)
  // https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration

  // Incremental Static Regeneration (ISR) enables you to:

  // Update static content without rebuilding the entire site
  // Reduce server load by serving prerendered, static pages for most requests
  // Ensure proper cache-control headers are automatically added to pages
  // Handle large amounts of content pages without long next build times

  const posts = await getPosts();

  // const users = await getUsers();

  // console.log("users >>", users);

  console.log(`posts generated ${new Date().toLocaleString()}`, posts.length);

  return (
    <main className=" p-10">
      <p className=" pb-4 italic">
        ISR, Generated at {new Date().toLocaleString()}
      </p>

      {posts.length
        ? posts.map((it) => (
            <div className=" py-2" key={it.id}>
              <Link href={`/pages/isr/${it.id}`}>{it.title}</Link>
            </div>
          ))
        : null}
    </main>
  );
};

export default Page;
