import { createSlice } from "@reduxjs/toolkit";

const data = createSlice({
    name : 'Data',
    initialState:{
        Popular : [],
        TrendingMov : [],
        Show:[]
    },
    reducers :{
        PopularMovies : (state , action)=>{
              state.Popular.push(action.payload)
        },
        TrendMovies : (state , action)=>{
            state.TrendingMov.push(action.payload)
      },
      Shows : (state , action)=>{
        state.Show.push(action.payload)
  },


    }
})

export const {PopularMovies , TrendMovies , Show} = data.actions;
export default data.reducer;