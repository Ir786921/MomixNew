import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchRef = useRef(null);
  const [data, setData] = useState([]);

  const result = {
    id: 1,
    title: "Inception",
    description: "A mind-bending thriller directed by Christopher Nolan.",
    image: "https://image.tmdb.org/t/p/w200/8h58iZh8jOyiWzQwPyz0zIuJpm3.jpg",
    year: 2010,
    rating: 8.8,
  };

  const getFilteredSuggestions = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.PARCEL_PUBLIC_OMDB_API_KEY}&s=${searchQuery}`
    );

    const dataInside = await response.json();
    setData(dataInside?.Search);

    if (!searchQuery) return [];

    return dataInside?.Search?.filter((item) => {
  
      return item?.Title?.toLowerCase().includes(searchQuery?.toLowerCase());
    }).slice(0, 5);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchItemClick = (text) => {
    setSearchQuery(text);
    setShowSuggestions(false);
  };

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestions = await getFilteredSuggestions();
      setFilteredSuggestions(suggestions || []);
    };

    fetchSuggestions();
  }, [searchQuery]);
  console.log(filteredSuggestions);

  return (
    <>
      <div
        className="tw-max-w-6xl tw-mx-auto tw-py-4 tw-px-4 tw-w-[425px]"
        ref={searchRef}
      >
        <div className="tw-relative">
          <div className="tw-relative">
            {/* Search Icon */}
            <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3 tw-flex tw-items-center tw-pointer-events-none">
              <i className="fa fa-search tw-text-red-500"></i>
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleFocus}
              placeholder="Search for movies, shows, genres..."
              className="tw-w-full tw-bg-black tw-text-white tw-border tw-border-red-600 tw-pl-10 tw-pr-10 tw-py-3 tw-rounded-lg 
                     tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-red-500 tw-transition-all tw-duration-200"
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="tw-absolute tw-inset-y-0 tw-right-0 tw-pr-3 tw-flex tw-bg-black  tw-items-center tw-text-red-500 hover:tw-text-white"
              >
                <i className="fa fa-times tw-text-white"></i>
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="tw-absolute tw-mt-1 tw-w-full tw-bg-black tw-rounded-lg tw-shadow-2xl tw-z-20 tw-border tw-border-red-700 tw-overflow-hidden">
              {searchQuery && filteredSuggestions.length > 0 ? (
                <div className="tw-p-2">
                  <h3 className="tw-text-red-500 tw-text-xs tw-font-medium tw-px-3 tw-py-2">
                    SEARCH RESULTS
                  </h3>
                  {filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSearchItemClick(item?.Title)}
                      className="tw-flex tw-items-center tw-px-3 tw-py-2 hover:tw-bg-red-700 hover:tw-text-white tw-transition-all tw-duration-150 tw-cursor-pointer"
                    >
                      <span className="tw-text-white tw-text-sm">
                        {" "}
                        {item?.Title}
                      </span>
                      <span className="tw-ml-2 tw-text-xs tw-text-red-400 tw-capitalize">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Search Result */}
      {searchQuery && (
        <div className="md:tw-w-[1450px] tw-w-[450px] md:tw-h-[315px] tw-h-48 tw-overflow-y-auto  tw-gap-6  tw-flex tw-flex-row tw-flex-wrap  tw-bg-transparent tw-border tw-border-gray-700 tw-rounded-lg tw-shadow-lg tw-p-4 tw-mx-auto tw-backdrop-blur-lg">
          {data &&
            data.map((movie) => {
              return (
                <div
                  key={movie?.imdbID}
                  onClick={() => clickHandler()}
                  className="tw-cursor-pointer tw-flex-none tw-w-40 tw-rounded-lg tw-overflow-hidden tw-shadow-xl  tw-transform tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl"
                >
                  <div className="tw-relative">
                    <img
                      src={
                        movie?.Poster === "N/A"
                          ? "https://dummyimage.com/300x450/111/ff0000&text=No+Poster+Available"
                          : movie?.Poster
                      }
                      alt={movie.Title}
                      className="tw-w-full tw-h-56 tw-object-cover"
                    />
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-flex tw-items-center tw-justify-center"></div>
                  </div>
                  <div className="tw-p-3">
                    <h3 className="tw-font-bold tw-text-white tw-text-sm tw-truncate">
                      {movie.Title}
                    </h3>
                    <div className="tw-flex tw-items-center tw-mt-2">
                      <span className="tw-text-gray-400 tw-text-xs">
                        {movie?.Year}
                      </span>

                      <span className="tw-mx-2 tw-text-gray-500 tw-text-xs">
                        •
                      </span>
                      <span className="tw-text-gray-400 tw-text-xs">
                        {movie?.Type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SearchBar;
