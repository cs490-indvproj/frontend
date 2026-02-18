import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  function processSubmit(e) {
    e.preventDefault();
    setSearchQuery(e.target.query.value);
    console.log(e.target.query.value);
  }

  return (
    <form onSubmit={processSubmit} className="flex justify-between gap-2">
      <input
        name="query"
        type="text"
        className="text-foreground border-secondary bg-surface rounded-full
          border px-4"
      ></input>
      <button name="submitButton" type="submit" className="btn-std px-3">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
