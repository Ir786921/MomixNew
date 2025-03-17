
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StarCastCarousel = ({cast,Section}) => {
     const [scrollPosition, setScrollPosition] = useState(0);
      const carouselRef = useRef(null);
      const navigate = useNavigate();
    
      function clickHandler(id){
          navigate(`/details/${id}`)
      }
    
    
    
      const scrollLeft = () => {
        if (carouselRef.current) {
          const scrollAmount = Math.min(scrollPosition, 200);
          setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
          carouselRef.current.scrollTo({
            left: Math.max(0, scrollPosition - scrollAmount),
            behavior: "smooth",
          });
        }
      };
    
      const scrollRight = () => {
        if (carouselRef.current) {
          const maxScrollPosition = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          const scrollAmount = 200;
          setScrollPosition(Math.min(maxScrollPosition, scrollPosition + scrollAmount));
          carouselRef.current.scrollTo({
            left: Math.min(maxScrollPosition, scrollPosition + scrollAmount),
            behavior: "smooth",
          });
        }
      };
  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-px-4 ">

<div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <h2 className="tw-text-2xl tw-font-bold tw-text-white">{Section}</h2>
        
      </div>
   
   

    <div className="tw-relative">
      {/* Left Arrow */}
      <button
        className={`tw-absolute md:tw-left-[-55px] tw-left-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-10 tw-bg-black tw-bg-opacity-80 tw-p-3 tw-rounded-full tw-text-white hover:tw-bg-opacity-100 tw-transition-all ${
          scrollPosition <= 0 ? " tw-cursor-not-allowed" : "tw-opacity-100"
        }`}
        onClick={scrollLeft}
        disabled={scrollPosition <= 0}
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="tw-flex tw-overflow-x-hidden tw-scroll-smooth tw-gap-5 tw-py-4 tw-px-12"
        style={{ scrollBehavior: "smooth" }}
      >
       {cast.map((actor, index) => (
            <div key={index} className="tw-group tw-cursor-pointer">
              <div className="tw-w-40 tw-overflow-hidden tw-rounded-lg tw-shadow-lg tw-transform tw-transition tw-duration-300 group-hover:tw-shadow-xl group-hover:tw-scale-[1.03]">
                <img 
                  src={actor.image} 
                  alt={actor.name}
                  className="tw-w-full tw-aspect-square tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-110"
                />
              </div>
              <div className="tw-mt-3">
                <h3 className="tw-font-bold tw-text-sm group-hover:tw-text-red-500 tw-transition-colors">{actor.name}</h3>
                <p className="tw-text-gray-400 tw-text-xs">{actor.character}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Right Arrow */}
      <button
        className={`tw-absolute md:tw-right-[-55px] tw-right-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-10 tw-bg-black tw-bg-opacity-80 tw-p-3 tw-rounded-full tw-text-white hover:tw-bg-opacity-100 tw-transition-all ${
          scrollPosition >= (carouselRef.current?.scrollWidth - carouselRef.current?.clientWidth)
            ? "tw-cursor-not-allowed"
            : "tw-opacity-100"
        }`}
        onClick={scrollRight}
        disabled={carouselRef.current && scrollPosition >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
  )
}

export default StarCastCarousel