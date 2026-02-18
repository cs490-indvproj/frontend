import React from "react";
import toTitleCase from "../utils/formatting";

const SearchResultsActorFilms = ({ data, searchResultsGridLayout }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 2}, minmax(0, 1fr))`,
        }}
        className={`border-secondary grid w-full items-center border border-2
          font-bold`}
      >
        {searchResultsGridLayout.map((option) => (
          <div
            key={option.id}
            className={
              `border-secondary h-full w-full content-center items-center border
              py-2 text-center` + (option.id === "name" ? " col-span-3" : "")
            }
          >
            {option.label}
          </div>
        ))}
      </div>
      {data.map((option) => (
        <div
          key={option.film_id}
          className="border-secondary grid w-full items-center border py-2"
          style={{
            gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 2}, minmax(0, 1fr))`,
          }}
        >
          <div className="col-span-3 text-center">
            {toTitleCase(option.film)}
          </div>
          <div className="text-center">{option.film_id}</div>
          <div className="text-center">{option.count}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsActorFilms;
