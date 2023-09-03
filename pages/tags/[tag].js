import { TagSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import kebabCase from "@/lib/utils/kebabCase";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND;
const tagUrl = process.env.NEXT_PUBLIC_GETTAG;

export async function getStaticPaths() {
  const response = await fetch(tagUrl, { method: "POST" });

  const tags = JSON.parse(await response.json())["tags"];
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
  const response = await fetch(apiUrl, { method: "POST" });

  const allPosts = JSON.parse(await response.json())["initialDisplayPosts"];
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true &&
      post.tags.map((t) => kebabCase(t)).includes(params.tag)
  );

  console.log(filteredPosts);
  return { props: { posts: filteredPosts, tag: params.tag } };
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
}
