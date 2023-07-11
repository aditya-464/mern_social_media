import { Flex } from '@chakra-ui/react';
import { AllPosts } from 'components/AllPosts';
import { CreatePost } from 'components/CreatePost';
import { Navbar } from 'components/Navbar'
import { UserCard } from 'components/UserCard'
import { ViewPosts } from 'components/ViewPosts';
import React from 'react'
import { useSelector } from 'react-redux';


export const HomePage = () => {
  const user = useSelector((state) => state.user);
  const { _id, picturePath } = user;
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Flex>
        {/* <UserCard userId={_id} picturePath={picturePath}></UserCard> */}
        <CreatePost></CreatePost>
        {/* <ViewPosts></ViewPosts> */}
        <AllPosts></AllPosts>
      </Flex>
    </>
  )
}
