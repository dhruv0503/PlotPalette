import React from 'react';
import * as Separator from '@radix-ui/react-separator';
import { GlobeIcon } from '@radix-ui/react-icons';

function NoPage() {
  return (
      <div className='bg-custom-30 h-screen justify-center flex items-center'>
          <div className="w-full max-w-[300px] mx-[15px]">
              <GlobeIcon className='text-white mb-3 ' height={64} width={64} />
              <div className="text-white text-[15px] leading-5 font-medium">Plot Palette</div>
              <div className="text-white text-[15px] leading-5">Sorry No Page Found.</div>
              <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
              <div className="flex h-5 items-center">
                  <div className="text-white text-[15px] leading-5">Home</div>
                  <Separator.Root
                      className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
                      decorative
                      orientation="vertical"
                  />
                  <div className="text-white text-[15px] leading-5">Movie</div>
                  <Separator.Root
                      className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
                      decorative
                      orientation="vertical"
                  />
                  <div className="text-white text-[15px] leading-5">Account</div>
              </div>
          </div>
    </div>
  )
}

export default NoPage
