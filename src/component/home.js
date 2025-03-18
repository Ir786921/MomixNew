import { Link } from "react-router-dom";
import Footer from "./Footer";

import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import brave from "../asset/Backgrounf.jpg";
import React, { useEffect, useState } from "react";

import MovieCarousel from "./MovieCarousel";

import Faq from "./Accordians";
import { useDispatch, useSelector } from "react-redux";
import { AddHighRated, AddMostWatched, AddMovies, AddShows, AddTrendingMovies, AddTrendingShows } from "./DataSlice";
import Store from "./store";

const Section = ({ question, answer, isvisible, setIsvisible }) => {
  return (
    <div className="tw-flex tw-flex-col tw-items-center">
      <div
        className="tw-outline tw-bg-slate-700 tw-w-2/3 tw-p-3 tw-rounded-md hover:tw-bg-slate-500"
        onClick={() => {
          setIsvisible(true);
        }}
      >
        {" "}
        <h4 className="tw-inline-block tw-text-white">{question}</h4>{" "}
        <span className="tw-text-white tw-float-right">
          {isvisible ? (
            <i
              className="bi bi-dash-lg"
              onClick={() => {
                setIsvisible(false);
              }}
            ></i>
          ) : (
            <i className="bi bi-plus-lg tw-text-white tw-text-lg"></i>
          )}
        </span>
        <br />
        {isvisible && <p className="tw-text-white">{answer}</p>}
      </div>
    </div>
  );
};

const Home = () => {

  const [sectionconfig, setSectionconfig] = useState({
    Q1: false,
    Q2: false,
    Q3: false,
  });
 
  
 
 const [rated,setRated] = useState([])

  const dispatch = useDispatch()

  const popularMovie = useSelector(Store => Store.Data.Movies)
  const popularShow = useSelector(Store => Store.Data.Shows)
  const MostWatched = useSelector(Store => Store.Data.MostWatch)
  const mostRated = useSelector(Store => Store.Data.HighRated)
  const trendmovies = useSelector(Store => Store.Data.TrendingMovies)
  console.log(mostRated[0]);
  console.log(MostWatched[0]);
  
  

  function HighRated() {
    if (!popularShow && !popularMovie) return; 
    
    const topRatedShows = popularShow[0].filter((item)=> {return item?.rating > 8})
    const topRatedMovies = popularMovie[0].filter((item)=> {return item?.rating > 8})

    const result = [...topRatedShows,...topRatedMovies]
  
    
    
    
  
    
 
 
    dispatch(AddHighRated(result))
    
   
   
  }

  async function getMostWatched() {
    const response1 = await fetch(
      "https://api.trakt.tv/movies/watched/all?limit=50&extended=full",
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": process.env.TRAKT_API_KEY,
        },
      }
    );

    const response2 = await fetch(
      "https://api.trakt.tv/shows/watched/all?limit=50&extended=full",
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
    if (!response2.ok) {
      throw new Error(`Trakt API error: ${response2.status}`);
    }

    const movies = await response1.json();
    const shows = await response2.json();
    const first = movies.map((movie) => {
      return movie?.movie;
    });
    const updated1 = first.map((item) => {
      return Object.assign(item, { media_type: "movies" });
    });

    const second = shows.map((show) => {
      return show?.show;
    });

    const updated2 = second.map((item) => {
      return Object.assign(item, { media_type: "shows" });
    });

    const result = [...updated1, ...updated2];

    return result; // ✅ Return directly, no need for `.map()`
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
  
    dispatch(AddMostWatched(fullMovies))
  
  }



  async function getPopularShow() {
    const response = await fetch(
      "https://api.trakt.tv/shows/popular?limit=50&extended=full",
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

    const shows = await response.json();

    return shows; // ✅ Return directly, no need for `.map()`
  }

  async function getPopularShowPosters(tmdbId) {
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

  async function fetchCompletePopularShows() {
    const PopularMovies = await getPopularShow();

    const fullMovies = await Promise.all(
      PopularMovies.map(async (movie) => {
        const imdbId = movie.ids.imdb; // ✅ Get TMDB ID directly from Trakt

        // Fetch images if TMDB ID is available
        const images = imdbId ? await getPopularShowPosters(imdbId) : null;

        return { ...movie, images };
      })
    );
    const updated1 = fullMovies.map((item) => {
      return Object.assign(item, { media_type: "shows" });
    });
    const sortedShow = updated1.sort((a, b) => b.rating - a.rating);
    setRated(prev => [...prev , sortedShow])
    dispatch(AddShows(updated1))
    

 
  }

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
          "trakt-api-key":process.env.TRAKT_API_KEY
           
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

    const sortedMovies = updated.sort((a, b) => b.rating - a.rating);
    setRated(prev => [...prev , sortedMovies]);
    dispatch(AddMovies(updated))
   
    console.log(fullMovies);
  }

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
          "trakt-api-key":process.env.TRAKT_API_KEY
           
        },
      }
    );

    return response.json();
  }

  // Fetch movie images from Fanart.tv using TMDB ID
  async function getMoviePosters(tmdbId) {
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
  async function fetchCompleteMovieDetails() {
    const trendingMovies = await getTrendingMovies();

    const fullMovies = await Promise.all(
      trendingMovies.map(async (movie) => {
        const details = await getMovieFullDetails(movie?.ids?.trakt);
        const imdbId = details.ids.imdb; // ✅ Get TMDB ID directly from Trakt

        // Fetch images if TMDB ID is available
        const images = imdbId ? await getMoviePosters(imdbId) : null;

        return { ...details, images };
      })
    );

    const updated = fullMovies.map((item) => {
      return Object.assign(item, { media_type: "movies" });
    });
    dispatch(AddTrendingMovies(updated))
  
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
  
    
    async function getShowsPosters(tmdbId) {
      if (!tmdbId) return null;
  
      const response = await fetch(
        `https://www.omdbapi.com/?i=${tmdbId}&apikey=${process.env.PARCEL_PUBLIC_OMDB_API_KEY}`
      );
  
      if (!response.ok) return null; 
  
      const images = await response.json();
      
      
  
      return {
        poster: images.Poster || null,
        background: images.moviebackground?.[0]?.url || null,
        logo: images.hdmovielogo?.[0]?.url || null,
      };
    }
  
   
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
      const updated = fullMovies.map((item) => {
        return Object.assign(item, { media_type: "shows" });
      });
      dispatch(AddTrendingShows(updated))
     
  
    
    }
  useEffect(() => {
    fetchCompleteMovieDetails();
    fetchCompletePopularMovieDetails();
    fetchCompletePopularShows();
    fetchCompleteMostWatched();
    fetchCompleteShowsDetails()
   
    


    
  }, []);

  return (
    <>
      <div
        className="conatiner-fluid tw-h-screen tw-text-white tw-relative"
        style={{
          backgroundImage: `url(${brave})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
       <Navbar/>

        {/* Black Overlay */}
        <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-60"></div>

        {/* Content Layer */}
        <div className=" tw-flex tw-justify-center  tw-w-full  tw-p-6">
          <div className="tw-relative tw-mt-40  tw-z-10">
            <h1 className="tw-text-5xl tw-font-bold tw-text-center">
              Unlimited TV, Shows{" "}
            </h1>
            <h1 className="tw-text-5xl tw-font-bold tw-text-center tw-mt-4 tw-items-center">
              Movies and More
            </h1>
            <p className="tw-mt-4 tw-text-lg tw-text-center tw-font-bold">
              Your next favorite show is just a click away!
            </p>
            <div className="">
              <SearchBar />
              {/* <button className=" tw-px-8 tw-bg-red-600 border-0 tw-m-auto tw-text-white tw-py-2 tw-rounded-md tw-shadow-md hover:tw-bg-red-700">Get Started</button> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" tw-bg-black">
        <div>
          <MovieCarousel
            Section={"Trending Now 🔥"}
            trendmovies={trendmovies[0]}
          />
        </div>
        <div>
          <MovieCarousel Section={"Most Rated ⭐"} trendmovies={rated[0]} />
        </div>

        <div>
          <MovieCarousel
            Section={"Popular Movies"}
            trendmovies={popularMovie[0]}
          />
        </div>
        <div>
          <MovieCarousel Section={"Popular Shows"} trendmovies={popularShow[0]} />
        </div>
        <div>
          <MovieCarousel
            Section={"Most Watched Movie and Show"}
            trendmovies={MostWatched[0]}
          />
        </div>

        <div>
          <Faq/>
        </div>
      </div>
    </>
  );
};

export default Home;
