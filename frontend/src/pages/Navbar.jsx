import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import {EnterIcon, PersonIcon } from '@radix-ui/react-icons';
import {useNavigate } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import axios from 'axios'
import im from "../assets/plot_palette.png"
import { AiOutlineLogout } from "react-icons/ai";
import { Text } from '@radix-ui/themes';



function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        if (!localStorage.getItem("uid")) {
            navigate('/signin');
            return; 
        }
        try {
        localStorage.removeItem("uid");
            await axios.get(`${process.env.BACKEND_URL}.app/api/signout`);  
            navigate('/signin');  
        
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
};
  

    return (

        <nav class=" text-custom-10 w-full flex relative justify-between  items-center mx-auto px-8 h-20 z-10 ">    
            <div className='flex' >
                <div className='flex  justify-start text-white' onClick={() => navigate('/')} >
                    <img src={im} className=' h-[132px] w-[132px] ' alt="Logo" />

                </div>
                <Text onClick={() => navigate('/')}  size={"7"} className='font-logo mt-11 cursor-pointer'>PLOT PALETTE</Text>
            </div>  

            <div class="hidden sm:block flex-shrink flex-grow-0 justify-start px-2  ">
                       
                        
                    </div>
            <div class="flex-initial">
                <div class="flex justify-end items-center relative">

                  
                    <div class=" flex-shrink flex-grow-0 justify-start px-2">
                        <div class="inline-block">

                            <div class="inline-flex items-center ">
                                <Searchbar />
                               
                            </div>
                        </div>
                    </div>

                    <div class="block">
                        
                        <div class="inline relative">
                            <div type="button" class="inline-flex items-center   ">
                                <button class="p-2 border rounded-full ">
                                    <PersonIcon onClick={()=>navigate('/account')}  height={24} width={24} />
                                </button>

                                <button onClick={handleLogout} class="p-2 border rounded-full block m-2 ">
                                    {localStorage.getItem("uid") ? <AiOutlineLogout size={22} /> : <EnterIcon height={24} width={24} />}
                               
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
       
        </nav>
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





