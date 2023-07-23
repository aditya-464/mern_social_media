import { Box, Flex, Text } from '@chakra-ui/react';
import React, { Suspense, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import MemoizedUserCard from 'components/UserCard'
import MemoizedFriendsList from 'components/FriendsList'
import MemoizedCreatePost from "components/CreatePost"
import ImageSlider from 'components/ImageSlider';
import { HiOutlineSparkles } from 'react-icons/hi';
import LoaderPage from './LoaderPage';

const MemoizedNavbar = React.lazy(() => import('components/Navbar'));
const MemoizedAllPosts = React.lazy(() => import('components/AllPosts'));

const HomePage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const loaderPage = useSelector((state) => state.loaderPage);
  const viewportSize = useSelector((state) => state.viewportSize);
  const navbarSize = useSelector((state) => state.navbarSize);
  const { _id, picturePath } = user;

  useEffect(()=>{
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, [])

  return (
    <>

      {(loaderPage || showLoader) && <LoaderPage></LoaderPage>}

      <Box className='navbar'
        width={"100vw"}
        position={"fixed"}
        top={0}
        // ref={navRef}
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
        marginTop={{ base: `${(navbarSize.height + 20) / 10}` + "rem" }}
      >
        <Flex className='home-page-inner-container'
          maxWidth={"100%"}
          justify={"space-between"}
          bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
          margin={"auto"}
        >


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
              <Suspense>
                <MemoizedAllPosts userId={_id} isProfile={false} hideIcons={false} self={true} homepage={true}></MemoizedAllPosts>
              </Suspense>
            </Box>
          </Box>


          {/* <MemoizedAdvertisement></MemoizedAdvertisement> */}

          {/* {viewportSize.width >= 992 && (<Box className='advertisement-component'>
            <Box className='advertisements'
            >
            <MemoizedAdvertisement></MemoizedAdvertisement>
            </Box>
          </Box>)} */}

          {viewportSize.width >= 992
            && <Box className='advt-component'>

              {viewportSize.width >= 992 && <Box className='advt-outer'
                width={{ lg: "25vw", xl: "20vw", "3xl": "15vw" }}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                padding={"1.5rem"}
                marginBottom={"2rem"}
                borderRadius={"10px"}
                fontFamily={"Poppins, sans-serif"}
              >
                <Box className='advt-inner'
                  width={"100%"}
                  height={"auto"}
                >
                  <Flex
                    alignItems={"center"}
                    marginBottom={"1rem"}
                  >
                    <Text fontSize={"h6"} fontWeight={500}>What's New</Text>
                    <Box
                      fontSize={"h6"}
                      paddingLeft={"1rem"}
                      color={"pinkish"}
                    >
                      <HiOutlineSparkles></HiOutlineSparkles>
                    </Box>
                  </Flex>
                  <Box>
                    {viewportSize.width >= 992 && <ImageSlider width={"25vw"}></ImageSlider>}
                  </Box>
                </Box>
              </Box>}
            </Box>}

        </Flex >
      </Box >

    </>
  )
}

export default memo(HomePage);
