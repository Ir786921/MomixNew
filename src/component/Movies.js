import { useState, useEffect } from "react";
import Caros from "./Carousel";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Store from "./store";

const Movies = () => {
  const [filter, setFilter] = useState("Popular");

  const popularMovie = useSelector((Store) => Store.Data.Movies);

  const trendingMovies = useSelector((Store) => Store.Data.TrendingMovies);

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "black" }}>
        <div className="container-sm">
          <div className="row-sm">
            <div className="col-12">
              <div className="tw-flex md:tw-flex-row tw-flex-col md:tw-justify-between tw-justify-center  tw-p-2">
                <h4 className="tw-text-white tw-mt-24">
                  {" "}
                  Movies &nbsp;{" "}
                  <span className=" tw-text-2xl tw-text-blue-500">
                    <i class="fa-solid fa-film"></i>
                  </span>{" "}
                </h4>
                <div>
                  <div className="tw-gap-8 md:tw-mt-24 tw-mt-8 tw-flex tw-bg-[#1E1E1E] tw-rounded-full tw-border tw-border-gray-700 tw-shadow-lg tw-overflow-hidden tw-p-2 tw-border tw-border-red-300">
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-px-6 tw-py-1 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Popular"
                          ? "tw-bg-red-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white tw-bg-gray-900 tw-text-white"
                      }`}
                      onClick={() => setFilter("Popular")}
                    >
                      Popular
                    </button>

                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-px-6 tw-py-1 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Trending"
                          ? "tw-bg-red-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white tw-bg-gray-900 tw-text-white"
                      }`}
                      onClick={() => setFilter("Trending")}
                    >
                      Trending
                    </button>
                  </div>
                </div>
              </div>
              <div className=" tw-flex tw-flex-wrap">
                <Caros
                  data={
                    (filter === "Popular" && popularMovie[0]) ||
                    (filter === "Trending" && trendingMovies[0])
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
