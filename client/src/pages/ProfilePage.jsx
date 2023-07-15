import { Box, Flex } from '@chakra-ui/react'
import MemoizedAllPosts from 'components/AllPosts'
import MemoizedFriendsList from 'components/FriendsList';
import MemoizedNavbar from "components/Navbar"
import MemoizedUserCard from 'components/UserCard'
import React, { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const [viewData, setViewData] = useState({
    id: "", picturePath: "",
  });
  const [self, setSelf] = useState(null);
  const user = useSelector((state) => state.user);
  const { _id } = user;
  const token = useSelector((state) => state.token);
  const getUserDetails = async () => {
    const response = await fetch(`http://127.0.0.1:3300/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setViewData({
      id: data._id, picturePath: data.picturePath
    });


    if (viewData) {
      if (data._id === _id) {
        setSelf(true);
      }
      else {
        setSelf(false);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [id])


  return (
    <>
      <MemoizedNavbar></MemoizedNavbar>

      {viewData.id !== "" &&
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
                <MemoizedUserCard userId={viewData.id} picturePath={viewData.picturePath} home={false}></MemoizedUserCard>
              </Box>

              <Box className='friends-list-container'
                marginTop={"2rem"}
              >
                <MemoizedFriendsList self={self}></MemoizedFriendsList>
              </Box>
            </Box>

            <Box className='all-posts-container'
              marginTop={"2rem"}
            >
              <MemoizedAllPosts isProfile={true} userId={viewData.id} hideIcons={true}></MemoizedAllPosts>
            </Box>
          </Flex>
        </Box>}
    </>
  )
}

export default memo(ProfilePage);
