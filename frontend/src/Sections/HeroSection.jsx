import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';

function HeroSection() {
  const im = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxMDg1Nzk1MV5BMl5BanBnXkFtZTcwMDk0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg";
  return (
    <section className=' bg-custom-50 p-8'>
        <div className=' grid grid-cols-2 mt-20'> 
          <div className="w-full max-w-[500px] mx-[15px] ">
            <img src={im} alt="" />
            <div className="text-white text-[15px] leading-5 font-medium">PLOT PALETTE</div>
            <div className="text-white text-[15px] leading-5">Platform for the plot.</div>
            <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
            
        </div>
        <div className='bg-white '>
          <p className='p-3 font-mono font-black text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illum dolor itaque quis. Molestias voluptas corrupti minus tenetur maiores sequi sit, eaque aliquam, accusamus, nam aut amet quisquam aperiam modi.</p>

          <div className='bg-blue-800 p-4'>
          <div className="flex h-5 items-center  p-4 ">
            <div className="text-black text-[15px] leading-5 p-4">
              <p>MOVIES</p>
              <button className='bg-black text-zinc-500 p-1 rounded-md'>click me</button>
            </div>
            <Separator.Root
              className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
              decorative
              orientation="vertical"
            />

            <div className="text-black text-[15px] leading-5">
              <p>Rating</p>
              <button className='bg-black text-zinc-500 p-1 rounded-md'>click me</button>
            </div>
            <Separator.Root
              className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
              decorative
              orientation="vertical"
            />
            <div className="text-black text-[15px] leading-5">
              <p>ACCOUNT</p>
              <button className='bg-black text-zinc-500 p-1 rounded-md'>click me</button>
            </div>
          </div>
          </div>
        </div>
        </div>
      

    

    </section>

  )
}

export default HeroSection


