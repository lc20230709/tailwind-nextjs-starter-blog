import siteMetadata from "@/data/siteMetadata";
import projectsData from "@/data/projectsData";
import Card from "@/components/Card";
import { PageSEO } from "@/components/SEO";
import SideWidget from "./side";

const sideUrl = process.env.NEXT_PUBLIC_BACKEND_SIDE;

export async function getServerSideProps() {
  const responseSide = await fetch(sideUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: 0 }),
  });
  const sideData = JSON.parse(await responseSide.json())["initialDisplayPosts"];
  return {
    props: { sideData },
  };
}

export default function Projects({ sideData }) {
  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            商务合作
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            本站采用React+FastAPI, 20万篇文章，毫秒内响应
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            <div className="rounded-lg bg-white p-8 shadow-md transition duration-300 ease-in-out dark:bg-gray-800">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                在现代的技术环境下，一个出色的博客平台不仅需要内容丰富，更需要在技术上具备
                <span className="font-semibold">强大的支撑</span>
                。我们的网站正是基于这样的理念构建的。通过使用
                <span className="italic">React和FastAPI</span>
                ，我们的平台在多个方面展示了出色的技术能力。
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                首先，<span className="font-semibold">React</span>
                作为前端框架，带来了极高的用户交互体验。通过虚拟DOM和组件化设计，页面加载速度快，用户界面美观且直观。这意味着用户可以更高效地浏览、搜索和阅读20万篇的博客内容。
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                其次，在后端，<span className="font-semibold">FastAPI</span>
                作为现代、快速（高性能）的Web框架，提供了强大的数据处理能力。借助于Python的异步编程，FastAPI能够轻松处理大量并发请求，确保数据传输的稳定和快速。
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                更重要的是，这个结合也带来了高度的安全性。FastAPI内置了多种安全机制，包括数据验证、身份验证和授权。这保证了用户数据的安全，同时也为可能的商务合作提供了坚实的基础。
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                除此之外，由于这两个框架都是高度可扩展的，我们的平台具备了极大的灵活性。无论是增加新功能，还是进行数据分析和SEO优化，都能快速实施，以适应不断变化的市场需求。
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                总体而言，我们的博客平台在技术上具有
                <span className="font-semibold">强大的综合实力</span>
                ，不仅能提供优质的用户体验，也能快速适应和拓展商务需求。这使得我们的平台成为一个具有广泛应用前景和商务合作潜力的优秀产品。
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                如果您对我们的技术有进一步的兴趣，或希望进行商务合作，非常欢迎您通过邮件与我们联系：
                <a
                  href="mailto:long.chen73689@gmail.com"
                  className="text-blue-500 underline dark:text-blue-400"
                >
                  long.chen73689@gmail.com
                </a>
                我们期待与您的合作！
              </p>
            </div>
          </div>
        </div>
      </div>
      <SideWidget widgetData={sideData} />
    </>
  );
}
