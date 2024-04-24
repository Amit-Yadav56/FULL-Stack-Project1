import React from 'react'
import Header from './Header'

const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col justify-center items-center bg-primary'>
      <Header />
      <div className=' w-[60%] my-2 bg-blue-500 p-4 flex items-center justify-center'></div>
    </div>
  )
}

export default Dashboard