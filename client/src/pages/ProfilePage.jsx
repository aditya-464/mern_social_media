import { Box, Flex } from '@chakra-ui/react'
import React, { memo, useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import MemoizedAllPosts from 'components/AllPosts'
// import MemoizedFriendsList from 'components/FriendsList';
// import MemoizedNavbar from "components/Navbar"
// import MemoizedUserCard from 'components/UserCard'

const MemoizedAllPosts = React.lazy(() => import("components/AllPosts"));
const MemoizedFriendsList = React.lazy(() => import("components/FriendsList"));
const MemoizedNavbar = React.lazy(() => import("components/Navbar"));
const MemoizedUserCard = React.lazy(() => import("components/UserCard"));

const ProfilePage = () => {
  const [height, setHeight] = useState(0);
  const [pageLoad, setPageLoad] = useState(false);
  const navRef = useRef(null);
  const { id } = useParams();
  const [viewData, setViewData] = useState({
    id: "", picturePath: "",
  });
  const [self, setSelf] = useState(null);
  const user = useSelector((state) => state.user);
  const { _id } = user;
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  const viewportSize = useSelector((state) => state.viewportSize);

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

  window.addEventListener("load", () => {
    setPageLoad(!pageLoad);
  })

  useLayoutEffect(() => {
    setHeight(navRef.current.offsetHeight);
  }, [pageLoad]);


  useEffect(() => {
    getUserDetails();
  }, [id])


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

      {viewData.id !== "" &&
        <Box className='profile-page-outer-container'
          maxWidth={"100vw"}
          bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
          marginTop={{ base: `${(height + 20) / 10}` + "rem" }}
        >
          <Flex className='profile-page-inner-container'
            width={{ base: "100vw", lg: "70vw", xl: "62.5vw", "3xl": "55vw" }}
            height={"auto"}
            margin={"auto"}
            justify={"space-between"}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <Suspense>

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
                <MemoizedAllPosts isProfile={true} userId={viewData.id} hideIcons={true} self={self} homepage={false}></MemoizedAllPosts>
              </Box>
            </Suspense>

          </Flex>
        </Box>}
    </>
  )
}

export default memo(ProfilePage);
