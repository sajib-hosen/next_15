// import { PostType } from "@/app/interfaces/post-type";
// import { getPosts } from "@/app/services/get-posts";
// import React, { FC } from "react";

// import { PostType } from "@/app/interfaces/post-type";
import { getPostsNoCache } from "@/app/services/get-posts-no-cache";

const SSGPage = async () => {
  // Static Site Generation (SSG)
  // https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation
  // If a page uses Static Generation, the page HTML is generated at build time. That means in production,
  // the page HTML is generated when you run next build. This HTML will then be reused on each request. It
  // can be cached by a CDN.

  // 1, Static Generation without data
  // By default, Next.js pre-renders pages using Static Generation without fetching data. Here's an example:
  // function About() {
  //   return <div>About</div>
  // }
  // export default About

  // 2, Static Generation with data

  const posts = await getPostsNoCache();

  return (
    <div className=" p-10">
      <h2>
        This is SSG,{" "}
        <span className="italic text-sm underline">
          Generated at: {new Date().toLocaleString()}
        </span>
      </h2>

      <div>
        {posts.length
          ? posts.map((e) => (
              <div className=" py-3" key={e.id}>
                <h3 className=" font-semibold">{e.title}</h3>
                <p>{e.body}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SSGPage;
