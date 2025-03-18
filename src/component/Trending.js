import React, { useEffect, useState } from "react";
import Caros from "./Carousel";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";

import Store from "./store";

const Trending = () => {

  
  
 
  const movies = useSelector(Store => Store.Data.TrendingMovies);
  const shows = useSelector(Store => Store.Data.TrendingShows);



  const [filter, setFilter] = useState("Movies");


  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "black" }}>
        <div className="container-sm">
          <div className="row-sm">
            <div className="col-12">
              <div className="tw-flex md:tw-flex-row tw-flex-col md:tw-justify-between tw-justify-center  tw-p-2">
                <h4 className="tw-text-white tw-mt-24">
                  Trending Movies and Shows
                </h4>
                <div>
                  <div className="tw-gap-8 md:tw-mt-24 tw-mt-8 tw-flex tw-bg-[#1E1E1E] tw-rounded-full tw-border tw-border-gray-700 tw-shadow-lg tw-overflow-hidden tw-p-2 tw-border tw-border-red-300">
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-py-2 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Movies"
                          ? "tw-bg-red-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white tw-bg-gray-900 tw-text-white"
                      }`}
                      onClick={() => setFilter("Movies")}
                    >
                      Movies
                    </button>
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-py-2 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Shows"
                          ? "tw-bg-red-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white tw-bg-gray-900 tw-text-white"
                      }`}
                      onClick={() => setFilter("Shows")}
                    >
                      Shows
                    </button>
                  </div>
                </div>
              </div>
              <div className=" tw-flex tw-flex-wrap">
                <Caros data={filter === "Movies" ? movies[0] : shows[0]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
