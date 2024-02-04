import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import data from "../assets/Data"


function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='fixed top-0 z-10 w-screen '>
        <NavigationMenu.Root className=" flex bg-custom-50">
            <NavigationMenu.List className=" m-5 grid grid-cols-2 list-none items-center text-custom-10 p-1 ">
                <div className='flex '>
                    <NavigationMenu.Item >
                        <NavigationMenu.Trigger className="text-pink  group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]" >
                          LOGO{}
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
                            <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                                <ListItem title="MOVIES" href="/movies">
                                </ListItem>
                                <ListItem title="TOP MOVIES" href="/movies">
                                   
                                </ListItem>
                                <ListItem title="TOP MOVIES" href="/movies">
                                    
                                </ListItem>
                               
                              
                            </ul>
                        </NavigationMenu.Content>
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
                                <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                                    <ListItem title="MOVIES" href="/movies">

                                    </ListItem>
                                    <ListItem title="TOP MOVIES" href="/movies">

                                    </ListItem>
                                    <ListItem title="TOP MOVIES" href="/movies">

                                    </ListItem>


                                </ul>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                    
                </div>
                <div className=' flex items-center'>
                    <Searchbar  />
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger  onClick={() => navigate('/account')} className="  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[14px] px-5 py-2 text-[15px] font-medium leading-none border-white focus:shadow-[0_0_0_2px]">
                            Account{' '}
                        </NavigationMenu.Trigger>

                    </NavigationMenu.Item>
                </div>
                <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                </NavigationMenu.Indicator>
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
                    'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
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





