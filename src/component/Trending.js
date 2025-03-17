import React, { useEffect, useState } from "react";
import Caros from "./Carousel";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  async function getTrendingMovies() {
    const response = await fetch(
      "https://api.trakt.tv/movies/trending?limit=50",
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":
            "7d0d2890ff8808b00cea7795bc7ab395e3e6e2b4dd78f061909ac20db0155257",
        },
      }
    );

    const movies = await response.json();
    console.log(movies);

    return movies.map((movie) => movie.movie);
  }

  // Fetch full movie details from Trakt (including TMDB ID)
  async function getMovieFullDetails(traktId) {
    const response = await fetch(
      `https://api.trakt.tv/movies/${traktId}?extended=full`,
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":
            "7d0d2890ff8808b00cea7795bc7ab395e3e6e2b4dd78f061909ac20db0155257",
        },
      }
    );

    return response.json();
  }

  // Fetch movie images from Fanart.tv using TMDB ID
  async function getMoviePosters(tmdbId) {
    if (!tmdbId) return null; // Avoid errors if TMDB ID is missing

    const response = await fetch(
      `https://www.omdbapi.com/?i=${tmdbId}&apikey=${process.env.OMDB_API_KEY}`
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
  async function fetchCompleteMovieDetails() {
    const trendingMovies = await getTrendingMovies();

    const fullMovies = await Promise.all(
      trendingMovies.map(async (movie) => {
        const details = await getMovieFullDetails(movie.ids.trakt);
        const imdbId = details.ids.imdb; // ✅ Get TMDB ID directly from Trakt

        // Fetch images if TMDB ID is available
        const images = imdbId ? await getMoviePosters(imdbId) : null;

        return { ...details, images };
      })
    );
    setMovies(fullMovies);

    console.log(fullMovies);
  }

  async function getTrendingShows() {
    const response = await fetch(
      "https://api.trakt.tv/shows/trending?limit=50",
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":process.env.TRAKT_API_KEY
           
        },
      }
    );

    const shows = await response.json();
    console.log(shows);

    return shows.map((show) => show.show);
  }

  // Fetch full movie details from Trakt (including TMDB ID)
  async function getShowsFullDetails(traktId) {
    const response = await fetch(
      `https://api.trakt.tv/shows/${traktId}?extended=full`,
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key":process.env.TRAKT_API_KEY
           
        },
      }
    );

    return response.json();
  }

  // Fetch movie images from Fanart.tv using TMDB ID
  async function getShowsPosters(tmdbId) {
    if (!tmdbId) return null; // Avoid errors if TMDB ID is missing

    const response = await fetch(
      `https://www.omdbapi.com/?i=${tmdbId}&apikey=${process.env.OMDB_API_KEY}`
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
  async function fetchCompleteShowsDetails() {
    const trendingMovies = await getTrendingShows();

    const fullMovies = await Promise.all(
      trendingMovies.map(async (movie) => {
        const details = await getShowsFullDetails(movie.ids.trakt);
        const imdbId = details.ids.imdb; // ✅ Get TMDB ID directly from Trakt

        // Fetch images if TMDB ID is available
        const images = imdbId ? await getShowsPosters(imdbId) : null;

        return { ...details, images };
      })
    );
    setShows(fullMovies);

    console.log(fullMovies);
  }

  const [filter, setFilter] = useState("Movies");

  useEffect(() => {
    fetchCompleteMovieDetails();
    fetchCompleteShowsDetails();
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "black" }}>
        <div className="container-sm">
          <div className="row-sm">
            <div className="col-12">
              <div className="tw-flex tw-justify-between tw-p-2">
                <h4 className="tw-text-white tw-mt-24">
                  Trending Movies and Shows
                </h4>
                <div>
                  <div className="tw-gap-8 tw-mt-24 tw-flex tw-bg-[#1E1E1E] tw-rounded-full tw-border tw-border-gray-700 tw-shadow-lg tw-overflow-hidden tw-p-2 tw-border tw-border-red-300">
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-py-2 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Movies"
                          ? "tw-bg-gray-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white"
                      }`}
                      onClick={() => setFilter("Movies")}
                    >
                      Movies
                    </button>
                    <button
                      className={`tw-flex-1 tw-text-gray-300 tw-text-sm tw-font-medium tw-py-2 tw-rounded-full tw-transition-all tw-duration-300 ${
                        filter === "Shows"
                          ? "tw-bg-gray-800 tw-text-white tw-shadow-md"
                          : "hover:tw-bg-gray-700 hover:tw-text-white"
                      }`}
                      onClick={() => setFilter("Shows")}
                    >
                      Shows
                    </button>
                  </div>
                </div>
              </div>
              <div className=" tw-flex tw-flex-wrap">
                <Caros data={filter === "Movies" ? movies : shows} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
