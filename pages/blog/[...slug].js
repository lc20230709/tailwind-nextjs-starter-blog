import PageTitle from "@/components/PageTitle";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { formatSlug, getFileBySlug } from "@/lib/mdx";

const DEFAULT_LAYOUT = "PostLayout";

export async function getStaticPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND;

  const response = await fetch(apiUrl, { method: "POST" });

  const allposts = JSON.parse(await response.json());
  const posts = allposts["initialDisplayPosts"];

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p.slug).split("/"),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND;
  const response = await fetch(apiUrl, { method: "POST" });

  const allPosts = JSON.parse(await response.json())["initialDisplayPosts"];

  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join("/")
  );

  console.log(params.slug, "12377788");
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", params.slug.join("/"));
  const authorList = post.frontMatter.authors || ["default"];
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author]);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);
  return { props: { post, authorDetails, prev, next } };
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
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
