import React from "react";
import { createPortal } from "react-dom";
import useGetFromAPI from "../hooks/useGetFromAPI";
import toTitleCase from "../utils/formatting";
import XIcon from "../assets/XIcon.svg";

const FilmDetailsModal = ({ open, modalFilmID, onClose }) => {
  let requestPath;
  if (open && modalFilmID) {
    requestPath = `/films/${modalFilmID}`;
  } else {
    requestPath = null;
  }

  const { data, loading, error } = useGetFromAPI(requestPath);

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black opacity-70"
        onClick={onClose}
      />
      <div
        className="text-foreground bg-surface fixed top-1/2 left-1/2 z-50 h-1/2
          w-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 transform p-5"
      >
        {loading && <div className="text-xl font-medium">Loading posts...</div>}
        {error && <div className="text-red-700">{error}</div>}
        {data && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h1 className="text-primary text-2xl font-semibold">
                {toTitleCase(data.title)}
              </h1>
              <button
                className="btn-std item-center h-5 w-5 justify-center"
                onClick={onClose}
              >
                <img className="h-5 w-5" src={XIcon} alt="Close Popup Button" />
              </button>
            </div>
            <p className="text-lg text-neutral-400">
              {(() => {
                let filmSubString = "";
                if (data.release_year) {
                  filmSubString += data.release_year + " \u00B7 ";
                }
                if (data.rating) {
                  filmSubString += data.rating + " \u00B7 ";
                }
                filmSubString += data.language;
                if (data.length) {
                  filmSubString += " \u00B7 " + data.length + " min";
                }
                return filmSubString;
              })()}
            </p>
            {data.description && <p>{data.description}</p>}
            <h2 className="text-primary mt-4 text-xl">Stock Details:</h2>
            <ul className="ml-6 list-disc">
              <li>Film ID: {data.film_id}</li>
              <li>
                Current Inventory: {data.in_stock_count}/{data.total_count}
              </li>
              <li>Rental Duration: {data.rental_duration} days</li>
              <li>Rental Rate: ${data.rental_rate}</li>
              <li>Replacement Cost: ${data.replacement_cost}</li>
              {data.original_language_id && (
                <li>Original Language ID: {data.original_language_id}</li>
              )}
              {data.special_features && data.special_features.length > 0 && (
                <li>Special Features: {data.special_features.join(", ")}</li>
              )}
              <li>Last Update: {data.last_update}</li>
            </ul>
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default FilmDetailsModal;
