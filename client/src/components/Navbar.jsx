import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { FaSearch, FaMoon, FaSun, FaBell, FaQuestionCircle, FaGear } from "react-icons/fa";
import { HiAnnotation } from "react-icons/hi";
import React from 'react'

export const Navbar = () => {
    return (
        <>
            <Flex className='navbar-container'
                width={"100vw"}
                padding={"1vh 5vw"}
                bgColor={"secondaryLight"}
                color={"primaryDark"}
                borderRadius={"5px"}
                fontFamily={"Poppins, sans-serif"}
            >
                <Flex className='navbar-left-container'
                    width={"50%"}>
                    <Box className='app-icon-container'
                        textAlign={"center"}>
                        <Text
                            fontSize={"h4"}
                            fontWeight={600}
                            letterSpacing={"1px"}
                            bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                            bgClip={"text"}>
                            Vakya
                        </Text>
                    </Box>
                    <Flex className='search-bar-container'
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginLeft={"3rem"}
                    >
                        <Flex className='search-bar'
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={"0.5rem 1rem"}
                            borderRadius={"5px"}
                            bgColor={"#d2cdcd"}
                        >
                            <Input
                                fontSize={"14px"}
                                placeholder='Search...'
                                outline={"none"}
                                border={"none"}
                                marginRight={"1rem"}
                                padding={"1rem 0.5rem"}
                            >
                            </Input>
                            <FaSearch fontSize={"16px"} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex className='navbar-right-container'
                    width={"50%"}>
                    <Box className='display-mode'></Box>
                    <Box className='message'></Box>
                    <Box className='notification'></Box>
                    <Box className='help'></Box>
                    <Box className='settings'></Box>
                </Flex>
            </Flex>
        </>
    )
}
