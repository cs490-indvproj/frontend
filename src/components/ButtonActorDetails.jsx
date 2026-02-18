import React, { useState } from "react";
import ModalActorDetails from "./ModalActorDetails.jsx";

const ButtonActorDetails = ({ buttonActorID }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-center">
      <button
        className="btn-std w-9/10 max-w-25"
        onClick={() => setIsOpen(true)}
      >
        Details
      </button>
      <ModalActorDetails
        modalActorID={buttonActorID}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ButtonActorDetails;
