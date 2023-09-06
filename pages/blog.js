import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import fetch from "isomorphic-unfetch";

export const POSTS_PER_PAGE = 5;

const apiUrl = process.env.NEXT_PUBLIC_BACKEND;

export async function getServerSideProps() {
  const response = await fetch(apiUrl, { method: "POST" });

  const posts = JSON.parse(await response.json());
  console.log("all posts", posts);
  const initialDisplayPosts = posts["initialDisplayPosts"];

  const pagination = {
    currentPage: posts["currentPage"],
    totalPages: posts["totalPages"],
  };

  return {
    props: {
      initialDisplayPosts: initialDisplayPosts || null,
      posts: initialDisplayPosts || null,
      pagination: pagination || null,
    },
  };
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  console.log("blogjs", posts);
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
}
