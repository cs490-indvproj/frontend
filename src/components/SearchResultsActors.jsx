import React from "react";
import toTitleCase from "../utils/formatting";

const SearchResultsActors = ({ data, searchResultsGridLayout }) => {
  return (
    <>
      {data.map((option) => (
        <div
          key={option.actor_id}
          className="border-secondary grid w-full items-center border py-2"
          style={{
            gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 2}, minmax(0, 1fr))`,
          }}
        >
          <div className="col-span-3 text-center">
            {toTitleCase(option.first_name + " " + option.last_name)}
          </div>
          <div className="text-center">{option.actor_id}</div>
          <div className="text-center">{option.film_count}</div>
          <button>hi</button>
        </div>
      ))}
    </>
  );
};

export default SearchResultsActors;
