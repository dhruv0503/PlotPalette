import React from 'react'
import { BookCard } from '../components/CustomCard';
import Navbar from './Navbar';
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publicationYear: 1960,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: '1984',
    author: 'George Orwell',
    publicationYear: 1949,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publicationYear: 1925,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publicationYear: 1951,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publicationYear: 1813,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publicationYear: 1937,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    publicationYear: 2003,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    publicationYear: 2008,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    publicationYear: 1997,
    coverUrl: 'https://via.placeholder.com/300',
  },
  {
    title: 'Lord of the Flies',
    author: 'William Golding',
    publicationYear: 1954,
    coverUrl: 'https://via.placeholder.com/300',
  },
];



function Books() {
  return (
     <div className='bg-custom-10'>
      <Navbar/>
      <div className="p-3  gap-3 grid grid-cols-4 justify-around mt-8">
         {books.map((book, index)=>(
      <BookCard key={index} {...book} />
      ))}
        
      </div>
    </div>
  )
}

export default Books
