import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import Comments from "@/components/comments";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SideWidget from "pages/side";

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`;

const postDateTemplate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function PostLayout({ mdxSource, frontMatter }) {
  const tags = frontMatter.tags;
  const date = frontMatter.date;
  const title = frontMatter.title;
  const slug = frontMatter.slug;
  const sideData = frontMatter.sideData;

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
            <div className="">
              {tags && (
                <div className="">
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>
          <div className="space-y-4 leading-relaxed tracking-wide">
            <div>
              <div className="prose max-w-none pt-5 tracking-widest dark:prose-dark">
                {mdxSource}
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer></footer>
          </div>
        </div>
      </article>
      <SideWidget widgetData={sideData} />
    </SectionContainer>
  );
}
