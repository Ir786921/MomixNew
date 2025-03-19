import { createSlice } from "@reduxjs/toolkit";

const data = createSlice({
  name: "Data",
  initialState: {
    Movies: [],
    Shows: [],
    TrendingMovies: [],
    TrendingShows: [],
    HighRated: [],
    MostWatch: [],
  },
  reducers: {
    AddMovies: (state, action) => {
      state.Movies.push(action.payload);
    },
    AddShows: (state, action) => {
      state.Shows.push(action.payload);
    },
    AddTrendingMovies: (state, action) => {
      state.TrendingMovies.push(action.payload);
    },
    AddTrendingShows: (state, action) => {
      state.TrendingShows.push(action.payload);
    },
    AddHighRated: (state, action) => {
      state.HighRated.push(action.payload);
    },
    AddMostWatched: (state, action) => {
      state.MostWatch.push(action.payload);
    },
  },
});

export const {
  AddMovies,
  AddShows,
  AddTrendingMovies,
  AddHighRated,
  AddMostWatched,
  AddTrendingShows,
} = data.actions;
export default data.reducer;
