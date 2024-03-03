import React, { useEffect, useState } from 'react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import CommentSection from './CommentSection'
import { useParams } from 'react-router-dom'
import { Tabs, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useApi } from '../Context/Contxt.jsx';
import AvatarSlider from './AvatarSlider.jsx'

export default React.memo(function Booktemplate() {

    const { all_movie } = useApi();
    const [moviedata, setmoviedata] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
            const MovieDetails = async () => {
                try {
                    const MovDetails = await axios.get(`http://localhost:5000/api/movies/${movieId}`);
                    setmoviedata(MovDetails.data);
                } catch (error) {
                    console.error('Error fetching movi:', error.message);
                }
            };
            MovieDetails();
         
    }, [])

    // console.log(moviedata)

    return (
       
        <div className='relative '>
            <div  className='bg-cover bg-custom-30 bg-center  p-10  gap-3 md:grid sm:grid-cols-3 '>
                <div className='mt-20 z-10 bg-custom-50 '>
                    <div className='shadow-md  rounded-lg overflow-hidden'>

                        <div className='relative'>
                           
                            <img
                                src={`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`}
                                alt="Bold typography"
                                className='p-2 h-[400px] w-[300px] w-full rounded-md object-cover hover:opacity-90 transition duration-300'
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}
                            />

                            <div className='flex gap-3 p-5'>
                                <h1 className='text-white font-mono font-bold '>Give your responses :</h1>
                                <svg className='text-white' width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                                <svg className='text-white' width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
                
 
     <div className='z-10 mt-20 col-span-2 p-5 rounded-lg px-10 text-custom-10  font-bold '>
                    <Tabs.Root
                        className="flex flex-col shadow-[0_2px_10px] shadow-blackA2"
                        defaultValue="tab1"
                    >
                        <Tabs.List className="shrink-0 flex border-b border-mauve6"  >
                            <Tabs.Trigger
                                className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black select-none first:rounded-tl-md last:rounded-tr-md hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                                value="tab1"
                            >
                                Movie
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className="px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black select-none first:rounded-tl-md last:rounded-tr-md hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                                value="tab2"
                            >
                                Where to Watch
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black select-none first:rounded-tl-md last:rounded-tr-md hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                                value="tab3"
                            >
                                More
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black select-none first:rounded-tl-md last:rounded-tr-md hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                                value="tab4"
                            >
                                Account
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content
                            className="grow p-5 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black m-2"
                            value="tab1"
                        >
                            <div className=' p-4 flex flex-col border border-gray-800 '>
                                <h2 className='text-black text-lg font-bold mb-2'>{moviedata.title} ({moviedata.release_date})
                                </h2>
                                <p className='text-gray-900 mb-2'>RELEASED ON: {moviedata.release_date}</p>
                                <p className='text-gray-900 mb-2'> Runtime :{moviedata.runTime} minutes</p>
                                <p className='text-gray-900'>GENRE: </p>
                            </div>

                            <div>
                           
                                <div className='bg-custom-40 p-3'>
                                    <p className='text-custom-50 font-mono text-lg mb-2'>MOVIE PLOT</p>
                                    <Text as="p" size="3" className='text-white'>
                                        {moviedata.overview}
                                    </Text>
                                    <div className='p-10'>
                                        <p>Production Companies</p>
                                        <ul className='flex flex-row-3 gap-3 p-4'>
                                            {moviedata.production_companies?.slice(0, 3).map(company => (
                                                <li key={company.id}>
                                                    <div>
                                                        <h3>{company.name}</h3>
                                                        <p>Origin Country: {company.origin_country}</p>
                                                        
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div className=' flex gap-2 m-2 text-custom-50'>
                                <div className='flex items-center'>
                                    <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path></svg><h1 className='text-xl'>{moviedata.imdbRating}</h1>
                                </div>
                                <div className='flex items-center'>
                                    <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg><h1 className='text-xl'>{moviedata.imdbVotes}</h1>
                                </div>
                            </div>
                        </Tabs.Content>
                  
                        <Tabs.Content
                            className="grow p-5  rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black m-3"
                            value="tab2"
                        >
                            <div className='grid grid-rows-3 p-10 ' >
                            <div className='flex gap-3' >
                                <h2>Buy:</h2>
                                <ul className='flex gap-3 m-3' >
                                    {moviedata.platforms?.buy.slice(0, 3).map(item => (
                                        <li key={item.provider_id}>
                                            <div>
                                                <h3>{item.provider_name}</h3>
                                                {item.logo_path && (
                                                    <img className='max-h-[50px]' src={`https://image.tmdb.org/t/p/w200${item.logo_path}`} alt={`${item.provider_name} Logo`} />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                                <div className='flex gap-3'>
                                <h2>Rent:</h2>
                                <ul className='flex gap-3 m-3'>
                                    {moviedata.platforms?.rent?.slice(0, 3).map(item => (
                                        <li key={item.provider_id}>
                                            <div>
                                                <h3>{item.provider_name}</h3>
                                                {item.logo_path && (
                                                    <img className='max-h-[50px]' src={`https://image.tmdb.org/t/p/w200${item.logo_path}`} alt={`${item.provider_name} Logo`} />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                                {/* <div className='flex gap-3' >
                                <h2>Flatrate:</h2>
                                <ul className='flex m-3 gap-3'>
                                    {moviedata.platforms?.flatrate?.slice(0, 3).map(item => (
                                        <li key={item.provider_id}>
                                            <div> 
                                                <h3>{item.provider_name}</h3>
                                                {item.logo_path && (
                                                    <img className='max-h-[50px]' src={`https://image.tmdb.org/t/p/w200${item.logo_path}`} alt={`${item.provider_name} Logo`} />
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                            </div>
                            
                        </Tabs.Content>
                        <Tabs.Content
                            className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                            value="tab2"
                        >
                        </Tabs.Content>
                    </Tabs.Root>
    </div> 
            </div> 
            <div className='p-5 bg-custom-30'>
                <AvatarSlider props={moviedata.cast} />
        </div>
             
            <div className='p-4 bg-custom-50 gap-3 items-center relative flex  shadow-lg'>
                <CommentSection props={movieId} />
            </div>

        </div>
    )
});


