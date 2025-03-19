import React, { useEffect, useState } from "react";
import StarCastCarousel from "./StarCastCarousel";
import MovieCarousel from "./MovieCarousel";
const StarCastShimmer = () => {
  return (
    <div className="tw-py-12 tw-px-4 md:tw-px-12 lg:tw-px-20">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
        <h2 className="tw-text-xl tw-font-bold">Star Cast</h2>
      </div>

      <div className="tw-flex tw-overflow-x-auto tw-gap-4 tw-pb-4 tw-scrollbar-hide">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="tw-flex-none tw-w-32">
            <div className="tw-relative">
              {/* Avatar circle shimmer */}
              <div className="tw-w-32 tw-h-32 tw-rounded-full tw-overflow-hidden tw-bg-gray-800">
                <div
                  className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"
                  style={{
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                ></div>
              </div>

              {/* Name shimmer */}
              <div className="tw-mt-2 tw-w-full tw-h-4 tw-rounded tw-bg-gray-800">
                <div
                  className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"
                  style={{
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                ></div>
              </div>

              {/* Role shimmer */}
              <div className="tw-mt-1 tw-w-3/4 tw-h-3 tw-rounded tw-bg-gray-800">
                <div
                  className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"
                  style={{
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// RecommendationsShimmer Component
const RecommendationsShimmer = () => {
  return (
    <div className="tw-py-12 tw-px-4 md:tw-px-12 lg:tw-px-20 tw-bg-black">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-6">Recommended For You</h2>
      <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-4 tw-gap-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="tw-relative tw-overflow-hidden tw-rounded-lg"
          >
            {/* Poster shimmer */}
            <div className="tw-aspect-[2/3] tw-relative tw-bg-gray-800">
              <div
                className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
            </div>

            {/* Title shimmer */}
            <div className="tw-mt-2 tw-w-full tw-h-4 tw-rounded tw-bg-gray-800">
              <div
                className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
            </div>

            {/* Year/rating shimmer */}
            <div className="tw-mt-1 tw-w-2/3 tw-h-3 tw-rounded tw-bg-gray-800">
              <div
                className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailsShimmer = ({ cast, recommendations }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tw-w-full tw-bg-black tw-text-white">
      {/* Hero and other content */}

      {/* Star Cast Section */}
      {loading ? (
        <StarCastShimmer />
      ) : (
        <StarCastCarousel cast={cast} Section={"Star Cast"} />
      )}

      {/* Recommendations Section */}
      {loading ? (
        <RecommendationsShimmer />
      ) : (
        <div className="tw-py-12 tw-px-4 md:tw-px-12 lg:tw-px-20 tw-bg-black">
          <h2 className="tw-text-2xl tw-font-bold tw-mb-6">
            Recommended For You
          </h2>
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-4 tw-gap-4">
            <MovieCarousel trendmovies={recommendations} Section={" "} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsShimmer;
