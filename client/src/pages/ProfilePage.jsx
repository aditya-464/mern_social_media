import { Box, Flex } from '@chakra-ui/react'
import { AllPosts } from 'components/AllPosts'
import { FriendsList } from 'components/FriendsList';
import { UserCard } from 'components/UserCard'
import React from 'react'
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const { _id, picturePath } = user;
  const friends = useSelector((state) => state.user.friends);

  return (
    <>
      <Flex className='profile-page-container'
        width={"62.5vw"}
        height={"auto"}
        margin={"auto"}
        justify={"space-between"}
      >
        <Box className='left-side'
          marginTop={"2rem"}
        >
          <Box className='user-card-container'>
            <UserCard userId={_id} picturePath={picturePath}></UserCard>
          </Box>
          {<Box className='friends-list-container'
            marginTop={"2rem"}
          >
            <FriendsList ></FriendsList>
          </Box>}
        </Box>

        <Box className='all-posts-container'
          marginTop={"2rem"}
        >
          <AllPosts isProfile={true} userId={_id}></AllPosts>
        </Box>
      </Flex>
    </>
  )
}
