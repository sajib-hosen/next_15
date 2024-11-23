import React from "react";

const page = () => {
  // Partial Prerendering (PPR)

  // Partial Prerendering (PPR) enables you to combine static and dynamic components together in the same route.

  // During the build, Next.js prerenders as much of the route as possible. If dynamic code is detected, like reading from the incoming request, you can wrap the relevant component with a React Suspense boundary. The Suspense boundary fallback will then be included in the prerendered HTML.

  return <div>this is PPR</div>;
};

export default page;
