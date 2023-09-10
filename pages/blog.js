import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import fetch from "isomorphic-unfetch";
import { useState } from "react";
import Pagination from "./Pagination";
import SideWidget from "./side";

export const POSTS_PER_PAGE = 5;

const apiUrl = process.env.NEXT_PUBLIC_BACKEND;

export async function getServerSideProps() {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: 0, pagetype: "blog" }),
  });

  const posts = JSON.parse(await response.json());
  const initialDisplayPosts = posts["initialDisplayPosts"];

  const title = posts["page_title"];
  const searchKeyWord = posts["search_keys_words"];
  const totalPages = posts["totalPages"];

  const pagination = {
    currentPage: posts["currentPage"],
    totalPages: posts["totalPages"],
  };

  return {
    props: {
      initialDisplayPosts: initialDisplayPosts || null,
      title: title || null,
      searchKeyWord: searchKeyWord || null,
      totalPages: totalPages || null,
    },
  };
}

export default function Blog({
  initialDisplayPosts,
  pagination,
  title,
  searchKeyWord,
  totalPages,
}) {
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
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        initialDisplayPosts={currentPosts}
        pagination={pagination}
        pageTitle={title}
        defaultSearch={searchKeyWord}
      />
      <SideWidget />
      <Pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}
