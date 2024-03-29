import { Box, Flex } from '@chakra-ui/react'
import React, { memo, useState, useEffect, Suspense } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoaderPage from './LoaderPage';
import MemoizedFriendsList from 'components/FriendsList';
import MemoizedNavbar from "components/Navbar"
import MemoizedUserCard from 'components/UserCard'

const MemoizedAllPosts = React.lazy(() => import("components/AllPosts"));

const ProfilePage = () => {
  const { id } = useParams();
  const [viewData, setViewData] = useState({
    id: "", picturePath: "",
  });
  const [showLoader, setShowLoader] = useState(true);
  const [self, setSelf] = useState(null);
  const user = useSelector((state) => state.user);
  const { _id } = user;
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  const navbarSize = useSelector((state) => state.navbarSize);
  const loaderPage = useSelector((state) => state.loaderPage);

  const getUserDetails = async () => {
    const response = await fetch(`https://vakya-app.onrender.com/users/${id}`, {
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
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, [id])

  return (
    <>

      {(loaderPage && showLoader) && <LoaderPage></LoaderPage>}

      <Box className='navbar'
        width={"100vw"}
        position={"fixed"}
        top={0}
        zIndex={100}
      >
        <Suspense>
          <MemoizedNavbar></MemoizedNavbar>
        </Suspense>
      </Box>

      {viewData.id !== "" &&
        <Box className='profile-page-outer-container'
          maxWidth={"100vw"}
          bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
          marginTop={{ base: `${(navbarSize.height + 20) / 10}` + "rem" }}
        >
          <Flex className='profile-page-inner-container'
            width={{ base: "100vw", lg: "70vw", xl: "62.5vw", "3xl": "55vw" }}
            height={"auto"}
            margin={"auto"}
            justify={"space-between"}
            flexDir={{ base: 'column', lg: 'row' }}
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
                <MemoizedFriendsList self={self} homepage={false}></MemoizedFriendsList>
              </Box>
            </Box>

            <Box className='all-posts-container'
              marginTop={"2rem"}
            >
              <Suspense>
                <MemoizedAllPosts isProfile={true} userId={viewData.id} hideIcons={true} self={self} homepage={false}></MemoizedAllPosts>
              </Suspense>
            </Box>

          </Flex>
        </Box>}
    </>
  )
}

export default memo(ProfilePage);
