import React, { useState, useEffect } from 'react'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const HomeSlider = ({ slides }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className='p-6 gap-3 '>
          
            <div className='p-1'>
                <Slider {...settings}>
                    {slides.map((movie) => (
                        <div className='focus:outline-none' >
                           <img className='h-[600px] ' src={movie} alt="" />
                        </div>
                    ))}


                </Slider>
            </div>
        </div>
    );
};

export default HomeSlider;
