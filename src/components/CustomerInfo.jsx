import React from "react";

const CustomerInfo = ({ customerData }) => {
  return (
    <div>
      <div className="mt-2 flex gap-2">
        <h1 className="text-primary text-lg">Customer ID:</h1>
        <p className="text-lg">{customerData.customer_id}</p>
      </div>
      {customerData.email && (
        <div className="mt-2 flex gap-2">
          <h1 className="text-primary text-lg">Email:</h1>
          <p className="text-lg">{customerData.email.toLowerCase()}</p>
        </div>
      )}
      <div>
        <h1 className="text-primary mt-2 text-lg">Address:</h1>
        <p>{customerData.address.address}</p>
        <p>{customerData.address?.address2}</p>
        <p>
          {customerData.address.city}, {customerData.address.district}{" "}
          {customerData.address?.postal_code}
        </p>
        <p>{customerData.address.country}</p>
      </div>
    </div>
  );
};

export default CustomerInfo;
