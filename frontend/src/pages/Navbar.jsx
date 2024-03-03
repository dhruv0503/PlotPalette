import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon, Cross2Icon, EnterIcon, HamburgerMenuIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link ,useNavigate } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import * as Avatar from '@radix-ui/react-avatar';
import axios from 'axios'
import { useApi } from '../Context/Contxt';



function Navbar() {
    const navigate = useNavigate();
    const { userUid ,islogin } = useApi();
    const handleLogout = async (e) => {
        e.preventDefault();
        navigate('/signin');
        try {
          const response = await axios.get('http://localhost:5000/api/signout');   
        localStorage.removeItem("uid");
         
        } catch (error) {
          console.error('Error signing out:', error.message);
        }
};
  

      
    console.log(localStorage.getItem("uid"))

 

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };
    
    return (

        <nav class=" text-custom-10 w-full flex relative justify-between items-center mx-auto px-8 h-20 z-10 ">
         
            <div class="inline-flex">
                <a class="_o6689fn" href="/"
                ><div class="hidden md:block" onClick={() => navigate('/')}>
                        PLOT_PALETTE
                    </div>
                    <div class="block md:hidden">
                        <svg width="30" height="32" fill="currentcolor" style={{ display: "block" }}>
                            <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z"></path>
                        </svg>
                    </div>
                </a>
            </div>
          
              
            
            <div class="hidden sm:block flex-shrink flex-grow-0 justify-start px-2  ">
                        <a class="inline-block py-2 px-3 hover:bg-gray-200 rounded-full" href="#">
                            <div class="flex items-center relative cursor-pointer whitespace-nowrap">Become a host</div>
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
                            <div type="button" class="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                                <button class="pl-1">
                                    <HomeIcon onClick={()=>navigate('/account')}  height={24} width={24} />
                                </button>
                                

                                <button onClick={handleLogout} class="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                                {localStorage.getItem("uid") ? <PersonIcon height={24} width={24} /> : <EnterIcon height={24} width={24} />}
                               
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





