// MovieCard.js
import React from 'react';
import { useNavigate, Link} from 'react-router-dom';

const MovieCard = ({
    title, genre_ids
    , release_date,
    id,
    backdrop_path,
    poster_path
    , imdbRating }) => {
    return (

        <div className="max-w-md min-h-sm p-4 overflow-hidden rounded-lg shadow-s m-2 relative">
            <div className="relative overflow-hidden w-sm h-sm">

                <img className="p-1 w-full h-full object-cover rounded-t-lg border-2 transition duration-300 transform hover:scale-125 " src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`${title} backdrop_path`} />
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-95 m-5 lg:m-20 transition duration-300">

                    <div className="font-bold text-grey-200 text-xl mb-2 bg-white rounded-lg p-5 m-2">{title}</div>

                    <div className='mt-4 '>

                        <Link to={`/movies/${id}`} className='block bg-custom-50 border border-black p-2 rounded-b-lg text-center text-white hover:bg-custom-30 transition duration-300'>
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};



const BookCard = ({
    original_title, author, publicationrelease_date
    , coverUrl }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm bg-custom-50 p-2 rounded overflow-hidden shadow-lg">
            <img className="w-full" src={coverUrl} alt={`${original_title} Cover`} />
            <div className="px-6 py-4">
                <div className="font-bold text-custom-10 rounded-lg text-xl mb-2">{
                    original_title}</div>
                <p className="text-gray-700 text-custom-30 text-base">{`Author: ${author}`}</p>
                <p className="text-gray-700 text-custom-30 text-base">{`release_date
: ${publicationrelease_date
                    }`}</p>
            </div>
            <button onClick={() => navigate("/temp")} className='bg-custom-10 border border-black p-3 rounded-lg' >OPEN MOVIE</button>
        </div>
    );
};

export { BookCard, MovieCard };
