import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import Table from "../Table/Table";

const Home = ({
  cities = [],
  searchQuery,
  setSearchQuery,
  limit = 5,
  setLimit,
  loading,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [citiesPerPage, setCitiesPerPage] = useState(3);
  const searchInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, Math.ceil(cities.length / citiesPerPage) - 1)
    );
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 0));
  };

  const handlePageClick = (pageIndex) => {
    setPageNumber(pageIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (citiesPerPage > limit) {
      setCitiesPerPage(limit);
    }
  }, [limit]);

  const totalPages =
    cities.length > 0 ? Math.ceil(cities.length / citiesPerPage) : 1;
  const currentPageData = cities.slice(
    pageNumber * citiesPerPage,
    (pageNumber + 1) * citiesPerPage
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputValue]);

  return (
    <div className="home">
      <div>
        <div className="search-container">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search places"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-box"
          />
        </div>
        <label htmlFor="items_per_page">Items Per Page : </label>
        <input
          type="number"
          value={citiesPerPage}
          onChange={(e) => setCitiesPerPage(e.target.value)}
          disabled={
            citiesPerPage > 10
              ? alert("You cannot fetch more than 10 Items")
              : ""
          }
          min={1}
          max={11}
        />
        <Table
          cities={currentPageData}
          loading={loading}
          searchQuery={searchQuery}
        />
        {cities?.length > 0 && searchQuery && (
          <div className="pagination">
            <div className="page-container">
              <button
                className="pagination-button"
                disabled={pageNumber === 0}
                onClick={handlePrevPage}
              >
                Previous
              </button>
              {[...Array(totalPages)]?.map((_, index) => (
                <button
                  key={index}
                  className="pagination-button"
                  onClick={() => handlePageClick(index)}
                  disabled={index === pageNumber}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="pagination-button"
                disabled={pageNumber === totalPages - 1 || totalPages === 0}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
            <div className="limit-input">
              <input
                id="limit"
                type="number"
                className="items"
                value={limit}
                min={1}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => setLimit(e.target.value)}
              />
              {limit > 10 && <span>Limit can't be more then 10</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
