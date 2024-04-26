import React from 'react'
import { UseStateValue } from '../context/StateProvider'


const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = UseStateValue()
  return (

    <div className='w-full p-4 flex items-center justify-center flex-col'>
      {/* filters */}

      {/* tabular form data form */}
      <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3 '>
        {/* Total count of the users */}
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-semibold'>
            Count : <span className='text-sm font-bold text-textColor'>{allUsers?.length}</span>
          </p>

        </div>
        {/* table heading */}
        <div className='w-full min-w-[750px] flex items-center justify-between'>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>Image</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>Name</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>Email</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>Verified</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>Created</p>
          <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center '>Role</p>
        </div>

        {/* Table Body Content  */}
      </div>
    </div>
  )
}

export default DashboardUsers