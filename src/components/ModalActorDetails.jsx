import React from "react";
import { createPortal } from "react-dom";
import useGetFromAPI from "../hooks/useGetFromAPI";
import SearchResults from "./SearchResults";
import toTitleCase from "../utils/formatting";
import XIcon from "../assets/XIcon.svg";

const searchEntityType = "actor films";

const searchResultsGridLayout = [
  { id: "name", label: "Film Name" },
  { id: "id", label: "Film ID" },
  { id: "count", label: "Past Rentals" },
];

const ModalActorDetails = ({ open, modalActorID, onClose }) => {
  let requestPath;
  if (open && modalActorID) {
    requestPath = `/actors/${modalActorID}?top_amount=5`;
  } else {
    requestPath = null;
  }

  const { data: actorData, loading, error } = useGetFromAPI(requestPath);

  if (!open) {
    return null;
  }
  const topFilms = actorData ? actorData.top_films : [];
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
        {actorData && (
          <div className="flex flex-col">
            <div className="flex flex-row justify-between pb-10">
              <h1 className="text-primary text-2xl font-semibold">
                {toTitleCase(
                  actorData.first_name +
                    " " +
                    actorData.last_name +
                    " Top Films"
                )}
              </h1>
              <button
                className="btn-std item-center h-5 w-5 justify-center"
                onClick={onClose}
              >
                <img className="h-5 w-5" src={XIcon} alt="Close Popup Button" />
              </button>
            </div>
            <SearchResults
              searchEntityType={searchEntityType}
              searchResultsGridLayout={searchResultsGridLayout}
              data={topFilms}
              loading={loading}
              error={error}
              searched={true}
            />
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ModalActorDetails;
