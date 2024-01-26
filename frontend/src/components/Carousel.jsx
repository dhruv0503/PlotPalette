import React, { useState } from 'react'

function Carousel() {
  const[currInd, setCurrInd] = useState(0);
  return (
    <div className='h-100% position-relative'>

      <div className= "w-100% h-100% rounded-[10px]  bg-`url(${movies[currInd].posterUrl})` ">
      </div>
    </div>
  )
}

export default Carousel

