import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h1>Search</h1>
      <input type="text" />
      <h1>{search}</h1>
      <button>Search</button>
    </div>
  );
};

export default Search;
