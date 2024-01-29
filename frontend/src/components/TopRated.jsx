import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import data from '../assets/Data'
import { MovieCard } from './CustomCard';

function TopRated() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        CenterMode: true,
     
        centerPadding: '60px',
        slidesToShow: 4, // Number of movies shown at once
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

  




  return (

      
      <div className='p-4 gap-3'>
          <h1 className='p-4 bg-gradient-to-r from-custom-50 to-custom-40 text-white font-bold text-2xl mb-4 rounded-md shadow-lg'>
              TOP RATED
          </h1>
          <div className='p-2'>
              <Slider {...settings}>
                  {data.map((movie, index) => (
                      <div className='focus:outline-none' key={index}>
                          {/* Assuming MovieCard is a component */}
                          <MovieCard {...movie} />
                      </div>
                  ))}
              </Slider>
          </div>
      </div>

  )
}

export default TopRated





