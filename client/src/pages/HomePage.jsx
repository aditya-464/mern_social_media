import { Box, Flex } from '@chakra-ui/react';
import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import MemoizedNavbar from 'components/Navbar';
import MemoizedUserCard from 'components/UserCard'
import MemoizedAllPosts from 'components/AllPosts'
import MemoizedFriendsList from 'components/FriendsList'
import MemoizedCreatePost from "components/CreatePost"
import MemoizedAdvertisement from 'components/Advertisement';



const HomePage = () => {
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const { _id, picturePath } = user;
  return (
    <>
      <MemoizedNavbar></MemoizedNavbar>

      <Box className='home-page-outer-container'
        maxWidth={"100vw"}
        paddingX={{lg:"2vw" ,xl:"5vw"}}
        bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
      >
        <Flex className='home-page-inner-container'
          maxWidth={"100%"}
          justify={"space-between"}
          bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
          margin={"auto"}
        >
          <Box className='user-card-and-friends-list-component'>
            <Box className='user-card'
              marginTop={"2rem"}
            >
              <MemoizedUserCard userId={_id} picturePath={picturePath} home={true}></MemoizedUserCard>
            </Box>
            <Box className='friends-list'
              marginTop={"2rem"}
            >
              <MemoizedFriendsList self={true} homepage={true}></MemoizedFriendsList>
            </Box>
          </Box>
          <Box className='create-post-and-all-posts-component'>
            <Box className='create-post'
              marginTop={"2rem"}
            >
              <MemoizedCreatePost></MemoizedCreatePost>
            </Box>
            <Box className='all-posts'
              marginTop={"2rem"}
            >
              <MemoizedAllPosts userId={_id} isProfile={false} hideIcons={false} self={true} homepage={true}></MemoizedAllPosts>
            </Box>
          </Box>
          <Box className='advertisement-component'>
            <Box className='advertisements'
              marginTop={"2rem"}
            >
              <MemoizedAdvertisement></MemoizedAdvertisement>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default memo(HomePage);
