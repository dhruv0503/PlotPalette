// MovieCard.js
import React from 'react';
import { useNavigate ,Link ,useParams } from 'react-router-dom';

const MovieCard = ({ Title, Genre, Year, Poster ,imdbRating,Images } ) => {
    const navigate = useNavigate();
    return (
     
        <div className="max-w-sm bg-custom-50 p-4 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-48 object-cover object-center rounded-md" src={Images[1]} alt={`${Title} Poster`} />
            <div className="mt-4">
                <div className="font-bold text-custom-10 text-xl mb-2">{Title}</div>
                <p className="text-gray-700 text-custom-30 text-sm mb-2">{Genre}</p>
                <p className="text-gray-700 text-custom-30 text-sm mb-2">{`Year: ${Year}`}</p>
            </div>
            <div className='mt-2'>
                <Link to={`/movies/${Title}`} className='block bg-custom-10 border border-black p-3 rounded-lg text-center text-custom-50 hover:bg-custom-30 hover:text-white transition duration-300'>
                    View Details
                </Link>
            </div>
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
