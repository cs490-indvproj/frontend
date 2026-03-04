import React from "react";

const SearchBar = ({ setSearchQuery, buttonPrompt, placeholderPrompt }) => {
  function processSubmit(e) {
    e.preventDefault();
    setSearchQuery(e.target.query.value);
  }
  const bgVariants = {
    lighter:
      "text-foreground border-secondary bg-surface px-4 w-3xs rounded-full border placeholder:text-center",
    darker:
      "text-foreground border-secondary bg-background px-4 w-3xs rounded-full border placeholder:text-center",
  };
  const bgColor =
    buttonPrompt === "Rent" ? bgVariants.darker : bgVariants.lighter;
  return (
    <form onSubmit={processSubmit} className="flex justify-between gap-2">
      <input
        name="query"
        type="text"
        className={bgColor}
        placeholder={placeholderPrompt}
      ></input>
      <button name="submitButton" type="submit" className="btn-std px-3">
        {buttonPrompt}
      </button>
    </form>
  );
};

export default SearchBar;
