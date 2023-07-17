import AllPosts from 'components/AllPosts'
import FriendsList from 'components/FriendsList'
import Navbar from 'components/Navbar'
import UserCard from 'components/UserCard'
import React from 'react'
import { useSelector } from 'react-redux'

export const PracticePage = () => {
  const user = useSelector((state)=>state.user);
  return (
    <>
    <Navbar></Navbar>
    <UserCard userId={user._id}></UserCard>
    <FriendsList></FriendsList>
    <AllPosts userId={user._id} isProfile={true} hideIcons={false} homepage={true}></AllPosts>
    {/* <VerticalNavIcons></VerticalNavIcons> */}
    </>
    )
}
