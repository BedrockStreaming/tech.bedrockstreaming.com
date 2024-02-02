import Author from "../interfaces/author";

const Authors = ({ authors }: { authors: Author[] }) => {
  //TODO: handle arrays
  if (!authors) return null;
  return (
    <>
      {authors?.map(({ name, picture }, index) => (
        <span className={"inline-flex"} key={name}>
          {picture && (
            <img src={picture} className="h-6 rounded-full mr-1.5" alt={name} />
          )}
          {name}
          {index + 1 < authors.length && `  -`}
        </span>
      ))}
    </>
  );
};

export default Authors;
