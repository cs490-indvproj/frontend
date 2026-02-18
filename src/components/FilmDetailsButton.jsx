import React, { useState } from "react";
import FilmDetailsModal from "./FilmDetailsModal";

const FilmDetailsButton = ({ buttonFilmID }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-center">
      <button
        className="btn-std w-9/10 max-w-25"
        onClick={() => setIsOpen(true)}
      >
        Details
      </button>
      <FilmDetailsModal
        modalFilmID={buttonFilmID}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      ></FilmDetailsModal>
    </div>
  );
};

export default FilmDetailsButton;
