import React, { Children, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./component/Navbar";
import SearchBar from "./component/SearchBar";

import Trending from "./component/Trending";
import Movies from "./component/Movies";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  useParams,
  useLocation,
} from "react-router-dom";

import Home from "./component/home";
import Footer from "./component/Footer";
import Series from "./component/Series";

import Details from "./component/Details";

import { Provider } from "react-redux";
import Store from "./component/store.js";
import Favourite from "./component/Favourite";
import Signup from "./component/SignUp";

const App = () => {
  const [data, setData] = useState([]);

  const content = useLocation();
  let path = content.pathname;
  console.log(path);
  const param = useParams();
  return (
    <Provider store={Store}>
     {path === "/" ? <Signup/> :  <>  <Navbar/> <Outlet/> <Footer/> </>}
    
     
      

      
      
    </Provider>
  );
};

const routeConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path :"/",
        element:<Signup/>
      },

      {
        path: "/movie",
        element: <Movies />,
      },
      {
        path: "/details/:media/:id",
        element: <Details />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
      {
        path: "/shows",
        element: <Series />,
      },
      
      
      { path: "/favourities", element: <Favourite /> },

      {
        path: "/browse",
        element: <Home />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routeConfig} />);
