import { TagSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import kebabCase from "@/lib/utils/kebabCase";

import SideWidget from "pages/side";

import Pagination from "pages/Pagination";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND;
const tagUrl = process.env.NEXT_PUBLIC_GETTAG;

export async function getStaticPaths() {
  const response = await fetch(tagUrl, { method: "POST" });
  const tagsRes = await response.json();
  const tags = JSON.parse(tagsRes)["tags"];

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const tagLists = process.env.NEXT_PUBLIC_BACKEND_TAG;
  const response = await fetch(tagLists, { method: "POST",    headers: { "Content-Type": "application/json" },body: JSON.stringify({ page: 0, pagetype: "tag", tag:params.tag }) });

  const posts = JSON.parse(await response.json());
  const initialDisplayPosts = posts["initialDisplayPosts"];


  const searchKeyWord = posts["search_keys_words"];
  const totalPages = posts["totalPages"];

  return { props: { 
      initialDisplayPosts: initialDisplayPosts || null,
      totalPages: totalPages || null,
      tag: params.tag || null
   } };
}

export default function Tag({ initialDisplayPosts,totalPages,tag }) {
  // Capitalize first letter and convert space to dash
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(initialDisplayPosts);
  const handlePageChange = async (pageIn) => {
    setCurrentPage(pageIn);
    const response = await fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pageIn }),
    });

    const data = JSON.parse(await response.json());
    const newPosts = data["initialDisplayPosts"];
    setCurrentPosts(newPosts);
  };
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout initialDisplayPosts={initialDisplayPosts} pageTitle={tag} defaultSearch={tag} />
      <SideWidget />
    </>
  );
}
