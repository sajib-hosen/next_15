import React from "react";

const page = () => {
  // Server-side Rendering (SSR)
  // https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering

  //   If a page uses Server-side Rendering, the page HTML is generated on each request.

  // To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.
  // As you can see, getServerSideProps is similar to getStaticProps, but the difference is that getServerSideProps is run on every request instead of on build time.

  return <div>This is SSR</div>;
};

export default page;
