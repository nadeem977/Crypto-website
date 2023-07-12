import React from 'react'
import Table from '../components/Table'
import Filter from '../components/Filter'
const Homoe = () => {
  return (
 <>
    <section
    className='home w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <Filter/>
      <Table/>
      </section>
 </>
  )
}

export default Homoe  