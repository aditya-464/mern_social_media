import { Box, Flex } from '@chakra-ui/react';
import { Advertisement } from 'components/Advertisement';
import { AllPosts } from 'components/AllPosts';
import { CreatePost } from 'components/CreatePost';
import { FriendsList } from 'components/FriendsList';
import { ImageSlider } from 'components/ImageSlider';
import { Navbar } from 'components/Navbar'
import { PostUserDetails } from 'components/PostUserDetails';
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

      {/* <Flex
        width={"90vw"}
        height={"auto"}
        justify={"space-between"}
        margin={"auto"}
      >
        <Box
          marginTop={"2rem"}
        >
          <UserCard userId={_id} picturePath={picturePath}></UserCard>
        </Box>
        <Flex
          flexDir={"column"}
          marginTop={"2rem"}
        >
          <CreatePost></CreatePost>
          <Box width={"100%"} height={"2rem"}></Box>
          <AllPosts></AllPosts>
        </Flex>
        <Box
          marginTop={"2rem"}
        >
          <UserCard userId={_id} picturePath={picturePath}></UserCard>
        </Box>
      </Flex>
     */}

      {/* <AllPosts></AllPosts> */}
      {/* <Advertisement></Advertisement> */}
      {/* <CreatePost></CreatePost> */}
      <FriendsList></FriendsList>
      <Flex>
        {/* <ImageSlider></ImageSlider> */}
      </Flex>
    </>
  )
}
