import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import data from '../assets/Data'
import { MovieCard } from './CustomCard';
import { Text, Strong } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

function SliderComp(props) {
    const { topic, config } = props;
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
    const navigate = useNavigate();

    return (
        <div className='p-6 gap-3 '>
            <div className='flex justify-between item-center' >
                <Text size={"8"} className='p-4 text-custom-10   rounded-md shadow-lg'>
                    <Strong>{props.topic}</Strong>

                </Text>
                <button onClick={() => navigate('/movies')} className='text-custom-20' >View ALL</button>
            </div>

            <hr className='m-3' />
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