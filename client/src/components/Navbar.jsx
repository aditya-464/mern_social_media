import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { FaSearch, FaMoon, FaSun, FaBell, FaQuestionCircle } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
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
                    <Flex className='app-icon-container'
                        justifyContent={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                    >
                        <Text
                            fontSize={"h4"}
                            fontWeight={600}
                            letterSpacing={"1px"}
                            bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                            bgClip={"text"}>
                            Vakya
                        </Text>
                    </Flex>
                    <Flex className='search-bar-container'
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginLeft={"3rem"}
                        padding={"0.5rem 0"}
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
                                focusBorderColor={"transparent"}
                            >
                            </Input>
                            <FaSearch fontSize={"16px"} />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex className='navbar-right-container'
                    width={"50%"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                >
                    <Box className='display-mode'
                        margin={"0 0.5rem"}
                        _hover={{ backgroundColor: "#d2cdcd", cursor: "pointer" }}
                        padding={"0.7rem"}
                        borderRadius={"5px"}>
                        <FaMoon fontSize={"18px"}></FaMoon>
                    </Box>
                    <Box className='message'
                        margin={"0 0.5rem"}
                        _hover={{ backgroundColor: "#d2cdcd", cursor: "pointer" }}
                        padding={"0.7rem"}
                        borderRadius={"5px"}>
                        <MdChat fontSize={"18px"}></MdChat>
                    </Box>
                    <Box className='notification'
                        margin={"0 0.5rem"}
                        _hover={{ backgroundColor: "#d2cdcd", cursor: "pointer" }}
                        padding={"0.7rem"}
                        borderRadius={"5px"}>
                        <FaBell fontSize={"18px"}></FaBell>
                    </Box>
                    <Box className='help'
                        margin={"0 0.5rem"}
                        _hover={{ backgroundColor: "#d2cdcd", cursor: "pointer" }}
                        padding={"0.7rem"}
                        borderRadius={"5px"}>
                        <FaQuestionCircle fontSize={"18px"}></FaQuestionCircle>
                    </Box>
                    <Box className='settings'
                        margin={"0 0.5rem"}
                        _hover={{ backgroundColor: "#d2cdcd", cursor: "pointer" }}
                        padding={"0.7rem"}
                        borderRadius={"5px"} marginRight={"0"}>
                        <FaUser fontSize={"18px"}></FaUser>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}
