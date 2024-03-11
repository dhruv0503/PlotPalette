import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './Navbar'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { MovieCard, BookCard } from "../components/CustomCard.jsx"
import LoadingPage from '../components/LoadingPage.jsx'
import axios from 'axios'
import data from '../assets/Data.jsx';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useApi } from '../Context/Contxt.jsx';
import { Text ,Strong } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import im from "../assets/plot_palette.png"


export default React.memo(function Movies() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  const { genres } = useApi();

  const navigate = useNavigate();
  return (
    <div className='bg-custom-30 '>
      <div className='bg-gray-900' ><Navbar /></div>
      <div className='p-10' >
        <Text size={"8"} className='text-custom-20 '  ><Strong>Pick By Genres</Strong></Text>
     
        <Slider {...settings} className='' >
          
          {genres.map((movie, index) => (
            <div      className='max-w-md min-h-sm p-4 overflow-hidden rounded-lg shadow-s m-2 relative' >
              <div style={{ backgroundImage: `url(${movie.img})`, backgroundSize: 'cover', backgroundPosition: 'center', }}  class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                <div class="relative">
                  <div className='border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950'>
                    <img src={im} alt="LOGO" style={{ width: '300px', height: 'auto' }} />
                  </div>

               
                <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                    <Text onClick={() => navigate(`/movies/category/${movie.name}`)} className='text-custom-20 cursor-pointer ' size={"6"} ><Strong> {movie.name}</Strong></Text>
                 
                </div>
              </div>
              </div>
            </div>
          ))}

        </Slider>
       <Text size={"8"} className='text-custom-20'  ><Strong>Search by category</Strong></Text>
        <div className='grid grid-cols-2 m-3 gap-3 ' >

          <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
            <div class="relative">
              <div className='border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950'>
                <img src={im} alt="LOGO" style={{ width: '300px', height: 'auto' }} />
              </div>
              <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                <Text onClick={() => navigate(`/movies/toprated`)} className='text-custom-20 cursor-pointer ' size={"7"}  ><Strong>Top Rated</Strong></Text>

              </div>
            </div>
          </div>
          <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
            <div class="relative">
              <div className='border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950'>
                <img src={im} alt="LOGO" style={{ width: '300px', height: 'auto' }} />
              </div>
              <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                <Text onClick={() => navigate(`/movies/upcoming`)} className='text-custom-20 cursor-pointer ' size={"7"}  ><Strong>Upcoming</Strong></Text>

              </div>
            </div>
          </div>
          <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
            <div class="relative">
              <div className='border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950'>
                <img src={im} alt="LOGO" style={{ width: '300px', height: 'auto' }} />
              </div>
              <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                <Text onClick={() => navigate(`/movies/nowplaying`)} className='text-custom-20 cursor-pointer ' size={"7"}  ><Strong>Now Playing</Strong></Text>

              </div>
            </div>
          </div>
          <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
            <div class="relative">
              <div className='border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950'>
                <img src={im} alt="LOGO" style={{ width: '300px', height: 'auto' }} />
              </div>
              <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                <Text onClick={() => navigate(`/movies/popular`)} className='text-custom-20 cursor-pointer ' size={"7"} ><Strong>Popular</Strong></Text>

              </div>
            </div>
          </div>

        </div>
   
       
      </div>
     
    </div>
  )
});

