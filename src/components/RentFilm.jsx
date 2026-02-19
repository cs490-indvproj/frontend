import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import usePostToAPI from "../hooks/usePostToAPI";

const RentFilm = ({ filmID, setIsRefresh, isRefresh }) => {
  const { postFunction, loading, error, data } = usePostToAPI();
  const [searchQuery, setSearchQuery] = useState("");

  const buttonPrompt = "Rent";
  const placeholderPrompt = "Enter Customer ID Number";

  console.log(data);
  useEffect(() => {
    const postRental = async () => {
      try {
        if (searchQuery !== "") {
          await postFunction("/rentals/rent", {
            customer_id: searchQuery,
            film_id: filmID,
          });
          setIsRefresh(!isRefresh);
        }
      } catch (err) {
        console.error("Rental Failed", err);
      } finally {
        setSearchQuery("");
      }
    };
    postRental();
  }, [searchQuery, filmID, postFunction, setIsRefresh, isRefresh]);
  return (
    <div>
      <h1 className="text-primary text-xl">Rent Out This Film:</h1>
      <div className="mt-6">
        <SearchBar {...{ setSearchQuery, buttonPrompt, placeholderPrompt }} />
      </div>
      {loading && (
        <div className="text-xl font-medium">Processing Rental...</div>
      )}
      {error && <div className="text-red-700">{error}</div>}
      {data && <div>Rental Processed Successfully!</div>}
    </div>
  );
};

export default RentFilm;
