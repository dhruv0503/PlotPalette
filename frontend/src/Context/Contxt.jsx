import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const MyContext = createContext();

export function MyContextProvider({ children }) {

    const [islogin, setislogin] = useState();

  //my profile api
  useEffect(() => {
    const myProfile = async (e) => {
      // e.preventDefault();
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}api/users/myProfile`);
    
        setUserData(response.data)
      } catch (error) {
        console.error('Error in getting myProfile:', error.message);
      }
    };
    myProfile();
  },[islogin])

    // all users list
  
    const genres = [{ "id": 28, "name": "Action", "img": "https://static0.colliderimages.com/wordpress/wp-content/uploads/2023/12/the-10-best-action-movies-of-2023-ranked.jpg" }, { "id": 12, "name": "Adventure", "img": "https://images.alphacoders.com/239/239341.jpg" }, { "id": 16, "name": "Animation", "img": "https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-adventure-time-characters-stickers-vector-png-image_6829556.png" }, { "id": 35, "name": "Comedy", "img": "https://images.pond5.com/comedy-movie-neon-symbol-vector-illustration-108085428_iconl_nowm.jpeg" }, { "id": 80, "name": "Crime", "img": "https://img.freepik.com/free-photo/3d-render-crime-scene-tape-against-defocussed-background_1048-6111.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1709596800&semt=ais" }, { "id": 99, "name": "Documentary", "img": "https://s3images.zee5.com/wp-content/uploads/2024/01/desktop-wallpaper-no-copyright-copyright-videos-motion-graphics-movies-film-editing.jpg" }, { "id": 18, "name": "Drama", "img": "https://t3.ftcdn.net/jpg/05/91/97/50/360_F_591975082_aKvUZKKC60hOK2Lu163acMD5L034DxoZ.jpg" }, { "id": 10751, "name": "Family", "img": "https://img.freepik.com/free-photo/happy-family-traditional-portrait-old-fashioned_155003-13029.jpg" }, { "id": 14, "name": "Fantasy", "img": "https://wallpapers.com/images/hd/fantasy-book-vintage-ship-98fbbrejd8ahbdp0.jpg" }, { "id": 36, "name": "History", "img": "https://i.pinimg.com/736x/37/51/00/3751007307601c988e581d7d546d820b.jpg" }, { "id": 27, "name": "Horror", "img": "https://m.media-amazon.com/images/S/aplus-media-library-service-media/7e8e4b46-e38c-49bd-89db-f8e1080a215f._CR0,0,970,600_PT0_SX970_V1.jpg" }, { "id": 10402, "name": "Music", "img": "https://www.undergroundpress.co.za/images/content-4/music-film/music--film-editing-wallpaper.jpg" }, { "id": 9648, "name": "Mystery", "img": "https://wallpapercave.com/wp/wp7042382.jpg" }, { "id": 10749, "name": "Romance", "img": "https://plus.unsplash.com/premium_photo-1664529914557-ee01920185e2?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, { "id": 878, "name": "Science Fiction", "img": "https://png.pngtree.com/thumb_back/fh260/background/20230318/pngtree-science-fiction-planet-building-background-image_1950261.jpg" }, { "id": 10770, "name": "TV Movie", "img": "https://c4.wallpaperflare.com/wallpaper/420/925/158/sherlock-tv-series-dr-watson-sherlock-holmes-wallpaper-preview.jpg" }, { "id": 53, "name": "Thriller", "img": "https://c4.wallpaperflare.com/wallpaper/420/925/158/sherlock-tv-series-dr-watson-sherlock-holmes-wallpaper-preview.jpg" }, { "id": 10752, "name": "War", "img": "https://c4.wallpaperflare.com/wallpaper/312/285/296/the-last-rescue-2014-wallpaper-preview.jpg" }, { "id": 37, "name": "Western", "img": "https://media.istockphoto.com/id/810137688/photo/western-cowboy-native-american-on-horseback-at-monument-valley-tribal-park.jpg?s=612x612&w=0&k=20&c=ounvvyrvmmHGHOLnZLMcZyuV2IDdUa1FZbzprqmtqB0=" }];


  
  
    const [pagesToShow] = useState(5); // Number of pages to show in the pagination bar
    const [startPage, setStartPage] = useState(5);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [now_playing, setNowPlayingMovies] = useState([]);
    const [popular, setPopularMovies] = useState([]);
    const [top_rated, setTopRatedMovies] = useState([]);
    const [all_movie, setAll_movie] = useState(new Set());
    const [searchResults, setSearchResults] = useState([]);
    const [userUid, setUserUid] = useState();
  const [userDataId, setUserDataId] = useState();
  const [otheruserData, setotheruserData] = useState();
    
    const [userData, setUserData] = useState();
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch upcoming movies
               const upcomingResponse = await axios.get(`${process.env.BACKEND_URL}api/movies/type/upcoming`);
                setUpcomingMovies(upcomingResponse.data.movies.results);
                // Fetch now playing movies
                const nowPlayingResponse = await axios.get(`${process.env.BACKEND_URL}api/movies/type/now_playing`);
                setNowPlayingMovies(nowPlayingResponse.data.movies.results);
                // Fetch popular movies
                const popularResponse = await axios.get(`${process.env.BACKEND_URL}api/movies/type/popular`);
                setPopularMovies(popularResponse.data.movies.results);
                // Fetch top rated movies
                const topRatedResponse = await axios.get(`${process.env.BACKEND_URL}api/movies/type/top_rated`);
                setTopRatedMovies(topRatedResponse.data.movies.results);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };

        fetchMovies();
    }, []);



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
        <MyContext.Provider value={{upcomingMovies , startPage,setStartPage , now_playing, top_rated , popular ,all_movie ,searchResults ,setSearchResults ,genres , userUid , islogin,setislogin, setUserUid ,userData,userDataId,setUserDataId , otheruserData , setotheruserData}} >
            {children}
        </MyContext.Provider>
    )    
}

export function useApi() {
    return useContext(MyContext);
}