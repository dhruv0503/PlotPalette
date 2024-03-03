import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Avatar from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';
import { Strong, Text } from '@radix-ui/themes';
import Navbar from '../pages/Navbar';

function AvatarSlider({ props }) {
    var settings = {
        dots: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const navigate = useNavigate(); 

    return (
      
        <div className='p-6 gap-3  items-center '>
            <Text size={"8"} ><Strong className='p-3 font-bold '>Cast </Strong></Text>
            <hr className='m-3' />
            <div className='p-1'>
            <Slider {...settings}>
                    {props?.map((movie, index) => (
                        <div >
                            <Avatar.Root  className="bg-blackA1 inline-flex h-[100px] w-[100px] select-none items-center justify-center overflow-hidden rounded-full align-middle"  >
                                <Avatar.Image height={64} width={64}
                                    className="h-full w-full rounded-[inherit] object-cover border border-custom-10  "
                                    src={`https://image.tmdb.org/t/p/original${movie.profile_path}`}
                                    alt="Colm Tuite"
                                />
                                <Avatar.Fallback
                                    className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                    delayMs={600}
                                > 
                                </Avatar.Fallback>
                            </Avatar.Root>
                            <button onClick = {()=>navigate(`/actor/${movie.id }`)}  className='p-2 font-bold'> {movie.original_name}</button>
                        </div>
                    ))}    
                </Slider>
            </div>
        </div>


    
  )
}

export default AvatarSlider
