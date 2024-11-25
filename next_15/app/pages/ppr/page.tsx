import React from "react";

export const experimental_ppr = true;

const page = () => {
  // Partial Prerendering (PPR)

  // Partial Prerendering (PPR) enables you to combine static and dynamic components together in the same route.

  // During the build, Next.js prerenders as much of the route as possible. If dynamic code is detected, like reading from the incoming request, you can wrap the relevant component with a React Suspense boundary. The Suspense boundary fallback will then be included in the prerendered HTML.

  // https://nextjs.org/docs/app/api-reference/next-config-js/ppr
  // is not available  in this version.

  return (
    <div className=" text-center">PPR is not supported in this version</div>
  );
};

export default page;
