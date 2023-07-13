import { Flex, Box, Text, Img } from '@chakra-ui/react'
import { HiOutlineSparkles } from "react-icons/hi"
import React from 'react'


export const Advertisement = () => {
    return (
        <>
            <Flex className='advertisement-container'
                width={"25vw"}
                height={"30vh"}
                bgColor={"secondaryLight"}
                color={"primaryDark"}
                padding={"1.5rem"}
                margin={"2rem 0"}
                borderRadius={"10px"}
                fontFamily={"Poppins, sans-serif"}
                flexDir={"column"}
            >
                <Flex className='whats-new'
                    align={"center"}
                >
                    <Text
                        fontSize={"h6"}
                        fontWeight={"bold"}

                    >What's New</Text>
                    <Box className='sparkle-icon'
                        fontSize={"20px"}
                        paddingLeft={"1rem"}
                        color={"pinkish"}
                    >
                        <HiOutlineSparkles></HiOutlineSparkles>
                    </Box>
                </Flex>
                <Flex className='slider-box'
                    width={"100%"}
                >
                    {/* Slider component */}
                </Flex>
                <Box className='text-box'>
                    <Text>Hare krishna</Text>
                </Box>
            </Flex>
        </>
    )
}
