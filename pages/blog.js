import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SideWidget from "./side";
import SearchBar from "@/layouts/searchi";

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
  const seoTitle = posts["seo_title"];
  const seoDes = posts["seo_des"];
  const tags = posts["tags"];

  return {
    props: {
      initialDisplayPosts: initialDisplayPosts || null,
      title: title || null,
      searchKeyWord: searchKeyWord || null,
      totalPages: totalPages || null,
      seoTitle: seoTitle || null,
      seoDes: seoDes || null,
      tags: tags || null,
    },
  };
}

export default function Blog({
  initialDisplayPosts,
  pagination,
  title,
  searchKeyWord,
  totalPages,
  seoTitle,
  seoDes,
  tags,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(initialDisplayPosts);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchUrl = process.env.NEXT_PUBLIC_BACKEND_SEARCH;
      console.log(searchUrl);
      console.log(query);
      if (!query) {
        return;
      }
      const response = await fetch(searchUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: 0, keywords: query }),
      });

      const data = JSON.parse(await response.json());

      if (!data) {
        return;
      }
      const newPosts = data["initialDisplayPosts"];
      setCurrentPosts(newPosts);
      setCurrentPage(data["currentPage"]);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      <PageSEO title={seoTitle} description={seoDes} />

      <div className="space-y-2 pt-6 pb-8 md:space-y-4">
        <h1 className="text-center text-2xl font-extrabold leading-6 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          {title}
        </h1>
        <SearchBar query={query} setQuery={setQuery} suggestion={tags} />
      </div>

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
