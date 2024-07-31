import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "./mdx-components";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <MDXRemote source={content} components={components} />
    </div>
  );
};

export default PostBody;
