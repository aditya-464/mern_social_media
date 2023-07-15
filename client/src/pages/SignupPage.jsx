import { SignupForm } from 'components/SignupForm'
import React, {memo} from 'react'
import image1 from "../assets/login-signup-page.webp"
import { Box, Flex, Img, Text } from '@chakra-ui/react'

const SignupPage = () => {
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
            marginTop={"10%"}
          >
            <Box className='welcome-text'
              textAlign={"center"}
              bgColor={"white"}
              borderRadius={"10px"}
              padding={"1rem 0"}
              >
              <Text
                fontSize={"h2"}
                fontWeight={600}
                letterSpacing={"3px"}
                marginBottom={"1%"}
              >
                Sign Up
              </Text>

              <SignupForm width="55%"></SignupForm>

            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default memo(SignupPage);