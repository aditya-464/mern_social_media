import FriendsList from 'components/FriendsList'
import Navbar from 'components/Navbar'
import UserCard from 'components/UserCard'
import { VerticalNavIcons } from 'components/VerticalNavIcons'
import React from 'react'
import { useSelector } from 'react-redux'

export const PracticePage = () => {
  const user = useSelector((state)=>state.user);
  return (
    <>
    <Navbar></Navbar>
    <UserCard userId={user._id}></UserCard>
    <FriendsList></FriendsList>
    {/* <VerticalNavIcons></VerticalNavIcons> */}
    </>
    )
}
