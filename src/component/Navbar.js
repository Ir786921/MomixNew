import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import pic from "../asset/Pic.jpeg";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import Store from "./store";
import { isLogin, removeUser } from "./UserSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const isUser = useSelector((Store) => Store.user.isAuthenticated);
  const User = useSelector((Store) => Store.user.item);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    console.log("Logout clicked");

    try {
      await signOut(auth)
        .then(() => {
          console.log("User logged out successfully");
          dispatch(removeUser());
          dispatch(isLogin());
          navigate("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error.message);
        });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <>
      <div
        className={`tw-fixed  tw-top-0 tw-flex tw-justify-between tw-p-3  tw-text-lg tw-gap-6 tw-items-center tw-text-white tw-w-full tw-z-40 ${
          isScrolled
            ? "tw-bg-black tw-shadow-md tw-py-1"
            : " tw-backdrop-blur-md tw-py-2"
        }`}
      >
        <div className="tw-relative  tw-flex tw-justify-center">
          <h1
            className="tw-cursor-pointer md:tw-ml-10 tw-text-red-500 tw-text-4xl tw-font-extrabold tw-ext-red-600 tw-tracking-wide tw-italic tw-drop-shadow-lg tw-transform tw-origin-center"
            onClick={() => {
              navigate("/browse");
            }}
          >
            <span className="tw-inline-block tw-transform tw-rotate-[-10deg]">
              M
            </span>
            <span className="tw-inline-block tw-transform tw-rotate-[-5deg]">
              O
            </span>
            <span className="tw-inline-block tw-transform tw-rotate-[0deg]">
              M
            </span>
            <span className="tw-inline-block tw-transform tw-rotate-[5deg]">
              I
            </span>
            <span className="tw-inline-block tw-transform tw-rotate-[10deg]">
              X
            </span>
          </h1>
        </div>
        <div className="md:tw-hidden">
          <button
            onClick={() => setIsProfile(!isProfile)}
            className="tw-p-2 tw-rounded-lg tw-text-red-600 hover:tw-text-red-500 tw-bg-black"
          >
            {isProfile ? (
              <i className="fas fa-times tw-text-xl"></i>
            ) : (
              <i className="fas fa-bars tw-text-xl"></i>
            )}
          </button>
        </div>
        <ul className="tw-hidden md:tw-flex tw-gap-6 tw-p-2 tw-mr-4 tw-relative">
          <Link
            to="/movie"
            className="tw-no-underline tw-text-white tw-flex tw-flex-row-reverse tw-gap-3 tw-rounded-[30px] tw-px-3 tw-py-2 tw-items-center  tw-text-md tw-font-semibold tw-cursor-pointer"
          >
            Movie
          </Link>
          <Link
            to="/shows"
            className="tw-no-underline tw-text-white tw-flex tw-flex-row-reverse tw-gap-3 tw-rounded-[30px] tw-px-3 tw-py-2 tw-items-center  tw-text-md tw-font-semibold tw-cursor-pointer"
          >
            Show
          </Link>

          <Link
            to="/trending"
            className="tw-no-underline tw-text-white tw-flex tw-flex-row-reverse tw-gap-3 tw-rounded-[30px] tw-px-3 tw-py-2 tw-items-center  tw-text-md tw-font-semibold tw-cursor-pointer"
          >
            Trending
          </Link>

          <li className=" tw-flex tw-items-center tw-justify-center">
            <i
              class="fa-solid fa-heart tw-text-2xl tw-text-red-500 tw-cursor-pointer"
              title="Favourite"
              onClick={() => {
                navigate("/favourities");
              }}
            ></i>
          </li>
          <li className="tw-flex tw-flex-row-reverse tw-gap-3 tw-rounded-[30px] tw-px-3 tw-py-2 tw-items-center  tw-text-sm tw-font-semibold tw-cursor-pointer">
            {" "}
            <span
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? (
                <i class="fa-solid fa-chevron-down"></i>
              ) : (
                <i class="fa-solid fa-chevron-up"></i>
              )}
            </span>
            <div className="tw-z-100 tw-w-8 tw-h-8 tw-rounded-full tw-overflow-hidden tw-flex tw-items-center tw-justify-center border border-red-500">
              <img
                src={pic}
                alt="profile"
                className="tw-w-full tw-h-full tw-object-cover tw-z-40"
              />
            </div>
          </li>

          {isOpen && (
            <div
              className="dropdown-container tw-absolute tw-right-0 tw-top-20 tw-mt-2 tw-w-68 tw-bg-[#121212] tw-text-white tw-rounded-lg tw-shadow-lg tw-p-2 tw-z-10 tw-border tw-border-gray-800 
               tw-opacity-1 tw-scale-95 tw-animate-fadeIn tw-transition-all tw-duration-300 tw-ease-in-out tw-origin-top-right"
            >
              <div className="tw-p-2 tw-text-gray-300">Hi, User!</div>
              <hr className="tw-border-gray-700" />

              <div className="tw-list-none tw-p-2 hover:tw-bg-gray-800 tw-cursor-pointer tw-rounded">
                {isUser ? User[0]?.displayName : "User Name"}
              </div>

              <div className="tw-list-none tw-p-2 hover:tw-bg-gray-800 tw-cursor-pointer tw-rounded tw-break-words tw-whitespace-normal">
                {isUser ? User[0]?.email : "User Email"}
              </div>

              <div
                className="tw-p-2 hover:tw-bg-red-600 tw-cursor-pointer tw-rounded tw-list-none"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </ul>
      </div>

      {isProfile && (
        <div className="tw-backdrop-blur-md md:tw-hidden tw-text-white tw-absolute tw-w-full tw-bg-black tw-border-b tw-border-gray-100 tw-shadow-lg tw-z-50 tw-top-16 ">
          <div className="tw-px-4 tw-pt-2 tw-pb-3 tw-space-y-1">
            <div className="tw-border-b tw-border-gray-100">
              <div className="tw-flex tw-flex-col tw-gap-4 tw-p-2">
                <div className="tw-flex tw-items-center tw-space-x-3 tw-px-3">
                  <div className="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-flex tw-items-center tw-justify-center">
                    <i className="fas fa-user tw-text-white"></i>
                  </div>
                  <div>
                    <div className="tw-text-sm tw-font-semibold tw-text-gray-500">
                      {isUser ? User[0]?.displayName : "User Email"}
                    </div>
                    <div className="tw-text-xs tw-text-gray-500">
                      {isUser ? User[0]?.email : "User Email"}
                    </div>
                  </div>
                </div>

                <div className="tw-flex tw-flex-col tw-items-center tw-gap-3">
                  <Link
                    to="/movie"
                    className="tw-no-underline tw-text-white hover:tw-bg-red-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Movie
                  </Link>

                  <Link
                    to="/shows"
                    className="tw-no-underline tw-text-white hover:tw-bg-red-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Show
                  </Link>
                  <Link
                    to="/trending"
                    className="tw-no-underline tw-text-white hover:tw-bg-red-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Trending
                  </Link>

                  <Link
                    to="/favourities"
                    className="tw-no-underline tw-text-white hover:tw-bg-red-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Favourite &nbsp;{" "}
                    <i
                      class="fa-solid fa-heart tw-text-2xl tw-text-red-500 tw-cursor-pointer"
                      title="Favourite"
                    ></i>
                  </Link>

                  <div
                    className="tw-px-6 tw-py-2 tw-bg-gray-900 hover:tw-bg-red-600 tw-cursor-pointer tw-rounded tw-list-none"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
