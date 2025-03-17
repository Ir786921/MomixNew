import { useState, useEffect } from "react";
import Caros from "./Carousel";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Movies = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [mostWatched, setMostWatched] = useState([]);
  const [filter, setFilter] = useState("Popular");

  async function getPopularMovies() {
    const response = await fetch(
      "https://api.trakt.tv/movies/popular?limit=50",
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":process.env.TRAKT_API_KEY
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Trakt API error: ${response.status}`);
    }

    const movies = await response.json();
    return movies; // ✅ Return directly, no need for `.map()`
  }

  // Fetch full movie details from Trakt (including TMDB ID)
  async function getPopularMovieFullDetails(traktId) {
    const response = await fetch(
      `https://api.trakt.tv/movies/${traktId}?extended=full`,
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": process.env.TRAKT_API_KEY
        },
      }
    );

    return response.json();
  }

  // Fetch movie images from Fanart.tv using TMDB ID
  async function getPopularMoviePosters(tmdbId) {
    if (!tmdbId) return null; // Avoid errors if TMDB ID is missing

    const response = await fetch(
      `https://www.omdbapi.com/?i=${tmdbId}&apikey=${process.env.PARCEL_PUBLIC_OMDB_API_KEY}`
    );

    if (!response.ok) return null; // Handle errors gracefully

    const images = await response.json();

    return {
      poster: images.Poster || null,
      background: images.moviebackground?.[0]?.url || null,
      logo: images.hdmovielogo?.[0]?.url || null,
    };
  }

  // Fetch complete details including images
  async function fetchCompletePopularMovieDetails() {
    const PopularMovies = await getPopularMovies();

    const fullMovies = await Promise.all(
      PopularMovies.map(async (movie) => {
        const details = await getPopularMovieFullDetails(movie?.ids?.trakt);
        const imdbId = details.ids.imdb; // ✅ Get TMDB ID directly from Trakt

        // Fetch images if TMDB ID is available
        const images = imdbId ? await getPopularMoviePosters(imdbId) : null;

        return { ...details, images };
      })
    );

    const updated = fullMovies.map((item) => {
      return Object.assign(item, { media_type: "movies" });
    });
    setPopularMovie(updated);

    console.log(fullMovies);
  }

  async function getMostWatched() {
    const response1 = await fetch(
      "https://api.trakt.tv/movies/watched/all?limit=25&extended=full",
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":process.env.TRAKT_API_KEY

        },
      }
    );

    if (!response1.ok) {
      throw new Error(`Trakt API error: ${response1.status}`);
    }

    const movies = await response1.json();

    const first = movies.map((movie) => {
      return movie?.movie;
    });
    const updated1 = first.map((item) => {
      return Object.assign(item, { media_type: "movies" });
    });

    return updated1;
  }

  async function getMostWatchedPosters(tmdbId) {
    if (!tmdbId) return null; // Avoid errors if TMDB ID is missing

    const response = await fetch(
      `https://www.omdbapi.com/?i=${tmdbId}&apikey=${process.env.PARCEL_PUBLIC_OMDB_API_KEY}`
    );

    if (!response.ok) return null; // Handle errors gracefully

    const images = await response.json();

    return {
      poster: images.Poster || null,
      background: images.moviebackground?.[0]?.url || null,
      logo: images.hdmovielogo?.[0]?.url || null,
    };
  }

  async function fetchCompleteMostWatched() {
    const PopularMovies = await getMostWatched();

    const fullMovies = await Promise.all(
      PopularMovies.map(async (movie) => {
        const imdbId = movie.ids.imdb; // ✅ Get TMDB ID directly from Trakt

        // Fetch images if TMDB ID is available
        const images = imdbId ? await getMostWatchedPosters(imdbId) : null;

        return { ...movie, images };
      })
    );
    setMostWatched(fullMovies);

    console.log(fullMovies);
  }
  useEffect(() => {
    fetchCompletePopularMovieDetails();

    fetchCompleteMostWatched();
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "black" }}>
        <div className="container-sm">
          <div className="row-sm">
            <div className="col-12">
              <div className="tw-flex tw-justify-between tw-p-2">
                <h4 className="tw-text-white tw-mt-24"> Movies &nbsp;  <span className=" tw-text-2xl tw-text-blue-500"><i class="fa-solid fa-film"></i></span> </h4>
                <div>
                  <div className="tw-gap-8 tw-mt-24 tw-flex tw-bg-[#1E1E1E] tw-rounded-full tw-border tw-border-gray-700 tw-shadow-lg tw-overflow-hidden tw-p-2 tw-border tw-border-red-300">
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-px-6 tw-py-1 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Popular"
                          ? "tw-bg-gray-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white"
                      }`}
                      onClick={() => setFilter("Popular")}
                    >
                      Popular
                    </button>
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-px-6 tw-py-1 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Most Watched"
                          ? "tw-bg-gray-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white"
                      }`}
                      onClick={() => setFilter("Most Watched")}
                    >
                      Most Watched
                    </button>
                  </div>
                </div>
              </div>
              <div className=" tw-flex tw-flex-wrap">
                <Caros
                  data={filter === "Popular" ? popularMovie : mostWatched}
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
