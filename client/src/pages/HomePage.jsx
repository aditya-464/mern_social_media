import { Box, Flex } from '@chakra-ui/react';
import React, { Suspense, memo, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
// import MemoizedNavbar from 'components/Navbar';
// import MemoizedUserCard from 'components/UserCard'
// import MemoizedAllPosts from 'components/AllPosts'
// import MemoizedFriendsList from 'components/FriendsList'
// import MemoizedCreatePost from "components/CreatePost"
import MemoizedAdvertisement from 'components/Advertisement';
import Advertisement from 'components/Advertisement';
import { Ad } from './Ad';
import ImageSlider from 'components/ImageSlider';

const MemoizedNavbar = React.lazy(() => import('components/Navbar'));
const MemoizedUserCard = React.lazy(() => import('components/UserCard'));
const MemoizedAllPosts = React.lazy(() => import('components/AllPosts'));
const MemoizedFriendsList = React.lazy(() => import('components/FriendsList'));
const MemoizedCreatePost = React.lazy(() => import('components/CreatePost'));
// const MemoizedAdvertisement = React.lazy(() => import('components/Advertisement'));





const HomePage = () => {
  const [height, setHeight] = useState(0);
  const [pageLoad, setPageLoad] = useState(false);
  const navRef = useRef(null);
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const viewportSize = useSelector((state) => state.viewportSize);
  const { _id, picturePath } = user;

  window.addEventListener("load", () => {
    setPageLoad(!pageLoad);
  })


  useLayoutEffect(() => {
    setHeight(navRef.current.offsetHeight);
  }, [pageLoad]);

  return (
    <>
      <Box className='navbar'
        width={"100vw"}
        position={"fixed"}
        top={0}
        ref={navRef}
        zIndex={100}
      >
        <Suspense>
          <MemoizedNavbar></MemoizedNavbar>
        </Suspense>
      </Box>

      <Box className='home-page-outer-container'
        maxWidth={"100vw"}
        paddingX={{ lg: "2vw", xl: "5vw", "3xl": "10vw" }}
        bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
        marginTop={{ base: `${(height + 20) / 10}` + "rem" }}
      >
        <Flex className='home-page-inner-container'
          maxWidth={"100%"}
          justify={"space-between"}
          bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
          margin={"auto"}
        >

          <Suspense>
            {viewportSize.width >= 992 && (<Box className='user-card-and-friends-list-component'>
              <Box className='user-card'
              >
                <MemoizedUserCard userId={_id} picturePath={picturePath} home={true}></MemoizedUserCard>
              </Box>
              <Box className='friends-list'
                marginTop={"2rem"}
              >
                <MemoizedFriendsList self={true} homepage={true}></MemoizedFriendsList>
              </Box>
            </Box>)}


            <Box className='create-post-and-all-posts-component'
              margin={{ base: "auto", lg: "0" }}
            >
              <Box className='create-post'
              >
                <MemoizedCreatePost></MemoizedCreatePost>
              </Box>
              <Box className='all-posts'
                marginTop={"2rem"}
              >
                <MemoizedAllPosts userId={_id} isProfile={false} hideIcons={false} self={true} homepage={true}></MemoizedAllPosts>
              </Box>
            </Box>

          </Suspense>

          {/* <MemoizedAdvertisement></MemoizedAdvertisement> */}
          <Box>
            <Advertisement></Advertisement>
          </Box>

          {/* {viewportSize.width >= 992 && (<Box className='advertisement-component'>
            <Box className='advertisements'
            >
              <MemoizedAdvertisement></MemoizedAdvertisement>
            </Box>
          </Box>)} */}



          {/* <ImageSlider></ImageSlider> */}
          {/* <Ad></Ad> */}
        </Flex>
      </Box >

    </>
  )
}

export default memo(HomePage);
