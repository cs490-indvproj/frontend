import React from "react";

const SearchDropdown = ({
  searchTypeObjArray,
  selectedSearchType,
  setSelectedSearchType,
}) => {
  return (
    <label className="text-foreground flex gap-2 hover:cursor-pointer">
      <div>Search By:</div>
      <select
        name="searchDropdown"
        className="bg-surface border-secondary rounded-full border px-2
          hover:cursor-pointer"
        value={selectedSearchType}
        onChange={(e) => setSelectedSearchType(e.target.value)}
      >
        {searchTypeObjArray.map((items) => (
          <option key={items.id} value={items.id}>
            {items.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SearchDropdown;
