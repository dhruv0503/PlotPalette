import React, { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { MovieCard, BookCard } from "../components/CustomCard.jsx"
import axios from 'axios'
import NoPage from '../pages/NoPage.jsx';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { BorderDottedIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useApi } from '../Context/Contxt.jsx';
import LoadingPage from './LoadingPage.jsx';
import Pagination from './Pagination.jsx';

export default React.memo(function Category() {
    const { genres , searchResults } = useApi();
    const [startPage, setStartPage] = useState(1);
    const [genre, setgenre] = useState("Action");
    const [Genres, setGenres] = useState([]);
    const handleSelectChange = (newValue) => {
        setgenre(newValue.name);
        setStartPage(1)
    };
    const nextPage = () => {
        setStartPage(startPage + 1);
    }
    const prevPage = () => {
        if (startPage > 2) {
            setStartPage(startPage - 1);
        }
    }
    
    const data = searchResults
        ? Genres.filter(article =>
            article.overview &&
            (article.overview.toLowerCase().includes(searchResults.toString().toLowerCase())) ||
            article.title.toLowerCase().includes(searchResults.toString().toLowerCase())
        )
        : Genres;
    
    console.log(Genres)

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const upcomingResponse = await axios.get(`http://localhost:5000/api/movies/genres/${genre}?pageNo=${startPage}`);
                setGenres(upcomingResponse.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        };
        fetchGenres();
    }, [genre, startPage]);

    return (
        <div className='bg-custom-30 h-full   '>
            <Navbar />
            <div className='mt-20 p-2 '>
                <div className='p-2'>
                    <Select.Root value={genre} onValueChange={handleSelectChange} >
                        <Select.Trigger
                            className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-custom-30 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-custom-30 outline-none"
                            aria-label="Food"
                        >
                            <Select.Value placeholder=" " />
                            <Select.Icon className="text-custom-50">
                                <ChevronDownIcon />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                    <ChevronUpIcon />
                                </Select.ScrollUpButton>
                                <Select.Viewport className="p-[5px]">
                                    <Select.Group >
                                        <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                                            Category
                                        </Select.Label>
                                        {
                                            genres.map((genre, index) => (
                                                <SelectItem key={index} value={genre}>
                                                    {genre.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </Select.Group>

                                    <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />

                                </Select.Viewport>
                                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                    <ChevronDownIcon />
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                    <div class="flex gap-3 justify-center items-center">
                        <DoubleArrowLeftIcon className='cursor-pointer' onClick={prevPage} height={32} width={32} />
                        <BorderDottedIcon height={32} width={32} />
                        <div className='bg-gray-400 border border-black p-2' >{startPage}</div>
                        <BorderDottedIcon height={32} width={32} />
                        <DoubleArrowRightIcon className='cursor-pointer' onClick={nextPage} height={32} width={32} />
                    </div>
                </div>
                <div className=" flex flex-col justify-center items-center  sm:grid sm:grid-cols-3 md:grid-cols-5 sm:justify-around ">
                     {data.length > 0 ?
                        (data.map((movie, index) => (
                    <MovieCard key={index} {...movie} />
                    ))) :
                        <NoPage/>
                    }
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