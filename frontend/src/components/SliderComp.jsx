import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import data from '../assets/Data'
import { MovieCard } from './CustomCard';

function SliderComp(props) {
    const { topic, config } = props;
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
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
    return (
        <div className='p-6 gap-3   '>
            <h1 className='p-4 bg-gradient-to-r from-custom-50 to-custom-40 text-white font-bold text-2xl mb-4 rounded-md shadow-lg'>
                {props.topic}
            </h1>
            <div className='p-1'>
                <Slider {...settings}>
                    {config.map((movie, index) => (
                        <div className='focus:outline-none' key={index}>
                            <MovieCard  {...movie} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>

    )
}

export default SliderComp