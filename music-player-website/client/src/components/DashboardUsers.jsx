import React from 'react'
import { UseStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion'
export const DashboardUserCard = ({ data }, { index }) => {
  console.log(data)
  return (
    <motion.div
      className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'
    >
      {/* User Image */}
      <div className='w-275 min-w-[160px] flex justify-center items-center'>
        <img src={data.imageUrl} referrerPolicy='no-referrer' alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md' />
      </div>


      {/* User Name */}
      <div className='w-275 min-w-[160px] flex justify-center items-center'>
        <p>{data.name}</p>
      </div>

      {/* User Email */}
      <div className='w-275 min-w-[160px] flex justify-center items-center'>
        <p>{data.email}</p>
      </div>


      {/* User verified */}
      <div className='w-275 min-w-[160px] flex justify-center items-center'>
        <p>{data.email_verified ? "True" : "False"}</p>
      </div>

      {/* User Created */}
      <div className='w-275 min-w-[160px] flex justify-center items-center'>
        <p>{data.createdAt}</p>
      </div>

      {/* User Role */}
      <div className='w-275 min-w-[160px] flex justify-center items-center'>
        <p>{data.role}</p>
      </div>


    </motion.div>
  )
}



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
        {
          allUsers && (
            // we are not using a function but rendering a component so we use () breacket instead of {}
            allUsers?.map((data, i) => (
              <DashboardUserCard data={data} index={i} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default DashboardUsers