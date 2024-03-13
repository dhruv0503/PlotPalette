import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { FaInstagramSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
import { BiLogoGmail } from "react-icons/bi";
function Footer() {
  return (
    <div className=' bg-custom-50 p-10 '>

      <div className=' m-10  justify-between md:flex'>
        <div className=' hidden sm:block text-2xl text-custom-10 font-bold m-2' >CONNECT WITH US</div>
        <div className=' text-custom-10 gap-4 flex m-2'>
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <a
                className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
              >
                <img
                  className="block h-[45px] w-[45px] rounded-full"
                  src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                  alt="Radix UI"
                />
              </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                sideOffset={5}
              >
                <div className="flex flex-col gap-[7px]">

                  <div className="flex flex-col gap-[15px]">
                    <div>
                      <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">Bhavya Kashmira</div>
                      <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">bhavyakashmira@gmail.com</div>
                    </div>

                    <div className="flex gap-[15px]">
                      <a href='https://github.com/bhavyakashmira'><FaGithub size={32} /></a>
                      <a href='https://www.linkedin.com/in/bhavyakashmira/'><FaLinkedin size={32} /></a>
                      <a href='mailto:bhavyakashmira@gmail.com'> <BiLogoGmail size={32} /></a>
                    </div>
                  </div>
                </div>

                <HoverCard.Arrow className="fill-white" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <a
                className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
              >
                <img
                  className="block h-[45px] w-[45px] rounded-full"
                  src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                  alt="Radix UI"
                />
              </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                sideOffset={5}
              >
                <div className="flex flex-col gap-[7px]">
                  
                  <div className="flex flex-col gap-[15px]">
                    <div>
                      <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">Dhruv Agrawal</div>
                      <div className="text-mauve10 m-0 text-[15px] leading-[1.5]"> dhruv2505.dag@gmail.com </div>
                    </div>
                    
                  
                   
                    
                    <div className="flex gap-[15px]"> 
                      <div className="flex gap-[15px]">
                        <a href='https://github.com/dhruv0503'><FaGithub size={32} /></a>
                        <a href=' https://www.linkedin.com/in/dhruv-agrawal-724556228/'><FaLinkedin size={32} /></a>
                        <a href='mailto:dhruv2505.dag@gmail.com'> <BiLogoGmail size={32} /></a>
                      </div>
                    </div>
                  </div>
                </div>

                <HoverCard.Arrow className="fill-white" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
          
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <a
                className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
              >
                <img
                  className="block h-[45px] w-[45px] rounded-full"
                  src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                  alt="Radix UI"
                />
              </a>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                sideOffset={5}
              >
                <div className="flex flex-col gap-[7px]">

                  <div className="flex flex-col gap-[15px]">
                    <div>
                      <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">Ankit Singh Chauhan</div>
                      <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">asinghchauhan.25@gmail.com</div>
                    </div>

                    <div className="flex gap-[15px]">
                     
                      <a href='https://github.com/Catalystde'><FaGithub size={32} /></a>
                      <a href='https://www.linkedin.com/in/ankit-singh-chauhan-9106b6215/'><FaLinkedin size={32} /></a>
                      <a href='mailto:asinghchauhan.25@gmail.com'> <BiLogoGmail size={32} /></a>
                      
                    </div>
                  </div>
                </div>

                <HoverCard.Arrow className="fill-white" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
          
        </div>
      </div>
      <hr className='h-px my-8 border-0 dark:bg-custom-10 m-7 border-dashed ' />
      <div className='h-[35px] ml-20 mr-20 text-custom-10  text-center'>Copyright © 2024 <span className=' font-logo  ' >PLOT_PALETTE </span> </div>
    </div>
  )
}

export default Footer
