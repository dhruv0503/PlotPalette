// Carousel.js
import React, { useState, useEffect } from 'react';
 
function Carousel({ children: slides  ,autoplay=false ,autoslideinterval=3000 }) {
  const [curr, setcurr] = useState(0);
  const prev = () => setcurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () => setcurr((curr) => (curr === slides.length-1 ? 0: curr+1))
  useEffect(() => {
    if (!autoplay) return
    const slideinterval = setInterval(next, autoslideinterval)
     return ()=>clearInterval(slideinterval)
 },[])
  return (
    <div className=" overflow-hidden relative ">
      <div className="flex transition-transform ease-out duration-500 " style={{ transform: `translateX(-${curr * 100}%)` }} >{slides}</div>
      
      <div className='absolute inset-0 flex items-center justify-between p-4 mt-[-100px]'>
        
        <button onClick={prev} className='p-1 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white'>
          <svg className='size-14' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <button onClick={next} className='p-1 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white'>
          <svg className='size-14' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>

        <div className='absolute mt-[100px] right-0 left-0'>
          
          {/* <div className='flex items-center justify-center gap-2'>
            {slides.map((_,i) => (
              <div className={`
              transition-all w-3 h-3 bg-white rounded-full ${curr===i?"p-2":"bg-opacity-50"}`} />
            ))}
        </div> */}
    </div>

    </div>
    </div>
  )
}

export default Carousel
