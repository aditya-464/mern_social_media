import { Flex, Box, Text } from '@chakra-ui/react'
import { HiOutlineSparkles } from "react-icons/hi"
import React from 'react'
import { useSelector } from 'react-redux'
import ImageSlider from './ImageSlider'



export const Advertisement = () => {

    const mode = useSelector((state) => state.mode);

    return (
        <>
            <Flex className='advertisement-container'
                width={{ lg: "25vw", xl: "20vw", "3xl": "15vw" }}
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
                        fontSize={{ base: "h6", "3xl": "24px" }}
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
                    <ImageSlider width={{ lg: "25vw", xl: "20vw", "3xl": "15vw" }}></ImageSlider>
                </Box>
            </Flex>
        </>
    )
}


// var MemoizedAdvertisement = null;
// export default MemoizedAdvertisement = React.memo(Advertisement);

