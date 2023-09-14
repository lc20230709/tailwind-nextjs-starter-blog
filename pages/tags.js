import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import kebabCase from "@/lib/utils/kebabCase";

export async function getServerSideProps() {
  const tagUrl = process.env.NEXT_PUBLIC_GETTAG;
  const response = await fetch(tagUrl, { method: "POST" });
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
      <div className="flex flex-col items-start justify-start  md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
