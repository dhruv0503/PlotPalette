import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';
import { Card, Text } from '@radix-ui/themes'


function HeroSection() {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate('movies/The%20Dark%20Knight')
  }
  const im = "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg%22"
  return (
    <section className='relative bg-custom-50 p-8'>
      <div className=' flex flex-col justify-center items-center lg:grid lg:grid-cols-2 mt-20'> 
        <div className="w-full max-w-[500px] mx-[15px] justify-center items-center   z-10 ">
          <img src={im} className='shadow-sm p-1 mb-5 bg-custom-20 rounded-md' alt="" />
            <div className="text-white text-[15px] font-bold text-lg leading-5 font-medium">PLOT PALETTE</div>
            <div className="text-white text-[15px] leading-5">Platform for the plot.</div>
            <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
            
        </div>
        <div className='bg-white max-w-[500px] bg-dotted-spacing-2 bg-dotted-radius-0.5 bg-dotted-custom-10   gap-3 z-10 p-10 border border-black rounded-lg '>
          <Card asChild style={{ maxWidth: 350 , margin:3  }}>
            <>              <Text as="div" size="2" weight="bold">
                The Dark Knight
              </Text>
              <Text as="div" color="gray" size="2">
                Drama, Action, Crime, Thriller

              </Text>
         </>
          </Card>

          <div className='p-4  border m-3 border-gray-900 rounded-lg font- bg-custom-20'>
            <p >Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker. </p></div>
          
          <button onClick={handleclick} class=" mt-2  bg-custom-30 border border-custom-50 hover:bg-custom-50 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
            Review Now
          </button>



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


