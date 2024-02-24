import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Link ,useNavigate } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import data from "../assets/Data"
import * as Avatar from '@radix-ui/react-avatar';
import axios from 'axios'
// import {getAuth,signInW


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.get('http://localhost:5000/api/signout');
          console.log("Logged out");
          navigate('/signin');
        } catch (error) {
          console.error('Error signing out:', error.message);
          alert(error.message);
        }
      };
    


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    
    return (
        <div className='fixed top-0 z-20 w-screen '>
        <NavigationMenu.Root className=" flex  justify-between bg-custom-50">
                <NavigationMenu.List className=" flex m-5  list-none items-center text-custom-10 p-1 ">
                    <NavigationMenu.Item >
                        <NavigationMenu.Trigger className="text-pink  group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]" >
                          PLOTPALETTE{}
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            MOVIES{' '}
                            <CaretDownIcon
                                className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                                aria-hidden
                                />      
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
                            <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-2">
                                <ListItem title="Top Rated" href="/movies/toprated" />
                                <ListItem title="Upcoming Movies" href="/movies/upcoming" />
                                <ListItem title="Popular" href="/movies/popular" />
                                <ListItem title="Now playing" href="/movies/nowplaying"/>
                               
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                      
                    </NavigationMenu.List>
                <NavigationMenu.List className={`sm:flex  sm:hidden ${isDropdownOpen ? 'block' : 'hidden'}  flex gap-6 flex-col bg-custom-50 justify-between items-center m-5  list-none  text-custom-10 p-1 `}
                onClick={closeDropdown} >
                    <NavigationMenu.Item className='sm:ml-4 mt-3 sm:mt-0'>
                        <button>CLOSE</button>
                        <Searchbar/>
                         </NavigationMenu.Item>
                        
                    <NavigationMenu.Item className='sm:ml-4 mt-3 sm:mt-0'>
                                <NavigationMenu.Trigger onClick={() => navigate('/account')} className="  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[14px] px-5 py-2 text-[15px] font-medium leading-none border-white focus:shadow-[0_0_0_2px]">
                                    Account{' '}
                                </NavigationMenu.Trigger>
                            </NavigationMenu.Item >

                    <div className="flex gap-5 sm:ml-4 mt-3 sm:mt-0">
                                <button>
                                    <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                        <Avatar.Image
                                            className="h-full w-full rounded-[inherit] object-cover"
                                            src=""
                                            alt="Colm Tuite"
                                        />
                                        <Avatar.Fallback
                                            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                            delayMs={600}
                                        >
                                            CT
                                        </Avatar.Fallback>
                                    </Avatar.Root>
                                </button>
                            </div>           
                </NavigationMenu.List>
                
                <NavigationMenu.List className=" hidden sm:block flex  gap-6  bg-custom-50 justify-between items-center m-5  list-none  text-custom-10 p-1 " >
                    <NavigationMenu.Item className='flex'>
                      
                        <Searchbar />
                    </NavigationMenu.Item>
                    </NavigationMenu.List>

                    <NavigationMenu.List className=" hidden sm:block flex  gap-6  bg-custom-50 justify-between items-center m-5  list-none  text-custom-10 p-1 " >
                    <NavigationMenu.Item className=''>
                        <NavigationMenu.Trigger onClick={() => navigate('/account')} className="  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[14px] px-5 py-2 text-[15px] font-medium leading-none border-white focus:shadow-[0_0_0_2px]">
                            Account{' '}
                        </NavigationMenu.Trigger>
                    </NavigationMenu.Item >
                    </NavigationMenu.List>
                <NavigationMenu.List className=" hidden sm:block flex  gap-6  bg-custom-50 justify-between items-center m-5  list-none  text-custom-10 p-1 " >
                    <div className="flex gap-5 ">
                        <button onClick={handleLogout}>
                            <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                <Avatar.Image
                                    className="h-full w-full rounded-[inherit] object-cover"
                                    src=""
                                    alt="Colm Tuite"
                                />
                                <Avatar.Fallback
                                    className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                                    delayMs={600}
                                >
                                    CT
                                </Avatar.Fallback>
                            </Avatar.Root>
                        </button>
                    </div>
                </NavigationMenu.List>
                

                <NavigationMenu.List className=" sm:hidden flex justify-between items-center m-5  list-none  text-custom-10 p-1 ">
               
                        <button onClick={toggleDropdown} className="focus:outline-none">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isDropdownOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}

                            </svg>
                        </button>
            
                </NavigationMenu.List>

            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
            </NavigationMenu.Root>
        </div>

        );
};

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
            <a
                className={classNames(
                    'focus:shadow-[0_0_0_2px] focus:shadow-custom-40 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <div className="text-pink mb-[5px] font-medium leading-[1.2]">{title}</div>
                <p className="text-red leading-[1.4]">{children}</p>
            </a>
        </NavigationMenu.Link>
    </li>
));




export default Navbar





