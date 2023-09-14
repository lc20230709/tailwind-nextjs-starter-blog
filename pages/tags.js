import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import kebabCase from "@/lib/utils/kebabCase";

export async function getServerSideProps() {
  const tagUrl = process.env.NEXT_PUBLIC_GETTAG;
  const response = await fetch(tagUrl, {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const tags = JSON.parse(await response.json())["tags"];
  return { props: { tags } };
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  const keys = Object.keys(tags).join(" ");

  return (
    <>
      <PageSEO
        title={`标签 - ${keys}`}
        description={`感兴趣的标签内容${keys}`}
      />
      <div className="container mx-auto p-4 transition dark:bg-gray-800">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
          标签
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Object.keys(tags).length === 0 && (
            <p className="w-full text-center text-gray-500 dark:text-gray-400">
              No tags found.
            </p>
          )}
          {sortedTags.map((t) => (
            <div
              key={t}
              className="flex flex-col items-center rounded-lg border bg-white p-4 shadow transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-700"
            >
              <Tag text={t} />
              <Link
                href={`/tags/${kebabCase(t)}`}
                className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                {`(${tags[t]})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
