import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieCarousel = ({ trendmovies, Section }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  function clickHandler(id, media) {
    navigate(`/details/${media}/${id}`);
  }

  const shimmerArray = ["1", "2", "3", "4", "4", "5", "6", "7", "8", "9", "10"];

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = Math.min(scrollPosition, 200);
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      carouselRef.current.scrollTo({
        left: Math.max(0, scrollPosition - scrollAmount),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const maxScrollPosition =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const scrollAmount = 200;
      setScrollPosition(
        Math.min(maxScrollPosition, scrollPosition + scrollAmount)
      );
      carouselRef.current.scrollTo({
        left: Math.min(maxScrollPosition, scrollPosition + scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-py-8 tw-px-4 ">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h2 className="tw-text-2xl tw-font-bold tw-text-white">{Section}</h2>
        {Section === "Popular Shows" && (<Link
            to="/shows"
            className="tw-no-underline tw-text-blue-400 hover:tw-text-blue-300 tw-text-sm tw-font-medium tw-flex tw-items-center"
          >
            See More
            <i className="fas fa-chevron-right tw-ml-1"></i>
          </Link>) ||
          Section === "Popular Movies" && (<Link
            to="/movie"
            className="tw-no-underline tw-text-blue-400 hover:tw-text-blue-300 tw-text-sm tw-font-medium tw-flex tw-items-center"
          >
            See More
            <i className="fas fa-chevron-right tw-ml-1"></i>
          </Link>) ||
          Section === "Trending Now 🔥" && (
          <Link
            to="/trending"
            className="tw-no-underline tw-text-blue-400 hover:tw-text-blue-300 tw-text-sm tw-font-medium tw-flex tw-items-center"
          >
            See More
            <i className="fas fa-chevron-right tw-ml-1"></i>
          </Link>
        )}
      </div>

      <div className="tw-relative">
        {/* Left Arrow */}
        <button
          className={`tw-absolute md:tw-left-[-55px] tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-10 tw-bg-black tw-bg-opacity-80 tw-p-3 tw-rounded-full tw-text-white hover:tw-bg-opacity-100 tw-transition-all ${
            scrollPosition <= 0 ? " tw-cursor-not-allowed" : "tw-opacity-100"
          }`}
          onClick={scrollLeft}
          disabled={scrollPosition <= 0}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="tw-flex tw-overflow-x-hidden tw-scroll-smooth tw-gap-5 tw-py-4 tw-px-12"
          style={{ scrollBehavior: "smooth" }}
        >
          {trendmovies?.length === 0
            ? shimmerArray.map((it) => {
                return (
                  <div className="tw-cursor-pointer tw-flex-none tw-w-40 tw-rounded-lg tw-overflow-hidden tw-shadow-xl  tw-transform tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl tw-animate-pulse ">
                    {/* Image Placeholder */}
                    <div className="tw-w-full tw-h-56 tw-bg-gray-800"></div>

                    {/* Text Content Placeholder */}
                    <div className="tw-p-3">
                      <div className="tw-w-64 tw-h-4 tw-bg-gray-700 tw-rounded-md"></div>
                      <div className="tw-flex tw-items-center tw-mt-2">
                        <div className="tw-w-8 tw-h-4 tw-bg-gray-700 tw-rounded-full"></div>
                        <div className="tw-ml-2 tw-w-44 tw-h-3 tw-bg-gray-700 tw-rounded-md"></div>
                        <span className="tw-mx-2 tw-text-gray-600 tw-text-xs">
                          •
                        </span>
                        <div className="tw-w-24 tw-h-3 tw-bg-gray-700 tw-rounded-md"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            : trendmovies?.map((movie) => (
                <div
                  key={movie?.ids?.tmdb}
                  onClick={() =>
                    clickHandler(movie?.ids?.trakt, movie?.media_type)
                  }
                  className="tw-cursor-pointer tw-flex-none tw-w-40 tw-rounded-lg tw-overflow-hidden tw-shadow-xl  tw-transform tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-2xl"
                >
                  <div className="tw-relative">
                    <img
                      src={movie?.images?.poster}
                      alt={movie.title}
                      className="tw-w-full tw-h-56 tw-object-cover"
                    />
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-flex tw-items-center tw-justify-center"></div>
                  </div>
                  <div className="tw-p-3">
                    <h3 className="tw-font-bold tw-text-white tw-text-sm tw-truncate">
                      {movie.title}
                    </h3>
                    <div className="tw-flex tw-items-center tw-mt-2">
                      <i className="fas fa-star tw-text-yellow-400"></i>
                      <span className="tw-ml-1 tw-text-gray-300 tw-text-xs">
                        {movie.rating.toFixed(1)}
                      </span>
                      <span className="tw-mx-2 tw-text-gray-500 tw-text-xs">
                        •
                      </span>
                      <span className="tw-text-gray-400 tw-text-xs">
                        {movie?.genres[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`tw-absolute md:tw-right-[-55px] tw-right-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-10 tw-bg-black tw-bg-opacity-80 tw-p-3 tw-rounded-full tw-text-white hover:tw-bg-opacity-100 tw-transition-all ${
            scrollPosition >=
            carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth
              ? "tw-cursor-not-allowed"
              : "tw-opacity-100"
          }`}
          onClick={scrollRight}
          disabled={
            carouselRef.current &&
            scrollPosition >=
              carouselRef.current.scrollWidth - carouselRef.current.clientWidth
          }
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
