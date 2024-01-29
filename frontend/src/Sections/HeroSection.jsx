import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';

function HeroSection() {
  const im = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxMDg1Nzk1MV5BMl5BanBnXkFtZTcwMDk0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg";
  return (
    <section className=' bg-custom-10  p-2'>
       
      <div className=" relative ">
        <img className=' h-[500px] w-[1200px]'
          src={im}
          alt="background"
          
        />
        </div>

    

    </section>

  )
}

export default HeroSection


