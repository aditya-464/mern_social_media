import { Flex, Box, Text, Img } from '@chakra-ui/react'
import { HiOutlineSparkles } from "react-icons/hi"
import React from 'react'
import MemoizedImageSlider from './ImageSlider'
import { useSelector } from 'react-redux'



export const Advertisement = () => {

    const mode = useSelector((state) => state.mode);

    return (
        <>
            <Flex className='advertisement-container'
                width={"20vw"}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
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
                        fontWeight={"500"}
                    >
                        What's New
                    </Text>
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
                    <MemoizedImageSlider width="20vw"></MemoizedImageSlider>
                </Box>
            </Flex>
        </>
    )
}

var MemoizedAdvertisement = null;
export default MemoizedAdvertisement = React.memo(Advertisement);

