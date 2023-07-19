import { Box, Flex, Img, Text } from '@chakra-ui/react'
import React, { useEffect, useState, memo, Suspense, useLayoutEffect } from 'react'
import welcomePageImage from "../assets/welcome-page.webp"
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setViewportSize } from 'state'
// import { FillButton } from 'components/FillButton'
// import { EmptyButton } from 'components/EmptyButton'

const FillButton = React.lazy(() => import('components/FillButton'));
const EmptyButton = React.lazy(() => import('components/EmptyButton'));

const WelcomePage = () => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [welcome, setWelcome] = useState(false);
  const [winHt, setWinHt] = useState({
    height: 0, width: 0
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state => state.user));
  const token = useSelector((state) => state.token);

  const getWindowDimensions = () => {
    let val = window.innerHeight;
    let val2 = window.innerWidth;
    setWinHt({
      height: val, width: val2
    });
  }


  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  useLayoutEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);
    dispatch(setViewportSize(screenSize));
    return (() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [screenSize])

  useEffect(() => {
    if (user && token) {
      navigate("/home");
    }
    else {
      getWindowDimensions();
      setWelcome(true);
    }
  }, [])



  return (
    <>
      {welcome &&
        <Flex className="welcome-container"
          maxWidth={"100vw"}
          height={"100vh"}
          overflowY={"hidden"}
          fontFamily={"Poppins, sans-serif"}
          bgColor={"white"}
          flexDir={{ base: "column-reverse", md: "column", lg: "row-reverse" }}
        >

          <Box className="welcome-text-container"
            width={{ base: "100%", lg: "60%" }}
            height={{ base: "100%", lg: "100%" }}
            color={"secondaryDark"}
          >
            <Box className='welcome-text-content'
              width={{ base: "90%", md: "80%", lg: "70%" }}
              height={{ base: "auto", lg: "auto" }}
              margin={"auto"}
              marginTop={{ base: winHt.height <= 700 ? "5%" : "15%", sm: "5%", md: winHt.height <= 1200 ? "3%" : "10%", lg: "15%" }}
              marginBottom={{ sm: "5%", md: "5%", lg: "0" }}
            >
              <Box className='welcome-text'
                textAlign={"center"}
              >
                <Text
                  fontSize={{ base: "40px", md: "h1", lg: "h2", xl: "h1", '3xl': "70px" }}
                  fontWeight={600}
                  letterSpacing={"3px"}
                  bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                  bgClip={"text"}
                >
                  Vakya
                </Text>
                <Text
                  fontSize={{ base: "14px", md: "h5", lg: "20px", xl: "h5", "3xl": "h4" }}
                  letterSpacing={{ base: "1px", md: "1.5px", lg: "1.5px" }}
                  marginTop={"2%"}
                >
                  Social media app designed to ignite substantial conversations and bring people closer like never before.
                </Text>
              </Box>

              <Flex className='welcome-text-buttons'
                width={{ base: "90%", md: "80%", lg: "80%", xl: "60%" }}
                margin={"auto"}
                marginTop={{ base: "10%", md: "5%", lg: "10%", "3xl": "7%" }}
                justifyContent={"space-around"}
                alignItems={"center"}>
                <Suspense>
                  <NavLink to="/login" style={{ display: "inline-block", width: "40%" }}>
                    <EmptyButton name="log in" fs={{ base: "h6", lg: "h5", "3xl": "h4" }} pd={{ base: "2rem 0", md: "2.4rem", lg: "2.4rem 0", "3xl": "2.8rem 0" }} width="100%"></EmptyButton>
                  </NavLink>
                  <NavLink to="/signup" style={{ display: "inline-block", width: "40%" }}>
                    <FillButton name="sign up" fs={{ base: "h6", lg: "h5", "3xl": "h4" }} pd={{ base: "2.2rem 0", md: "2.6rem", lg: "2.6rem 0", "3xl": "3rem 0" }} width="100%"></FillButton>
                  </NavLink>
                </Suspense>
              </Flex>
            </Box>
          </Box>


          <Box className="welcome-image-container"
            width={{ base: "100%", lg: "40%" }}
            height={{ lg: "100%" }}
          >
            <Img
              loading={'eager'}
              src={welcomePageImage}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
              alt='Welcome-page-image'
            >
            </Img>
          </Box>


        </Flex >}
    </>
  )
}

export default memo(WelcomePage);