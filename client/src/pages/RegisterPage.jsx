import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export const RegisterPage = () => {
    const [mode, setMode] = useState("dark");


    return (
        <>
            <Box className='container' width="100vw" height="100vh" backgroundColor="#F6FFDE" color="black">
                <Box className='abstract-image-container'></Box>
                <Box className='register-content'>
                    <Text fontSize={"60px"} color={(mode==="dark")?"white":"black"}>Hare Krishna</Text>
                    <Text fontSize={"44px"}>Hare Krishna</Text>
                    <Text fontSize={"32px"}>Hare Krishna</Text>
                    <Text fontSize={"24px"}>Hare Krishna</Text>
                    <Text fontSize={"20px"}>Hare Krishna</Text>
                    <Text fontSize={"16px"}>Hare Krishna</Text>
                </Box>
                <Box margin={"auto"} width="30vw" height={"50vh"} bgColor={"#e4e9d7"} borderRadius={"10px"}></Box>
            </Box>
        </>
    )
}
