import Link from "next/link";
import kebabCase from "@/lib/utils/kebabCase";

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a
        className="text-1xl mr-3 font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        {text.split(" ").join("-")}
      </a>
    </Link>
  );
};

export default Tag;
