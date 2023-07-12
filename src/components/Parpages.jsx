import React, { useContext, useRef } from 'react'
import { CryptoContext } from '../context/CryptoContext'

const Parpages = () => {

  const {setParpages} = useContext(CryptoContext)
  const currecntRuf = useRef()
  const submitfunc = (e)=>{
    e.preventDefault()
    const val =currecntRuf.current.value;
    setParpages(val)
  }

  return (
    <div>
        <form onSubmit={submitfunc}className='flex items-center justify-center mr-2 gap-3'> 
        <p>par page</p>
        <input type="number" min={1} max={250} ref={currecntRuf}  placeholder='10' 
          className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4 "
        />
        </form>
    </div>
  )
}

export default Parpages