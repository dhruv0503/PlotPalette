import React from 'react';
import Carousel from '../components/Carousel';
import * as Tabs from '@radix-ui/react-tabs';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { MovieCard } from '../components/CustomCard';


const movies = [
  {
    title: 'Inception',
    genre: 'Science Fiction',
    year: 2010,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    year: 1994,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Dark Knight',
    genre: 'Action, Crime',
    year: 2008,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Pulp Fiction',
    genre: 'Crime, Drama',
    year: 1994,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Forrest Gump',
    genre: 'Drama, Romance',
    year: 1994,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Matrix',
    genre: 'Action, Sci-Fi',
    year: 1999,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Schindler\'s List',
    genre: 'Biography, Drama, History',
    year: 1993,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Godfather',
    genre: 'Crime, Drama',
    year: 1972,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Titanic',
    genre: 'Drama, Romance',
    year: 1997,
    posterUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Jurassic Park',
    genre: 'Action, Adventure, Sci-Fi',
    year: 1993,
    posterUrl: 'https://via.placeholder.com/300',
  },
];


function HeroSection() {
  return (
    <section className=' bg-custom-10  p-2'>
      <div className="  gap-20 rounded-md shadow-[0_2px_10px]">
         
        <div>
          
        </div>
          
       
      </div>

    </section>

  )
}

export default HeroSection
