import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:"user",
    initialState:{
        item:[],
        isAuthenticated:false
    },
    reducers:{
        addUser : (state,action)=>{
             state.item.push(action.payload);
        },
        removeUser: (state,action)=>{
              state.item = [];
        },
        isLogin :(state,action) =>{
           if (state.isAuthenticated) {
            state.isAuthenticated = false
           }
           else {
            state.isAuthenticated = true
           }
        }

    }


})
export const {addUser , removeUser,isLogin } = UserSlice.actions;
export default UserSlice.reducer;


