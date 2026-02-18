import React from "react";
import FilmDetailsButton from "./FilmDetailsButton";
import toTitleCase from "../utils/formatting";

const SearchResultsFilms = ({ data, searchResultsGridLayout }) => {
  return (
    <>
      {data.map((option) => (
        <div
          key={option.film_id}
          className="border-secondary grid w-full items-center border py-2"
          style={{
            gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 2}, minmax(0, 1fr))`,
          }}
        >
          <div className="col-span-3 text-center">
            {toTitleCase(option.title)}
          </div>
          <div className="text-center">{option.film_id}</div>
          <FilmDetailsButton buttonFilmID={option.film_id} />
        </div>
      ))}
    </>
  );
};

export default SearchResultsFilms;
