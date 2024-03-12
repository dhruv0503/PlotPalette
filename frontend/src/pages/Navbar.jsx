import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon, Cross2Icon, EnterIcon, HamburgerMenuIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link ,useNavigate } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import * as Avatar from '@radix-ui/react-avatar';
import axios from 'axios'
import { useApi } from '../Context/Contxt';
import im from "../assets/plot_palette.png"
import { AiOutlineLogout } from "react-icons/ai";
import { Text } from '@radix-ui/themes';



function Navbar() {
    const navigate = useNavigate();
    const { userUid ,islogin } = useApi();
    const handleLogout = async (e) => {
        e.preventDefault();
        if (!localStorage.getItem("uid")) {
            navigate('/signin');
            return; 
        }
        try {
        localStorage.removeItem("uid");
            const response = await axios.get('http://localhost:5000/api/signout');  
            navigate('/signin');  
        
        } catch (error) {
          console.error('Error signing out:', error.message);
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

        <nav class=" text-custom-10 w-full flex relative justify-between  items-center mx-auto px-8 h-20 z-10 ">
         
             
            <div className='flex' >
                <div className='flex  justify-start text-white' onClick={() => navigate('/')} >
                    <img src={im} className=' h-[132px] w-[132px] ' alt="Logo" />

                </div>
                <Text  size={"7"} className='font-logo mt-11'>PLOT PALETTE</Text>
            </div>  
            
         
            
        
          
              
            
            <div class="hidden sm:block flex-shrink flex-grow-0 justify-start px-2  ">
                        <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="#">
                            {/* <div class="flex items-center relative cursor-pointer whitespace-nowrap">Become a host</div> */}
                        </a>
                        
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

        // <div className='  z-20 '>
        // <NavigationMenu.Root className=" flex justify-between ">
        //         <NavigationMenu.List className=" flex m-5  list-none items-center text-custom-10 p-1 ">
        //             <NavigationMenu.Item >
        //                 <NavigationMenu.Trigger onClick={() => navigate('/')}  className="text-pink  group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]" >
        //                  PLOT_PALETTE  {}
        //                 </NavigationMenu.Trigger>
        //             </NavigationMenu.Item>
        //             <NavigationMenu.Item>
        //                 <NavigationMenu.Trigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
        //                     MOVIES {' '}
        //                     <CaretDownIcon
        //                         className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
        //                         aria-hidden
        //                         />      
        //                 </NavigationMenu.Trigger>
        //                 <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
        //                     <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-2">
        //                         <ListItem title="Top Rated" href="/movies/toprated" />
        //                         <ListItem title="Upcoming Movies" href="/movies/upcoming" />
        //                         <ListItem title="Popular" href="/movies/popular" />
        //                         <ListItem title="Now playing" href="/movies/nowplaying"/>
        //                     </ul>
        //                 </NavigationMenu.Content>
        //             </NavigationMenu.Item>
                      
        //             </NavigationMenu.List>
               
                
        //         <NavigationMenu.List className="flex flex-row m-5 text-custom-10" style={{ minWidth: '600px' }}> 
        //             <NavigationMenu.Item > 
        //                 <Searchbar />
        //             </NavigationMenu.Item>
                    
        //             <NavigationMenu.Item >
        //                 <NavigationMenu.Trigger onClick={() => navigate('/account')} className="  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[14px] px-5 py-2 text-[15px] font-medium leading-none border-white focus:shadow-[0_0_0_2px]">
        //                     Account{' '}
        //                 </NavigationMenu.Trigger>
        //             </NavigationMenu.Item >
                
        //             <div className="flex gap-5 " >
        //                 <button onClick={handleLogout}>
        //                     <Avatar.Root className="bg-blackA1 inline-flex h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-full align-middle">    
        //                         <Avatar.Fallback
        //                             className="text-custom-30 leading-1 flex h-full w-full items-center justify-center  bg-white text-[15px] font-bold"   
        //                         >
        //                             {localStorage.getItem("uid") ? <PersonIcon height={24} width={24} />: <EnterIcon height={24} width={24} />}
        //                         </Avatar.Fallback>
        //                     </Avatar.Root>
        //                 </button>
        //             </div>
        //         </NavigationMenu.List>
                
 
        //         <NavigationMenu.List className=" sm:hidden flex justify-between items-center m-5  list-none  text-custom-10 p-1 ">
               
        //                 <button onClick={toggleDropdown} className="focus:outline-none">
        //                     <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                         {isDropdownOpen ? (
        //                             <path
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         ) : (
        //                             <path
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                         )}

        //                     </svg>
        //                 </button>
            
        //         </NavigationMenu.List>

        //         {/* <NavigationMenu.List className={`sm:flex justify-center  sm:hidden ${isDropdownOpen ? 'block' : 'hidden'}  flex gap-6 flex-col bg-custom-50 items-center   list-none  text-custom-10 p-1 `}
        //         >
        //             <NavigationMenu.Item className='sm:ml-4 mt-3 sm:mt-0'>
        //                 <div className=' flex flex-row items-center justify-center m-2 ' ><Cross2Icon className='m-1' height={24} width={24} onClick={closeDropdown} />
        //                     CLOSE NAV
        //                 </div>
        //                 <Searchbar />
        //             </NavigationMenu.Item>

        //             <NavigationMenu.Item className='sm:ml-4 mt-3 sm:mt-0'>
        //                 <NavigationMenu.Trigger onClick={() => navigate('/account')} className="  focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[14px] px-5 py-2 text-[15px] font-medium leading-none border-white focus:shadow-[0_0_0_2px]">
        //                     Account{' '}
        //                 </NavigationMenu.Trigger>
        //             </NavigationMenu.Item >

        //             <div className="flex gap-5 sm:ml-4 mt-3 sm:mt-0">

        //                 <button>
        //                     <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        //                         <Avatar.Image
        //                             className="h-full w-full rounded-[inherit] object-cover"
        //                             src=""
        //                             alt="Bhavya"
        //                         />
        //                         <Avatar.Fallback
        //                             className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        //                             delayMs={600}
        //                         >
        //                             {userUid ? <PersonIcon /> : 'LOGIN'}
        //                         </Avatar.Fallback>
        //                     </Avatar.Root>
        //                 </button>
        //             </div>
        //         </NavigationMenu.List> */}

        //     <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        //         <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        //     </div>
        //     </NavigationMenu.Root>
        // </div>

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





