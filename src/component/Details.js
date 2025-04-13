import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";





import StarCastCarousel from "./StarCastCarousel";
import MovieCarousel from "./MovieCarousel";
import DetailsShimmer from "./DetailsShimmer";

const Details = () => {
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const { id } = useParams();
  const { media } = useParams();
  const mediaType = media === "movies" ? "movies" : "tv";
  console.log(media);
  console.log(id);
  const [data, setData] = useState({});
  const url = data?.trailer || "";

  let videoId = null;

  if (URL.canParse(url)) {
    const urlParams = new URL(url).searchParams;
    videoId = urlParams.get("v");
  } else {
    console.warn("Invalid URL:", url);
  }
  console.log(videoId);

  // // Redux work

  async function getPopularMovieFullDetails(traktId) {
    const response = await fetch(
      `https://api.trakt.tv/${media}/${traktId}?extended=full`,
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": process.env.TRAKT_API_KEY,
        },
      }
    );

    return response.json();
  }

  async function getMovieRecommendations(traktMovieId) {
    try {
      const response = await fetch(
        `https://api.trakt.tv/${media}/${traktMovieId}/related?limit=25&extended=full`,
        {
          headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": process.env.TRAKT_API_KEY,
          },
        }
      );

      const recommendations = await response.json();
      console.log(recommendations);

      return recommendations;
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  async function getRecommendationPosters(tmdbId) {
    if (!tmdbId) return null;

    const response = await fetch(
      `https://www.omdbapi.com/?i=${tmdbId}&apikey=${process.env.OMDB_API_KEY}`
    );

    if (!response.ok) return null;

    const images = await response.json();
    console.log(images);

    return {
      poster: images.Poster || null,
      background: images.moviebackground?.[0]?.url || null,
      logo: images.hdmovielogo?.[0]?.url || null,
    };
  }

  async function fetchCompleteeRecommendationsDetails() {
    const details = await getMovieRecommendations(id);
    const fullMovies = await Promise.all(
      details.map(async (movie) => {
        const imdbId = movie.ids.imdb; 

      
        const images = imdbId ? await getRecommendationPosters(imdbId) : null;

        return { ...movie, images };
      })
    );
    setRecommendations(fullMovies);
    console.log(fullMovies);
  }

  async function getPopularMoviePosters(tmdbId) {
    if (!tmdbId) return null;
    console.log(tmdbId);

    const response = await fetch(
      `https://imdb-com.p.rapidapi.com/title/get-images?tconst=${tmdbId}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "imdb-com.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) return null;

    const images = await response.json();
    console.log(images);

    return {
      poster: images?.data?.title?.images?.edges[1]?.node?.url || null,
      background: images.moviebackground?.[0]?.url || null,
      logo: images.hdmovielogo?.[0]?.url || null,
    };
  }

  async function fetchCompletePopularMovieDetails() {
    const details = await getPopularMovieFullDetails(id);
    const imdbId = details?.ids?.imdb;

    const images = imdbId ? await getPopularMoviePosters(imdbId) : null;

    setData({ ...details, images });
  }

  async function getCastWithImages() {
    try {
    
      const traktResponse = await fetch(
        `https://api.trakt.tv/${media}/${id}/people`,
        {
          headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": process.env.TRAKT_API_KEY,
          },
        }
      );
      const traktData = await traktResponse.json();

      // Step 2: Get Actor Images from Wikipedia
      const actors = await Promise.all(
        traktData.cast.map(async (actor) => {
          const wikiResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${actor.person.name.replace(
              " ",
              "_"
            )}`
          );
          const wikiData = await wikiResponse.json();

          return {
            name: actor.person.name,
            character: actor.character,
            image: wikiData.thumbnail ? wikiData.thumbnail.source : null,
          };
        })
      );
      const filterCast = actors.filter((ele) => {
        return ele.image != null;
      });
      setCast(filterCast);
      console.log(actors);
    } catch (error) {
      console.error("Error fetching cast with images:", error);
    }
  }

  useEffect(() => {
    console.log(fetchCompletePopularMovieDetails());
    getCastWithImages();
    fetchCompleteeRecommendationsDetails();
  }, []);

  const openTrailerModal = () => {
    setTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setTrailerModalOpen(false);
  };

  return (
    <>
      {data.title ? (
        <>
          {" "}
          <div className="tw-w-full tw-bg-black tw-text-white">
   
            <div className="tw-relative tw-h-[580px] tw-max-h-[600px] md:tw-max-h-96 lg:tw-max-h-[600px] lg:tw-h-3/4 tw-w-full tw-overflow-hidden">
              <img
                src={data?.images?.poster}
                alt="The Midnight Chronicles"
                className="tw-w-full tw-h-full tw-float-right tw-object-contain"
              />
          
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-black tw-via-black/70 tw-to-transparent"></div>
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-via-black/50 tw-to-transparent"></div>

    
              <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-justify-end tw-px-4 tw-pb-16 md:tw-px-12 lg:tw-px-20 lg:tw-pb-24">
                <div className="tw-max-w-2xl">
          
                  <div className="tw-mb-3">
                    <span className="tw-bg-red-600 tw-text-white tw-text-xs tw-font-bold tw-py-1 tw-px-2 tw-rounded">
                      EXCLUSIVE PREMIERE
                    </span>
                  </div>

             
                  <h1 className="tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-font-bold tw-text-white tw-mb-4">
                    {data?.title}
                  </h1>

               
                  <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-400 tw-mb-4 tw-flex-wrap">
                    <span className="tw-mr-3 tw-bg-red-600 tw-text-white tw-px-2 tw-py-0.5 tw-rounded tw-text-xs tw-font-medium">
                      97% MATCH
                    </span>
                    <span className="tw-mr-3">{data?.released}</span>
                    <span className="tw-mr-3 tw-border tw-border-gray-600 tw-px-1 tw-text-xs">
                      TV-MA
                    </span>
                    <span className="tw-mr-3">10 Episodes</span>
                    <div className="tw-flex tw-items-center tw-mr-3">
                      <i className="fas fa-star tw-text-yellow-400 tw-mr-1"></i>
                      <span>{data?.rating?.toFixed(1)}</span>
                    </div>
                    <span>
                      {data?.genres?.map((item, index) => (
                        <span key={index} className="tw-ml-2">
                          {item}
                        </span>
                      ))}
                    </span>
                  </div>

               
                  <p className="tw-text-gray-300 tw-text-sm md:tw-text-base tw-mb-6 tw-leading-relaxed tw-max-w-xl">
                    {data?.overview}
                  </p>

               
                  <div className="tw-flex tw-flex-wrap tw-gap-3">
                    <button
                      className="tw-flex tw-items-center tw-bg-white hover:tw-bg-gray-200 tw-text-black tw-font-medium tw-px-6 tw-py-2 tw-rounded tw-transition-colors"
                      onClick={openTrailerModal}
                    >
                      <i className="fas fa-play tw-mr-2"></i>
                      Play
                    </button>
                    <button className="tw-flex tw-items-center tw-bg-gray-700 hover:tw-bg-gray-600 tw-text-white tw-font-medium tw-px-6 tw-py-2 tw-rounded tw-transition-colors">
                      <i className="fas fa-info-circle tw-mr-2"></i>
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>

          

         
            <div className="tw-bg-black">
              <StarCastCarousel cast={cast} Section={"Star Cast"} />
            </div>

      
            <div className=" tw-bg-black">
              {
                <MovieCarousel
                  trendmovies={recommendations}
                  Section={"Recommended For You "}
                />
              }
            </div>
          </div>
          {trailerModalOpen && (
            <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/80 tw-backdrop-blur-sm">
              <div className="tw-relative tw-w-full tw-max-w-4xl tw-mx-4 tw-rounded-lg tw-overflow-hidden tw-shadow-2xl">
              
                <button
                  onClick={closeTrailerModal}
                  className="tw-absolute tw-top-4 tw-right-4 tw-z-10 tw-bg-black/50 tw-text-white tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center hover:tw-bg-red-600 tw-transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>

             
                <div className="tw-aspect-video tw-w-full tw-bg-black">
                  <iframe
                    className="tw-w-full tw-h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

               
                <div className="tw-bg-black tw-p-4">
                  <h3 className="tw-font-bold tw-text-lg tw-text-white">
                    {data?.title} - Official Trailer
                  </h3>
                </div>
              </div>
            </div>
          )}{" "}
        </>
      ) : (
        <DetailsShimmer cast={cast} trendmovies={recommendations} />
      )}
    </>
  );
};

export default Details;
