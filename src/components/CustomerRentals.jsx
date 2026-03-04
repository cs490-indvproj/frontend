import React from "react";
import toTitleCase from "../utils/formatting";

const searchResultsGridLayout = [
  { id: "name", label: "Film Name" },
  { id: "id", label: "Film ID" },
  { id: "return", label: "Return Status" },
];

const CustomerRentals = ({ rentalData, returnLoading, patchReturnRental }) => {
  return (
    <div
      className="mt-4 flex min-h-0 flex-grow flex-col items-center
        justify-center overflow-hidden"
    >
      <div
        style={{
          gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 3}, minmax(0, 1fr))`,
        }}
        className={`border-secondary grid w-full shrink-0 items-center border
          border-2 font-bold`}
      >
        {searchResultsGridLayout.map((option) => (
          <div
            key={option.id}
            className={
              `border-secondary h-full w-full content-center items-center border
              py-2 text-center` +
              (option.id === "name" ? " col-span-3" : "") +
              (option.id === "return" ? " col-span-2" : "")
            }
          >
            {option.label}
          </div>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto">
        {[...rentalData].reverse().map((option) => (
          <div
            key={option.film.film_id}
            className="border-secondary grid w-full items-center border py-2"
            style={{
              gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 3}, minmax(0, 1fr))`,
            }}
          >
            <div className="col-span-3 text-center">
              {toTitleCase(option.film.title)}
            </div>
            <div className="text-center">{option.film.film_id}</div>

            <div className="col-span-2 text-center">
              {option.return_date ? (
                option.return_date
              ) : (
                <div className="text-center">
                  <button
                    className="btn-std px-2 py-1"
                    disabled={returnLoading}
                    onClick={() => patchReturnRental(option.rental_id)}
                  >
                    Return Film
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRentals;
