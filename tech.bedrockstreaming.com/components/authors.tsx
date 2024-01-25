import Author from "../interfaces/author";

const Authors = ({ authors }: { authors: Author[] }) => {
  //TODO: handle arrays
  if (!authors) return null;
  return authors?.map(({ name, picture }) => (
    <div className="flex items-center">
      {picture && (
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      )}
      <div className="text-xl font-bold">{name}</div>
    </div>
  ));
};

export default Authors;
