import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="tw-bg-gradient-to-b tw-from-black tw-to-[#1a0000] tw-py-10 tw-border-t tw-border-red-900/30">
      <div className="tw-container tw-mx-auto tw-px-4">
        <div className="tw-flex tw-flex-wrap tw-justify-between">
          {/* Logo and description */}
          <div className="tw-w-full md:tw-w-1/4 tw-mb-8 md:tw-mb-0">
            <div className="tw-flex tw-items-center tw-mb-4">
              <h2 className="tw-text-red-600 tw-font-bold tw-text-2xl">MOMIX</h2>
              <span className="tw-bg-red-600 tw-h-2 tw-w-2 tw-rounded-full tw-ml-1"></span>
            </div>
            <p className="tw-text-gray-400 tw-mb-6">Your ultimate destination for premium streaming entertainment. Discover thousands of movies and shows in stunning quality.</p>
            <div className="tw-flex tw-space-x-4">
              <a href="#" className="tw-bg-black tw-p-2 tw-rounded-full tw-border tw-border-red-800 tw-text-red-600 tw-hover:bg-red-900 tw-hover:text-white tw-transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="tw-bg-black tw-p-2 tw-rounded-full tw-border tw-border-red-800 tw-text-red-600 tw-hover:bg-red-900 tw-hover:text-white tw-transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="tw-bg-black tw-p-2 tw-rounded-full tw-border tw-border-red-800 tw-text-red-600 tw-hover:bg-red-900 tw-hover:text-white tw-transition-all">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="tw-bg-black tw-p-2 tw-rounded-full tw-border tw-border-red-800 tw-text-red-600 tw-hover:bg-red-900 tw-hover:text-white tw-transition-all">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="tw-w-full md:tw-w-1/5 tw-mb-6 md:tw-mb-0">
            <h3 className="tw-text-red-600 tw-font-bold tw-text-lg tw-mb-4 tw-flex tw-items-center">
              <span className="tw-w-1 tw-h-5 tw-bg-red-600 tw-mr-2"></span>
              Browse
            </h3>
            <ul className="tw-space-y-3">
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <Link to="/movie" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <span className="tw-w-1 tw-h-1 tw-bg-red-600 tw-mr-2"></span>
                  Movies
                </Link>
              </li>
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <Link to="/shows" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <span className="tw-w-1 tw-h-1 tw-bg-red-600 tw-mr-2"></span>
                  TV Shows
                </Link>
              </li>
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <Link to="/trending" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <span className="tw-w-1 tw-h-1 tw-bg-red-600 tw-mr-2"></span>
                  Trending
                </Link>
              </li>
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <Link to="/browse" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <span className="tw-w-1 tw-h-1 tw-bg-red-600 tw-mr-2"></span>
                  Browse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="tw-w-full md:tw-w-1/5">
            <h3 className="tw-text-red-600 tw-font-bold tw-text-lg tw-mb-4 tw-flex tw-items-center">
              <span className="tw-w-1 tw-h-5 tw-bg-red-600 tw-mr-2"></span>
              Contact
            </h3>
            <ul className="tw-space-y-3">
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <a href="https://accounts.google.com" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <i className="fas fa-envelope tw-mr-2 tw-text-red-600"></i>
                  support@momix.com
                </a>
              </li>
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <a href="https://www.linkedin.com/in/imran-raza-786mn/" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <i className="fab fa-linkedin tw-mr-2 tw-text-red-600"></i>
                  LinkedIn
                </a>
              </li>
              <li className="tw-list-none tw-transition-all tw-duration-300">
                <a href="#" className="tw-no-underline tw-text-gray-400 tw-hover:text-red-500 tw-flex tw-items-center">
                  <i className="fab fa-twitter tw-mr-2 tw-text-red-600"></i>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
