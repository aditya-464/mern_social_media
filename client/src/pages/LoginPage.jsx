import React, { memo, useEffect, useState } from 'react'
import image1 from "../assets/login-signup-page.webp"
import { Box, Flex, Img, Text, useStatStyles } from '@chakra-ui/react'
import { LoginForm } from 'components/LoginForm'

const LoginPage = () => {
  const [winHt, setWinHt] = useState({
    height: 0, width: 0
  });
  const [width, setWidth] = useState("");

  const getWindowDimensions = () => {
    let val = window.innerHeight;
    let val2 = window.innerWidth;
    if (val2 <= 480) {
      setWidth("100%")
    }
    else if (val2 <= 480) {
      setWidth("65%")
    }
    else if (val2 <= 768) {
      setWidth("60%")
    }
    else {
      setWidth("55%")
    }
    setWinHt({
      height: val, width: val2
    });
    console.log(winHt);
  }

  useEffect(() => {
    getWindowDimensions();
  }, [])

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
            width={{ base: "75%", sm: "65%", md: "60%", lg: "45%", xl: "40%", "3xl" : "35%" }}
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
                fontSize={{ base: "h3", sm: "h2", lg: "h2", "3xl" : "h1" }}
                fontWeight={600}
                letterSpacing={{ base: "1px", lg: "3px" }}
                marginBottom={"1%"}
              >
                Log In
              </Text>

              <LoginForm width={"100%"}></LoginForm>

            </Box>
          </Box>
        </Box>

        <Box className="login-image-container"
          width={{ base: "0%", lg: "40%" }}
          height={"100%"}
        >
          <Img src={image1}
            width={"100%"}
            height={"100%"}
            objectFit={"cover"}
          >
          </Img>
        </Box>


      </Flex>

    </>
  )
}

export default memo(LoginPage);
