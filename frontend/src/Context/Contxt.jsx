import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const MyContext = createContext();

// my profile api
const myProfile = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/users/myProfile');
      console.log(response.data);
    } catch (error) {
      console.error('Error in getting myProfile:', error.message);
      alert(error.message);
    }
  };
  myProfile();

// all users list
  const allUsers = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/users/all');
      console.log(response.data);
    } catch (error) {
      console.error('Error in getting all users:', error.message);
      alert(error.message);
    }
  };
  allUsers();

//now_playing
//popular
//top_rated
//upcoming

export function MyContextProvider({ children }) {
    const genres = [
        { "id": 28, "name": "Action" },
        { "id": 12, "name": "Adventure" },
        { "id": 16, "name": "Animation" },
        { "id": 35, "name": "Comedy" },
        { "id": 80, "name": "Crime" },
        { "id": 99, "name": "Documentary" },
        { "id": 18, "name": "Drama" },
        { "id": 10751, "name": "Family" },
        { "id": 14, "name": "Fantasy" },
        { "id": 36, "name": "History" },
        { "id": 27, "name": "Horror" },
        { "id": 10402, "name": "Music" },
        { "id": 9648, "name": "Mystery" },
        { "id": 10749, "name": "Romance" },
        { "id": 878, "name": "Science Fiction" },
        { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" },
        { "id": 10752, "name": "War" },
        { "id": 37, "name": "Western" }];
    const [pagesToShow] = useState(5); // Number of pages to show in the pagination bar
    const [startPage, setStartPage] = useState(5);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [now_playing, setNowPlayingMovies] = useState([]);
    const [popular, setPopularMovies] = useState([]);
    const [top_rated, setTopRatedMovies] = useState([]);
    const [all_movie, setAll_movie] = useState(new Set());
    const [searchResults, setSearchResults] = useState([]);
    const [userUid, setUserUid] = useState();
    const [islogin, setislogin] = useState();
    const [genre, setgenre] = useState();
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch upcoming movies
                const upcomingResponse = await axios.get('http://localhost:5000/api/movies/type/upcoming');
                setUpcomingMovies(upcomingResponse.data.movies.results);

                // Fetch now playing movies
                const nowPlayingResponse = await axios.get('http://localhost:5000/api/movies/type/now_playing');
                setNowPlayingMovies(nowPlayingResponse.data.movies.results);

                // Fetch popular movies
                const popularResponse = await axios.get('http://localhost:5000/api/movies/type/popular');
                setPopularMovies(popularResponse.data.movies.results);

                // Fetch top rated movies
                const topRatedResponse = await axios.get('http://localhost:5000/api/movies/type/top_rated');
                setTopRatedMovies(topRatedResponse.data.movies.results);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };

        fetchMovies();
    }, []);
     
    useEffect(() => {
        setislogin(userUid)
    },[userUid])


    useEffect(() => {
        const all_movie = [
            ...upcomingMovies,
            ...now_playing,
            ...popular,
            ...top_rated
        ];
        setAll_movie(all_movie);
    }, [upcomingMovies,now_playing, popular, top_rated]);
    
    return (
        <MyContext.Provider value={{upcomingMovies , startPage,setStartPage , now_playing, top_rated , popular ,all_movie ,searchResults ,setSearchResults ,genres , userUid , islogin, setUserUid}} >
            {children}
        </MyContext.Provider>
    )    
}

export function useApi() {
    return useContext(MyContext);
}