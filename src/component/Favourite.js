import React from "react";
import Caros from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { removefavourite, clearfavourite } from "./listslice.js";

const Favourite = () => {
  const favEntertainment = useSelector((store) => store.wishlist.item);
  const dispatch = useDispatch();

  return (
    <div className="tw-min-h-screen tw-bg-black tw-text-white">
      {/* Header */}
      <div className="tw-container tw-mx-auto tw-px-4 tw-py-24">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <h2 className="tw-text-2xl tw-font-bold tw-text-white">
            My Favourites
          </h2>
          {favEntertainment.length > 0 && (
            <button
              className="tw-px-4 tw-py-2 tw-bg-red-600 tw-text-white tw-rounded-md tw-flex tw-items-center tw-transition tw-duration-300 hover:tw-bg-red-700 hover:tw-shadow-lg hover:tw-shadow-red-900/50"
              onClick={() => dispatch(clearfavourite())}
            >
              <i className="bi bi-trash3 tw-mr-2"></i>
              Clear All
            </button>
          )}
        </div>

        {favEntertainment.length > 0 ? (
          <div className="tw-bg-black tw-rounded-xl tw-overflow-hidden tw-shadow-lg">
            {/* Content Section */}
            <div className="md:tw-col-span-2 tw-p-6 tw-bg-black">
              {favEntertainment.map((item, index) => (
                <div
                  key={index}
                  className="tw-flex md:tw-flex-row tw-flex-col  tw-gap-4 tw-mb-12 tw-relative tw-p-6 tw-border-0 tw-rounded-lg tw-bg-gray-900/30 tw-transition-all tw-duration-300 hover:tw-shadow-xl hover:tw-shadow-blue-900/20 hover:tw-bg-gray-800/40"
                >
                  <div className="tw-relative tw-rounded-lg tw-overflow-hidden md:tw-w-[20%] tw-w-[100%] tw-h-48 tw-shadow-lg tw-border-2 tw-border-red-800 tw-transition-all tw-duration-300 hover:tw-shadow-red-700 hover:tw-shadow-md">
                    <img
                      className="tw-w-full tw-h-48 tw-object-cover  tw-transition-transform tw-duration-500 hover:tw-scale-105"
                      src={item?.images.poster}
                      alt={item?.title || "Movie poster"}
                    />
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-opacity-0 hover:tw-opacity-70 tw-transition-opacity"></div>
                  </div>

                  <div className=" md:tw-w-[80%] tw-w-[100%] ">
                    <div className="tw-flex tw-justify-between tw-items-start">
                      <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-2">
                        {item.media_type === "movie" ? item.title : item.title}
                      </h3>
                      <button
                        className="tw-text-gray-400 hover:tw-text-red-500 tw-transition tw-duration-300 tw-p-2 hover:tw-shadow-md hover:tw-shadow-red-900/30 tw-rounded-full hover:tw-bg-gray-800"
                        onClick={() => dispatch(removefavourite())}
                      >
                        <i className="bi bi-trash3-fill tw-text-xl"></i>
                      </button>
                    </div>

                    <div className="tw-flex tw-flex-wrap tw-gap-2 tw-text-sm tw-text-gray-400 tw-mb-4">
                      <span>
                        {item.media_type === "movie" ? item.year : item.year}
                      </span>
                      <span className="tw-mx-2">•</span>
                      <span>
                        {`${parseInt(item.runtime / 60)} h ${
                          item.runtime % 60
                        } min`}{" "}
                      </span>
                      <span className="tw-mx-2">•</span>
                      <span className="tw-px-1 tw-border tw-border-gray-600 tw-rounded">
                        16+
                      </span>
                    </div>

                    <p className=" tw-text-sm tw-text-gray-400">
                      {item?.overview}
                    </p>

                    <div className="tw-mb-4">
                      <span className="tw-text-gray-500 tw-mr-2">Genres:</span>
                      <span className="tw-text-gray-300">
                        {item.genres.map((genre, i) => (
                          <span
                            key={i}
                            className="tw-inline-block tw-mr-2 tw-mb-2 tw-px-2 tw-py-1 tw-bg-gray-800 tw-rounded-full tw-text-xs tw-transition-all tw-duration-300 hover:tw-bg-gray-700 hover:tw-shadow-md hover:tw-shadow-blue-900/30"
                          >
                            {genre}
                          </span>
                        ))}
                      </span>
                      <br />
                      <span className="tw-text-gray-500 tw-mr-2 tw-text-sm">
                        Rating: {item.rating.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-12 tw-bg-gray-900 tw-rounded-xl tw-text-center tw-transition-all tw-duration-300 hover:tw-shadow-xl hover:tw-shadow-blue-900/20">
            <i className="bi bi-heart tw-text-6xl tw-text-gray-700 tw-mb-4"></i>
            <h3 className="tw-text-xl tw-text-gray-400 tw-mb-2">
              Your favourites list is empty
            </h3>
            <p className="tw-text-gray-500">
              Add your favourite movies and shows to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
