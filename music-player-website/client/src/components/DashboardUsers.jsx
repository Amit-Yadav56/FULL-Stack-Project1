import React from 'react'
import { UseStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion'
//used to format createdAt time as in format of eg(created 12days ago) 
import moment from "moment";
import { useState } from 'react';
import { getAllUsers, changingUserRole, deleteUser } from '../api';
import { MdDelete } from "react-icons/md";
import { actionType } from "../context/reducer";

export const DashboardUserCard = ({ data, index }) => {
  const [{ user, allUsers }, dispatch] = UseStateValue()
  const createdTime = moment(new Date(data.createdAt)).format("MMMM Do YYYY")
  const [isUserRoleUpdated, setisUserRoleUpdated] = useState(false)

  const UpdateUserRole = (userId, role) => {
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });

      }
    });
  };
  const deleteUserData = (userId) => {
    deleteUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });

      }
    });
  };


  return (
    <motion.div
      key={index}
      className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'>


      {/* button to delete the user */}
      {
        data._id !== user?.user._id && (
          <motion.div whileTap={{ scale: 0.8 }} className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200" onClick={
            () => {
              deleteUserData(data._id)
            }}>
            <MdDelete className='text-xl text-red-400 hover:text-red-600' />

          </motion.div>

        )
      }
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
        <p>{createdTime}</p>
      </div>

      {/* User Role */}
      <div className='w-275 text-textColor min-w-[160px] text-center flex justify-center items-center gap-6 relative'>
        <p>{data.role}</p>
        {/* it is an if else statement */}
        {
          data._id !== user?.user?._id && (
            <motion.p onClick={() => setisUserRoleUpdated(true)} whileTap={{ scale: 0.8 }} className="text-[11px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md">
              {data.role === "admin" ? "Member" : "Admin"}
            </motion.p>
          )
        }

        {/* z-10 brings it to top of all things */}
        {/* used to change the role of the user */}
        {
          isUserRoleUpdated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl ">
              <p className='text-textColor text-sm font-semibold '>Are you sure,do you want to mark the uer as <span>{data.role === "admin" ? "Member" : "Admin"}</span></p>
              <div className="flex items-center gap-4 ">
                <motion.button whileTap={{ scale: 0.8 }} onClick={
                  () => {
                    UpdateUserRole(data._id, data.role === "admin" ? "member" : "admin")
                    setisUserRoleUpdated(false)
                  }
                } className='outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md'>
                  YES
                </motion.button>
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => { setisUserRoleUpdated(false) }} className='outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md'>
                  NO
                </motion.button>
              </div>
            </motion.div>
          )
        }

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