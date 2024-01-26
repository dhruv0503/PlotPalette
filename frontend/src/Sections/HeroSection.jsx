import React from 'react';
import Carousel from '../components/Carousel';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';


function HeroSection() {
  return (
    <section className=' bg-custom-10  p-2'>
      <h1>Hello monsterlessons</h1>
      <div className=' w-[500px] h-[280px] m:auto'>
       <Carousel />
      </div>

    </section>

  )
}

export default HeroSection


