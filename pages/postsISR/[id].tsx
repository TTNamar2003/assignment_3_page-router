import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

interface Post {
  id: number;
  title: string;
  views: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();

  const paths = data.posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", 
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async (context) => {
  const { id } = context.params as { id: string };

  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    return { notFound: true }; 
  }

  const post: Post = await res.json();

  return {
    props: { post },
    revalidate: 60, 
  };
};

export default function PostDetails({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4 text-gray-600">Views: {post.views}</p>
    </div>
  );
}
