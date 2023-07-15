import React, {memo} from 'react'
import image1 from "../assets/login-signup-page.webp"
import { Box, Flex, Img, Text } from '@chakra-ui/react'
import { LoginForm } from 'components/LoginForm'

const LoginPage = () => {
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
            <Box className='login-text'
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
                Log In
              </Text>

              <LoginForm width="55%"></LoginForm>

            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default memo(LoginPage);
