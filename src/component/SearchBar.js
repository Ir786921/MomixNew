import React, { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchRef = useRef(null);
  
  
  const getFilteredSuggestions = async () => {
    const response = await fetch(`https://api.trakt.tv/search/all?query=${searchQuery}&limit=10`,{
      method : "GET",
      headers:{
        "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": "7d0d2890ff8808b00cea7795bc7ab395e3e6e2b4dd78f061909ac20db0155257",
      }
    })

    const data = await response.json();
    console.log(data);
    
 
    
    if (!searchQuery) return [];
    
    return data.filter(item => {
      const title =
      item?.show?.title ||  
      item?.movie?.title || 
      item?.episode?.title||
      item?.podcast?.title
       return title.toLowerCase().includes(searchQuery?.toLowerCase())
    }
      
    ).slice(0, 5);
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
    setSearchQuery('');
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
    setFilteredSuggestions(suggestions);
  };

  fetchSuggestions();
}, [searchQuery]);
  console.log(filteredSuggestions);
  

  return (
    <div className="tw-max-w-6xl tw-mx-auto tw-py-4 tw-px-4" ref={searchRef}>
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
              <h3 className="tw-text-red-500 tw-text-xs tw-font-medium tw-px-3 tw-py-2">SEARCH RESULTS</h3>
              {filteredSuggestions.map((item) => (
               
                <div
                  key={item.id}
                  onClick={() => handleSearchItemClick(item?.show?.title || item?.movie?.title || item?.episode?.title || item?.podcast?.title)}
                  className="tw-flex tw-items-center tw-px-3 tw-py-2 hover:tw-bg-red-700 hover:tw-text-white tw-transition-all tw-duration-150 tw-cursor-pointer"
                >
                  {/* <i className={item.type === "movie" ? "fa fa-film tw-text-red-500 tw-mr-2" : "fa fa-tv tw-text-red-500 tw-mr-2"}></i> */}
                  <span className="tw-text-white tw-text-sm"> {item?.show?.title || item?.movie?.title || item?.episode?.title || item?.podcast?.title}</span>
                  <span className="tw-ml-2 tw-text-xs tw-text-red-400 tw-capitalize">{item.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
            
            </>
          )}
        </div>
      )}
    </div>
  </div>
  
  );
};

export default SearchBar;