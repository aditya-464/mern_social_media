import { Box, Flex, Img, Text } from '@chakra-ui/react'
import React from 'react'
import welcomePageImage from "../assets/welcome-page.webp"
import { FillButton } from 'components/FillButton'
import { EmptyButton } from 'components/EmptyButton'
import { NavLink } from 'react-router-dom'

export const WelcomePage = () => {
  return (
    <>
      <Flex className="welcome-container"
        maxWidth={"100vw"}
        height={"100vh"}
        bgColor={"primaryLight"}>
        <Box className="welcome-image-container"
          width={"40%"}
          height={"100%"}>
          <Img src={welcomePageImage}
            width={"100%"}
            height={"100%"}
            objectFit={"cover"}>
          </Img>
        </Box>
        <Box className="welcome-text-container"
          width={"60%"}
          height={"100%"}
          color={"secondaryDark"}>
          <Box className='welcome-text-content'
            width={"70%"}
            margin={"auto"}
            marginTop={"15%"}>
            <Box className='welcome-text'
              textAlign={"center"}>
              <Text
                fontSize={"h1"}
                fontWeight={600}
                letterSpacing={"3px"}
                bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                bgClip={"text"}>
                Vakya
              </Text>
              <Text
                fontSize={"h5"}
                letterSpacing={"1.5px"}
                marginTop={"2%"}>
                Social media app designed to ignite substantial conversations and bring people closer like never before.
              </Text>
            </Box>

            <Flex className='welcome-text-buttons'
              width={"60%"}
              margin={"auto"}
              marginTop={"10%"}
              justifyContent={"space-around"}
              alignItems={"center"}>
              <NavLink to="/login" style={{ display: "inline-block", width: "40%" }}>
                <EmptyButton name="log in" fs="h5" pd="2rem 0" width="100%"></EmptyButton>
              </NavLink>
              <NavLink to="/signup" style={{ display: "inline-block", width: "40%" }}>
                <FillButton name="sign up" fs="h5" pd="2.2rem 0" width="100%"></FillButton>
              </NavLink>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
