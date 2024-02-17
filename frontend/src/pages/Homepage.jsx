import React from 'react';
import Navbar from './Navbar';
import HeroSection from '../Sections/HeroSection';
import Accordian from '../components/Accordian';
import Footer from '../components/Footer';
import TopRated from '../components/TopRated';

function Homepage() {
  return (
    <div className='bg-custom-30'>
      <Navbar />
      <HeroSection />
      <div className='p-4'>
      <TopRated />
      <TopRated />
      </div>
      <Accordian />
      <Footer/>
    </div>
  )

}

export default Homepage
