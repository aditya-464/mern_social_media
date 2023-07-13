import { Flex, Box, Text, Img } from '@chakra-ui/react'
import { HiOutlineSparkles } from "react-icons/hi"
import React from 'react'
import { ImageSlider } from './ImageSlider'


export const Advertisement = () => {
    return (
        <>
            <Flex className='advertisement-container'
                width={"20vw"}
                bgColor={"secondaryLight"}
                color={"primaryDark"}
                padding={"1.5rem"}
                marginBottom={"2rem"}
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
                <Box className='slider-box'
                    width={"100%"}
                    margin={"1rem 0"}
                >
                    {/* Slider component */}
                    <ImageSlider width="20vw"></ImageSlider>
                </Box>
            </Flex>
        </>
    )
}
