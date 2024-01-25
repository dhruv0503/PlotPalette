// MovieCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ title, genre, year, posterUrl }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm bg-custom-50 p-2 rounded-lg rounded overflow-hidden shadow-lg">
            <img className="w-full" src={posterUrl} alt={`${title} Poster`} />
            <div className="px-6 py-4">
                <div className="font-bold text-custom-10 text-xl mb-2">{title}</div>
                <p className="text-gray-700  text-custom-30 text-base">{genre}</p>
                <p className="text-gray-700 text-custom-30 text-base">{`Year: ${year}`}</p>
            </div>
            <button onClick={() => navigate("/temp")} className='bg-custom-10 border border-black p-3 rounded-lg' >OPEN MOVIE</button>
          </div>
    );
};




const BookCard = ({ title, author, publicationYear, coverUrl }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm bg-custom-50 p-2 rounded overflow-hidden shadow-lg">
            <img className="w-full" src={coverUrl} alt={`${title} Cover`} />
            <div className="px-6 py-4">
                <div className="font-bold text-custom-10 rounded-lg text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-custom-30 text-base">{`Author: ${author}`}</p>
                <p className="text-gray-700 text-custom-30 text-base">{`Year: ${publicationYear}`}</p>
            </div>
            <button onClick={() => navigate("/temp")} className='bg-custom-10 border border-black p-3 rounded-lg' >OPEN MOVIE</button>
        </div>
    );
};

export  {BookCard, MovieCard};
