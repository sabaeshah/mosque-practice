import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';

const Posters = () => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 0,
    autoplay: false,
    autoplaySpeed: 0, // Rotate every 10 seconds
};

return (
    <div className="index-class">
           {/* Logo container */}
           <div className="flex justify-center my-2">
        <img src="/pics/banners/logo.jpg" alt="Logo" className="" /> {/* Adjust width as needed */}
      </div>
      {/* Slider container */}
      <Slider {...settings}>
      <div className="">
      
      <img src="/pics/banners/eid.jpg" alt="poster1" className="w-full h-full object-contain" />
        </div>
      </Slider>
    </div>
  );
};


export default Posters;
