import { configureStore } from "@reduxjs/toolkit";
import Wishlistslice from "./listslice";
import UserSlice from "./UserSlice"
import data from "./DataSlice"


const Store = configureStore({
    reducer:{
        wishlist:Wishlistslice,
        user:UserSlice,
        Data:data
        

    }
});
export default Store;