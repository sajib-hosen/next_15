import { getPostsSSR } from "@/app/services/get-posts-ssr";
import React from "react";

const page = async () => {
  // Server-side Rendering (SSR)
  // https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

  //   If a page uses Server-side Rendering, the page HTML is generated on each request.

  // To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.
  // As you can see, getServerSideProps is similar to getStaticProps, but the difference is that getServerSideProps is run on every request instead of on build time.

  const posts = await getPostsSSR();

  return (
    <div>
      <div className=" px-10">
        <p className=" text-center underline italic pb-4">
          SSR, Generated at: {new Date().toLocaleString()}
        </p>

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
    </div>
  );
};

export default page;
