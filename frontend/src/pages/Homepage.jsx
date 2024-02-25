import React from 'react';
import Navbar from './Navbar';
import HeroSection from '../Sections/HeroSection';
import Accordian from '../components/Accordian';
import Footer from '../components/Footer';
import TopRated from '../components/TopRated';
import SliderComp from '../components/SliderComp';
import { useApi } from '../Context/Contxt';

function Homepage() {
  const { now_playing, popular, top_rated, upcomingMovies } = useApi();
  
  return (
    <div className='bg-custom-30  '>
      <Navbar />
      <HeroSection />
      <div className='p-4 '>
        <SliderComp topic={"TOP RATED"} config={top_rated} />
     
        <SliderComp topic={"Popular"} config={popular} />
        <SliderComp topic={"Now Playing"} config={now_playing} />
        <SliderComp topic={"Upcoming Movies"} config={upcomingMovies} />
    </div>
      <Accordian />
      <Footer/>
    </div>
  )

}

export default Homepage
