import { Box, Flex } from '@chakra-ui/react'
import MemoizedAllPosts from 'components/AllPosts'
import MemoizedFriendsList from 'components/FriendsList';
import MemoizedNavbar from "components/Navbar"
import { UserCard } from 'components/UserCard'
import React, {memo} from 'react'
import { useSelector } from 'react-redux';

 const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const { _id, picturePath } = user;
  const friends = useSelector((state) => state.user.friends);

  return (
    <>
    <MemoizedNavbar></MemoizedNavbar>
      <Box className='profile-page-outer-container'
      maxWidth={"100vw"}
      bgColor={"primaryLight"}
      >
        <Flex className='profile-page-inner-container'
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
              <MemoizedFriendsList ></MemoizedFriendsList>
            </Box>}
          </Box>

          <Box className='all-posts-container'
            marginTop={"2rem"}
          >
            <MemoizedAllPosts isProfile={true} userId={_id}></MemoizedAllPosts>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default memo(ProfilePage);
