import PageTitle from "@/components/PageTitle";
import { formatSlug, getFileBySlug } from "@/lib/mdx";
import PostLayout from "@/layouts/PostLayout";

const DEFAULT_LAYOUT = "PostLayout";

export async function getStaticPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_SLUGS;

  const response = await fetch(apiUrl, { method: "POST" });
  const slugs = JSON.parse(await response.json())["slug"];

  return {
    paths: slugs.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("blog", params.slug.join("/"));
  return { props: { post } };
}

export default function Blog({ post }) {
  const { mdxSource, toc, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout mdxSource={mdxSource} frontMatter={frontMatter} />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
