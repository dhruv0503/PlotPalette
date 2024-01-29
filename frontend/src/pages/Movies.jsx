import React, { useState } from 'react'
import Navbar from './Navbar'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { MovieCard, BookCard } from "../components/CustomCard.jsx"
import data from '../assets/Data.jsx';


function Movies() {
  const [genre, setgenre] = useState();
  console.log(genre);
  

  return (
    <div className='bg-custom-10'>
      <Navbar />
      <div className='mt-20 p-2 flex flex-cols-2'>
        <div className='p-1 mt-5 border border-black'>
          <ScrollArea.Root className="w-[200px] h-[225px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA4 bg-white">
            <ScrollArea.Viewport className="w-full h-full rounded">
              <div className="py-[15px] px-5">
                <div className="text-violet11 text-[15px] leading-[18px] font-medium">FILTER</div>
                {TAGS.map((tag) => (
                  <div
                    className="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
                    key={tag}
                  >
                    <button onClick={()=>{setgenre({tag})}}>{tag}</button>
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="horizontal"
            >
              <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA5" />
          </ScrollArea.Root>
      </div>

      <div className="p-3  gap-3 grid grid-cols-4 justify-around ">
          {data.map((movie, index) => (
            <MovieCard key={index} {...movie} />       
        ))} 
        </div>
      </div>
    </div>
      )
}

export default Movies

const TAGS = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Documentary",
  "Family",
  "Musical",
  "War",
  "Western",
  "Crime",
  "Historical",
  "Biography",
  "Sports",
];
