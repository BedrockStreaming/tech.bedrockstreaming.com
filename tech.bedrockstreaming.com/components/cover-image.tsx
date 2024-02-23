import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  if (!src) {
    return null;
  }
  const image = (
    <Image
      src={src || "/assets/blog/dynamic-routing/cover.jpg"}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200 rounded": slug,
      })}
      fill={true}
      style={{
        objectFit: "cover",
      }}
    />
  );
  return (
    <div className="sm:mx-0 relative w-full h-64">
      {slug ? (
        <Link
          as={`/posts/${slug}`}
          href="/tech.bedrockstreaming.com/app/posts/[slug]"
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
