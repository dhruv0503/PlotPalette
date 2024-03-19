import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import { MovieCard } from "../components/CustomCard.jsx"
import axios from 'axios'
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { BorderDottedIcon, CheckIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useApi } from '../Context/Contxt.jsx';
import LoadingPage from './LoadingPage.jsx';

export default React.memo(function TopRated() {
    const [top_rated, setTopRatedMovies] = useState([]);
    const [startPage, setStartPage] = useState(1)
    const { searchResults } = useApi();


    const data = searchResults

        ? top_rated.filter(article =>
            article.overview &&
            (article.overview.toLowerCase().includes(searchResults.toString().toLowerCase())) ||
            article.title.toLowerCase().includes(searchResults.toString().toLowerCase())
        )
        : top_rated;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const topRatedResponse = await axios.get(`${process.env.BACKEND_URL}api/movies/type/top_rated?pageNo=${startPage}`);
                setTopRatedMovies(topRatedResponse.data.movies.results);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };
        fetchData();
    }, [startPage]);


    const nextPage = () => {

        setStartPage(startPage + 1);
    }
    const prevPage = () => {
        if (startPage > 2) {
            setStartPage(startPage - 1);
        }
    }

    return (
        <div className='bg-custom-30 h-full   '>

            <div className='bg-gray-900' ><Navbar/></div>
            <div className=' p-2 '>
                <div className=" flex flex-col justify-center items-center  sm:grid sm:grid-cols-3 md:grid-cols-5 sm:justify-around ">

                    {
                        data.length > 0 ?
                            (data.map((movie, index) => (
                                <MovieCard key={index} {...movie} />
                            ))) :
                            <LoadingPage />
                    }
                </div>
            </div>
            <div className='p-2'>
                <div class="flex gap-3 justify-center items-center">
                    <DoubleArrowLeftIcon className='cursor-pointer' onClick={prevPage} height={32} width={32} />
                    <BorderDottedIcon height={32} width={32} />
                    <div className='bg-gray-400 border border-black p-2' >{startPage}</div>
                    <BorderDottedIcon height={32} width={32} />
                    <DoubleArrowRightIcon className='cursor-pointer' onClick={nextPage} height={32} width={32} />
                </div>
            </div>
        </div>
    )
});

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item
            className={classnames(
                'text-[13px] leading-none text-custom-50 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-custom-50 data-[highlighted]:text-violet1',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
});









