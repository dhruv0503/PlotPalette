// MovieCard.js
import React from 'react';
import { useNavigate ,Link ,useParams } from 'react-router-dom';

const MovieCard = ({ Title, Genre, Year, Poster ,imdbRating,Images } ) => {
    const navigate = useNavigate();
    return (
     

        
       
        // <div className="max-w-sm bg-custom-50 p-6 rounded-t-lg overflow-hidden shadow-lg">

        //     <img className="w-full h-48 object-cover object-center rounded-t-lg border-2 border-custom-20" src={Images[1]} alt={`${Title} Poster`} />

        //     <div className="mt-6">
        //         <div className="font-bold text-white text-xl mb-2">{Title}</div>
        //         <p className="text-gray-200 text-sm mb-2">{Genre}</p>
        //         <p className="text-gray-200 text-sm mb-2">{`Year: ${Year}`}</p>
        //     </div>

        //     <div className='mt-4'>
        //         <Link to={`/movies/${Title}`} className='block bg-custom-10 border border-black p-2 rounded-b-lg text-center text-custom-50 hover:bg-custom-30 hover:text-white transition duration-300'>
        //             View Details
        //         </Link>
        //     </div>

        // </div>
        <div className="max-w-sm bg-custom-50 p-6 overflow-hidden shadow-lg">

            <div className="relative">
                <div className="bg-white w-6 h-6 absolute top-0 left-0 transform -skew-x-45"></div>

                <img className="w-full h-48 object-cover object-center rounded-t-lg border-2 border-custom-20" src={Images[1]} alt={`${Title} Poster`} />

                <div className="mt-6">
                    <div className="font-bold text-white text-xl mb-2">{Title}</div>
                    <p className="text-gray-200 text-sm mb-2">{Genre}</p>
                    <p className="text-gray-200 text-sm mb-2">{`Year: ${Year}`}</p>
                </div>

                <div className='mt-4'>
                    <Link to={`/movies/${Title}`} className='block bg-custom-10 border border-black p-2 rounded-b-lg text-center text-custom-50 hover:bg-custom-30 hover:text-white transition duration-300'>
                        View Details
                    </Link>
                </div>
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
