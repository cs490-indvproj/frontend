import React, { useState } from "react";
import ModalFilmDetails from "./ModalFilmDetails";

const ButtonFilmDetails = ({ buttonFilmID }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-center">
      <button
        className="btn-std w-9/10 max-w-25"
        onClick={() => setIsOpen(true)}
      >
        Details
      </button>
      <ModalFilmDetails
        modalFilmID={buttonFilmID}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ButtonFilmDetails;
