import React from "react";
import useGetFromAPI from "../hooks/useGetFromAPI.js";
import FilmDetailsButton from "./FilmDetailsButton";
import toTitleCase from "../utils/formatting.js";

const TopFiveFilms = () => {
  const { data, loading, error } = useGetFromAPI("/films/top?amount=5");

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-primary pt-0 text-center text-4xl font-extrabold">
        View our Top 5 Rented Films
      </h1>
      <div className="bg-surface border-secondary h-1/2 w-5/8 border">
        <div className="text-foreground">
          {loading && <div className="text-xl font-medium">Loading...</div>}
          {error && <div className="text-red-700">{error}</div>}
          {data && data[0] && (
            <div className="flex flex-col items-center justify-center">
              <div
                className="border-secondary grid w-full grid-cols-5 items-center
                  border font-bold"
              >
                <div className="border-secondary col-span-3 border text-center">
                  Film Name
                </div>
                <div className="border-secondary border text-center">
                  Film ID
                </div>
                <div className="border-secondary border text-center">
                  {" "}
                  See Details
                </div>
              </div>
              {data.map((option) => (
                <div
                  key={option.film_id}
                  className="border-secondary grid w-full grid-cols-5
                    items-center border py-2"
                >
                  <div className="col-span-3 text-center">
                    {toTitleCase(option.title)}
                  </div>
                  <div className="text-center">{option.film_id}</div>
                  <FilmDetailsButton
                    buttonFilmID={option.film_id}
                  ></FilmDetailsButton>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopFiveFilms;
