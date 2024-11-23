"use client";

import { PostType } from "@/app/interfaces/post-type";
import { fetcher } from "@/app/services/fetcher-api";
import useSWR from "swr";

export default function DataComponent() {
  const { data, error, isLoading } = useSWR<PostType[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  if (isLoading) return <div className=" p-16 text-center">Loading...</div>;
  if (error)
    return <div className=" p-16 text-center">Error: {error.message}</div>;
  if (data)
    return (
      <div className=" p-16">
        <h1>Data: {new Date().toLocaleString()}</h1>
        <ul className="">
          {data.map((item) => (
            <li className=" py-2" key={item.id}>
              <p>{item.title}</p>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );

  return null;
}
