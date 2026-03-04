import React from "react";

const CustomerSearchBar = ({ setSearchQuery }) => {
  function handleChange(e) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  return (
    <div className="flex justify-between gap-2">
      <input
        name="query"
        type="text"
        className="text-foreground border-secondary bg-surface w-3xs
          rounded-full border px-4 placeholder:text-center"
        placeholder="Search"
        onInput={handleChange}
      ></input>
    </div>
  );
};

export default CustomerSearchBar;
