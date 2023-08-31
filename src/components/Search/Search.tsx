import { useState } from "react";

interface SearchProps {
  onSearchChange: (searchValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
