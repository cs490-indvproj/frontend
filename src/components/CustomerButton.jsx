import React, { useState } from "react";
import CustomerModal from "./CustomerModal";

const CustomerButton = ({ buttonCustomerID }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-center">
      <button
        className="btn-std w-9/10 max-w-25"
        onClick={() => setIsOpen(true)}
      >
        Details
      </button>
      <CustomerModal
        modalCustomerID={buttonCustomerID}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default CustomerButton;
