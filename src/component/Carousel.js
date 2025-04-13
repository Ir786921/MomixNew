import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
import { useDispatch } from "react-redux";
import { addfavourite, removefavourite } from "./listslice";

const Caros = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const addtoWatchList = (id) => {
    const icon = document.getElementById(id);
    if (icon.classList.contains("fa-plus")) {
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-check");
      const addToFav = data.filter((item) => {
        return item?.ids?.tmdb === id;
      });
      const obj = addToFav[0];
      dispatch(addfavourite(obj));
    } else {
      icon.classList.add("fa-plus");
      icon.classList.remove("fa-check");
      dispatch(removefavourite());
    }
    console.log(icon);

    console.log(id);
  };

  const navigate = useNavigate();

  function clickHandler(id, media) {
    navigate(`/details/${media}/${id}`);
  }

  const shimmerArray = ["1", "2", "3", "4", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <>
      {data.length === 0
        ? shimmerArray.map((item) => {
            return <Shimmer />;
          })
        : data?.map((movie) => {
            return (
              <div
                className="tw-flex tw-justify-center tw-items-center tw-bg-black tw-p-8 tw-cursor-pointer"
                key={movie?.ids?.tmdb}
              >
                <div className="md:tw-w-64    tw-rounded-md tw-overflow-hidden tw-shadow-xl tw-bg-black tw-bg-gray-900">
                 
                  <div
                    className="tw-relative"
                    onClick={() =>
                      clickHandler(movie?.ids?.trakt, movie?.media_type)
                    }
                  >
                    <img
                      src={
                        movie?.images?.poster ||
                        "https://dummyimage.com/300x450/111/ff0000&text=No+Poster+Available"
                      }
                      alt={movie.title}
                      className="tw-w-full tw-h-56 tw-object-cover"
                    />
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-flex tw-items-center tw-justify-center"></div>
                  </div>
                 
                  <div className="tw-bg-gray-900 tw-text-white tw-p-3">
                  
                    <div className=" tw-flex tw-justify-between tw-items-center tw-mb-1">
                      <h3 className="tw-font-bold tw-text-lg tw-mb-1">
                        {movie?.title}
                      </h3>{" "}
                      <div className="tw-text-sm tw-font-bold tw-text-green-500">
                        {movie?.rating?.toFixed(2)}
                      </div>
                    </div>

                  
                    <div className="tw-flex tw-justify-between tw-text-xs tw-text-gray-400 tw-mb-1">
                      <div className="tw-flex tw-text-xs tw-text-gray-400">
                        {" "}
                        <span>{movie?.year}</span>
                        <span className="tw-mx-2">•</span>
                        <span>{`${parseInt(movie?.runtime / 60)} h ${
                          movie?.runtime % 60
                        } min`}</span>{" "}
                      </div>

                      <button
                        className={`tw-w-7 tw-h-7 tw-text-black tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors tw-duration-200 ${
                          isAdded
                            ? "tw-bg-white"
                            : "tw-border tw-border-gray-400 tw-text-white hover:tw-border-white"
                        }`}
                        onClick={() => addtoWatchList(movie?.ids?.tmdb)}
                      >
                        <span className="text-lg">
                          {" "}
                          <i
                            class="fa-solid fa-plus tw-text-black tw-text-lg"
                            id={movie?.ids?.tmdb}
                          ></i>{" "}
                        </span>
                      </button>
                    </div>
                
                    <div className="tw-text-xs tw-text-gray-400 tw-mb-2">
                      {movie.genres.join(" • ")}
                    </div>
                 
                    <div className="tw-mt-2 tw-text-xs tw-text-gray-300 tw-line-clamp-3">
                      {movie?.overview}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};
export default Caros;
