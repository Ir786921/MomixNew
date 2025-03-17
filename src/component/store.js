import { configureStore } from "@reduxjs/toolkit";
import Wishlistslice from "./listslice";
import UserSlice from "./UserSlice"


const Store = configureStore({
    reducer:{
        wishlist:Wishlistslice,
        user:UserSlice
        

    }
});
export default Store;