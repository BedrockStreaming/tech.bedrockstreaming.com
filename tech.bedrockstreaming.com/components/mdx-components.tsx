import Link from "next/link";

export const components = {
  h1: (props) => <h1 style={{ all: "revert" }}>{props.children}</h1>,
  h2: (props) => <h2 style={{ all: "revert" }}>{props.children}</h2>,
  h3: (props) => <h3 style={{ all: "revert" }}>{props.children}</h3>,
  h4: (props) => <h4 style={{ all: "revert" }}>{props.children}</h4>,
  h5: (props) => <h5 style={{ all: "revert" }}>{props.children}</h5>,
  h6: (props) => <h6 style={{ all: "revert" }}>{props.children}</h6>,
  a: (props) => (
    <Link
      className={
        "text-orange-500 hover:text-neutral-500 hover:underline transition-all"
      }
      {...props}
    />
  ),
  ul: (props) => <ul style={{ all: "revert" }}>{props.children}</ul>,
  ol: (props) => <ol style={{ all: "revert" }}>{props.children}</ol>,
  li: (props) => <li style={{ all: "revert" }}>{props.children}</li>,
  hr: (props) => <hr style={{ all: "revert" }} />,
  code: (props) => (
    <code className={"bg-neutral-200 text-sm rounded-md"} {...props} />
  ),
  pre: (props) => (
    <pre className={"bg-neutral-200 p-4 rounded-md"} {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className={"border-l-4 border-neutral-500 pl-4 py-3 bg-neutral-100 my-2"}
    >
      {props.children}
    </blockquote>
  ),
};
