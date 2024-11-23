import React from "react";
import BaseCSR from "./_components/BaseCSR";
import Image from "next/image";

// export const revalidate = 60 * 60; // 1H  validate the page after 60 * 60 s

const CSRPage = async () => {
  // Client-side Rendering (CSR)
  // https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
    next: { revalidate: 60 * 60 }, // validate the request after 60 * 60 s
  });

  const data = await res.json();

  // console.log(`data ${new Date().toLocaleString()} >>`, data);

  return (
    <div className=" text-center p-10">
      {/* THIS PART IS STATIC  */}
      <div className=" border border-green-500">
        <p>This is CSR, generated at {new Date().toLocaleString()}</p>
        <p>{JSON.stringify(data)}</p>
        <Image src={`/images/p2.jpg`} width={3000} height={2000} alt="p1" />
      </div>

      {/* THIS PART OF THE PAGE IS CLENT  */}
      <BaseCSR />
    </div>
  );
};

export default CSRPage;
