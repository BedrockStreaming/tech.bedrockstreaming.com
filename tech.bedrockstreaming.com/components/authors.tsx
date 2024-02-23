import Author from "../interfaces/author";
import Link from "next/link";

const Authors = ({ authors }: { authors: Author[] }) => {
  if (!authors) return null;
  return (
    <>
      {authors?.map(({ name, picture, url }, index) => {
        let authorTag = (
          <div className={"flex items-center uppercase"} key={name}>
            {picture && (
              <img
                src={picture}
                className="h-6 rounded-full mr-1.5"
                alt={name}
              />
            )}
            {name}
            {index + 1 < authors.length && `  -`}
          </div>
        );

        if (url) {
          return (
            <Link href={url} className={"hover:text-orange-500"} key={name}>
              {authorTag}
            </Link>
          );
        }

        return authorTag;
      })}
    </>
  );
};

export default Authors;
