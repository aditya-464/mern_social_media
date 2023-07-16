import { Box, Flex, Img, Text } from '@chakra-ui/react'
import React, { useEffect, useState, memo } from 'react'
import welcomePageImage from "../assets/welcome-page.webp"
import { FillButton } from 'components/FillButton'
import { EmptyButton } from 'components/EmptyButton'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const WelcomePage = () => {
  const [welcome, setWelcome] = useState(false);
  const [winHt, setWinHt] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state => state.user));
  const token = useSelector((state) => state.token);

  const getWindowDimensions = () => {
    let val = window.innerHeight;
    setWinHt(val);
  }
  useEffect(() => {
    if (user && token) {
      navigate("/home");
    }
    else {
      getWindowDimensions();
      setWelcome(true);
    }
  }, [winHt])



  return (
    <>
      {welcome &&
        <Flex className="welcome-container"
          maxWidth={"100vw"}
          height={"100vh"}
          fontFamily={"Poppins, sans-serif"}
          bgColor={"white"}
          flexDir={{ base: "column", lg: "row" }}
        >
          <Box className="welcome-image-container"
            width={{ base: "100%", lg: "40%" }}
            height={{ base: "auto", lg: "100%" }}
          >
            <Img src={welcomePageImage}
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
            >
            </Img>
          </Box>
          <Box className="welcome-text-container"
            width={{ base: "100%", lg: "60%" }}
            height={{ base: "100%", lg: "100%" }}
            color={"secondaryDark"}
          >
            <Box className='welcome-text-content'
              width={{ base: "90%", lg: "70%" }}
              height={{ base: "auto", lg: "auto" }}
              margin={"auto"}
              marginTop={{ base: winHt <= 700 ? "5%" : "15%", lg: "15%" }}
            >
              <Box className='welcome-text'
                textAlign={"center"}
              >
                <Text
                  fontSize={{ base: "40px", lg: "h1" }}
                  fontWeight={600}
                  letterSpacing={"3px"}
                  bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                  bgClip={"text"}
                >
                  Vakya
                </Text>
                <Text
                  fontSize={{ base: "14px", lg: "h5" }}
                  letterSpacing={{ base: "1px", lg: "1.5px" }}
                  marginTop={"2%"}
                >
                  Social media app designed to ignite substantial conversations and bring people closer like never before.
                </Text>
              </Box>

              <Flex className='welcome-text-buttons'
                width={{ base: "90%", lg: "60%" }}
                margin={"auto"}
                marginTop={{ base: "10%", lg: "10%" }}
                justifyContent={"space-around"}
                alignItems={"center"}>
                <NavLink to="/login" style={{ display: "inline-block", width: "40%" }}>
                  <EmptyButton name="log in" fs={{ base: "h6", lg: "h5" }} pd={{ base: "2rem 0", lg: "2.4rem 0" }} width="100%"></EmptyButton>
                </NavLink>
                <NavLink to="/signup" style={{ display: "inline-block", width: "40%" }}>
                  <FillButton name="sign up" fs={{ base: "h6", lg: "h5" }} pd={{ base: "2.2rem 0", lg: "2.6rem 0" }} width="100%"></FillButton>
                </NavLink>
              </Flex>
            </Box>
          </Box>
        </Flex >}
    </>
  )
}

export default memo(WelcomePage);