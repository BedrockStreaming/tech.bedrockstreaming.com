import Authors from "./authors";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author[];
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <div
        className={
          "flex flex-col items-center p-4 pt-16 bg-gradient-to-br from-white to-neutral-100"
        }
      >
        <PostTitle>{title}</PostTitle>
        <div className="mb-4 flex flex-wrap items-center gap-1 text-lg text-neutral-500">
          <Authors authors={author} />
          <span>-</span>
          <DateFormatter dateString={date} />
        </div>
      </div>
      <div className="hidden md:block md:mb-12"></div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Authors authors={author} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
