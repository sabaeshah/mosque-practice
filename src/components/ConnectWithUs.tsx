import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../index.css';

const ConnectWithUs = () => {
    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000, // Rotate every 10 seconds
    };

    return (
        <div className="text-white p-4 index-class">
            <div className="my-16"></div> 
            <h2 className="text-left text-5xl font-bold mb-4 text-white p-2">Connect With Us</h2>
            {/* Slider container */}
            <div className="my-5"></div> 
            <Slider {...settings}>
                <div>
                    <img src="/pics/qrcodes/fb.png" alt="Facebook" className="w-full p-3" />
                </div>
                <div>
                    <img src="/pics/qrcodes/1.png" alt="Instagram" className="w-full p-3" />
                </div>
                <div>
                    <img src="/pics/qrcodes/email.png" alt="Mail" className="w-full p-3" />
                </div>
                <div>
                    <img src="/pics/qrcodes/u-tube.png" alt="Youtube" className="w-full p-3" />
                </div>
            </Slider>
        </div>
    );
};

export default ConnectWithUs;
