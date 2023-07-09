import { Navbar } from 'components/Navbar'
import { UserCard } from 'components/UserCard'
import React from 'react'
import { useSelector } from 'react-redux';


export const HomePage = () => {
  const user = useSelector((state) => state.user);
  const { _id, picturePath } = user;

  return (
    <>
      {/* <Navbar></Navbar> */}
      <UserCard userId={_id} picturePath={picturePath}></UserCard>
    </>
  )
}
