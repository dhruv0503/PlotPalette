import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MyContext = createContext();

export function MyContextProvider({ children }) {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movies/type/upcoming');
                // console.log(response.data);
                setUpcomingMovies(response.data.movies);
            } catch (error) {
                console.error('Error fetching upcoming movies:', error.message);
            }
        };
        fetchUpcomingMovies();
    }, []);

    
    return (
        <MyContext.Provider value={{upcomingMovies}} >
            {children}
        </MyContext.Provider>
    )
    
}


export function useApi() {
    return useContext(MyContext);
}