import React from 'react';
import Navbar from './Navbar';
import HeroSection from '../Sections/HeroSection';
import Accordian from '../components/Accordian';
import Footer from '../components/Footer';
import SliderComp from '../components/SliderComp';
import { useApi } from '../Context/Contxt';

export default React.memo(function Homepage() {
  const { popular, top_rated, upcomingMovies } = useApi();
  
  return (
    <div className='bg-custom-30  '>
      <Navbar />
      <div className='bg-custom-50 '>
        <HeroSection props={popular} />
      </div>
      <div className='p-10'>
        <SliderComp topic={"TOP RATED"} config={top_rated} />
        <SliderComp topic={"Upcoming Movies"} config={upcomingMovies} />
      </div>
      <Accordian />
      <Footer />
    </div>
  )

});

