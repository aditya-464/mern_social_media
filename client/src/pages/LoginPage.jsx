import React from 'react'
import image1 from "../assets/login-signup-page.webp"
import { Box, Flex, Img, Text } from '@chakra-ui/react'
import { LoginForm } from 'components/LoginForm'

export const LoginPage = () => {
  return (
    <>
      <Flex className="login-page-container"
        maxWidth={"100vw"}
        height={"100vh"}
        bgColor={"primaryLight"}>
        <Box className="login-image-container"
          width={"40%"}
          height={"100%"}>
          <Img src={image1}
            width={"100%"}
            height={"100%"}
            objectFit={"cover"}>
          </Img>
        </Box>
        <Box className="login-text-container"
          width={"60%"}
          height={"100%"}
          color={"secondaryDark"}>
          <Box className='login-text-content'
            width={"70%"}
            margin={"auto"}
            marginTop={"15%"}
          >
            <Box className='welcome-text'
              textAlign={"center"}>
              <Text
                fontSize={"h2"}
                fontWeight={600}
                letterSpacing={"3px"}
                marginBottom={"1%"}
              >
                Log In
              </Text>

              <LoginForm width="55%"></LoginForm>

            </Box>

            <Flex className='welcome-text-buttons'
              width={"60%"}
              margin={"auto"}
              marginTop={"7%"}
              justifyContent={"space-around"}
              alignItems={"center"}>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
