import Authors from "./authors";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author[];
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <article>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/tech.bedrockstreaming.com/app/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="mb-4 inline-flex flex-wrap items-center gap-1 text-xl font-medium">
        <Authors authors={author} />
        <span>-</span>
        <DateFormatter dateString={date} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </article>
  );
};

export default PostPreview;
