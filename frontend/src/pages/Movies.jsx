import React from 'react'
import Navbar from './Navbar'
import { MovieCard, BookCard } from "../components/CustomCard.jsx"

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


const bookData = {
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  publicationYear: 1960,
  coverUrl: 'https://via.placeholder.com/300',
};


function Movies() {
  return (
    <div className='bg-custom-10'>
      <Navbar/>
      <div className="p-3  gap-3 grid grid-cols-4 justify-around mt-8">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
        
      </div>
    </div>
      )
}

export default Movies
