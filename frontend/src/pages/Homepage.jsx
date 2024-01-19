import React from 'react';
import Navbar from './Navbar';
import HeroSection from '../Sections/HeroSection';
import Accordian from '../components/Accordian';
import Footer from '../components/Footer';

function Homepage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Accordian />
      <Footer/>
    </>
  )

}

export default Homepage
