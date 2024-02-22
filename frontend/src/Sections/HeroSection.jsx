import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';

function HeroSection() {
  const im = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxMDg1Nzk1MV5BMl5BanBnXkFtZTcwMDk0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg";
  return (
    <section className='relative bg-custom-50 p-8 '>
        <div className='  sm:grid sm:grid-cols-2 mt-20'> 
          <div className="w-full max-w-[500px] mx-[15px]  z-10 ">
          <img src={im} className='shadow-sm p-5 mb-5 bg-custom-20 rounded-md' alt="" />
            <div className="text-white text-[15px] font-bold text-lg leading-5 font-medium">PLOT PALETTE</div>
            <div className="text-white text-[15px] leading-5">Platform for the plot.</div>
            <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
            
        </div>

        <div className='bg-white z-10 p-10 '>
          <p className='p-3 font-mono font-black text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illum dolor itaque quis. Molestias voluptas corrupti minus tenetur maiores sequi sit, eaque aliquam, accusamus, nam aut amet quisquam aperiam modi. </p>

          <div className='flex justify-center bg-blue-800 rounded-md p-4'>
              <button className='bg-black text-zinc-500 p-1 rounded-md'>MOVIES</button>
     
          </div>
        </div> 
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-0">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="relative block w-[calc(103% + 1.3px)] h-220 fill-current text-custom-30 "></path>
        </svg>
      </div>
    </section>

  )
}





export default HeroSection


