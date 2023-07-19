import React, { Suspense, memo } from 'react'
import image1 from "../assets/login-signup-page.webp"
import { Box, Flex, Img, Text } from '@chakra-ui/react'
// import { LoginForm } from 'components/LoginForm'

const LoginForm = React.lazy(() => import("components/LoginForm"));


const LoginPage = () => {
  return (
    <>
      <Flex className="login-page-container"
        maxWidth={"100vw"}
        height={"100vh"}
        bgColor={"white"}
        flexDir={{ base: "column", lg: "row-reverse" }}
      >

        <Box className="login-text-container"
          width={{ base: "100%", lg: "60%" }}
          height={"100%"}
          color={"secondaryDark"}
        >
          <Box className='login-text-content'
            width={{ base: "75%", sm: "65%", md: "60%", lg: "50%", xl: "40%", "3xl": "35%" }}
            margin={"auto"}
            marginTop={{ base: "5%", lg: "15%" }}
          >
            <Box className='login-text'
              textAlign={"center"}
              bgColor={"white"}
              borderRadius={"10px"}
              padding={"1rem 0"}
            >
              <Text
                fontSize={{ base: "h3", sm: "h2", lg: "h2", "3xl": "h1" }}
                fontWeight={600}
                letterSpacing={{ base: "1px", lg: "3px" }}
                marginBottom={{ base: "3%", lg: "1%" }}
              >
                Log In
              </Text>

              <Suspense>
                <LoginForm width={"100%"}></LoginForm>
              </Suspense>

            </Box>
          </Box>
        </Box>

        <Box className="login-image-container"
          width={{ base: "0%", lg: "40%" }}
          height={"100%"}
        >
          <Img
            loading={"eager"}
            src={image1}
            width={"100%"}
            height={"100%"}
            objectFit={"cover"}
            alt='login-page-image'
          >
          </Img>
        </Box>


      </Flex>

    </>
  )
}

export default memo(LoginPage);
