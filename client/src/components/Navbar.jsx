import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { FaSearch, FaMoon, FaSun, FaBell, FaQuestionCircle } from "react-icons/fa";
import { MdChat, MdManageAccounts } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMode } from 'state';
import { VerticalNavIcons } from './VerticalNavIcons';


export const Navbar = () => {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const mode = useSelector((state) => state.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleMode = () => {
        dispatch(setMode());
    }

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    return (
        <>
            <Flex className='navbar-container'
                maxWidth={"100vw"}
                padding={"1vh 5vw"}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
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
                            fontSize={{ base: "20px", lg: "28px" }}
                            fontWeight={600}
                            letterSpacing={"1px"}
                            bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                            bgClip={"text"}
                            _hover={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                navigate("/home");
                            }}
                        >
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
                            bgColor={mode === "light" ? "lightHover" : "darkHover"}
                            color={mode === "light" ? "primaryDark" : "primaryLight"}
                        >
                            <Input
                                fontSize={"14px"}
                                _placeholder={{
                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                    opacity: "0.7",
                                }}
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
                    {screenSize.width >= 992 ?
                        (<Flex className='navbar-btns-grp'
                            bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                            color={mode === "light" ? "primaryDark" : "primaryLight"}
                            flexDir={{ base: "column", lg: "row" }}
                        >
                            <Box className='display-mode'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}
                                onClick={(toggleMode)}
                            >
                                {mode === "light" ? (<FaMoon fontSize={"18px"}></FaMoon>) : (<FaSun fontSize={"18px"}></FaSun>)}
                            </Box>

                            <Box className='message'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}>
                                <MdChat fontSize={"18px"}></MdChat>
                            </Box>

                            <Box className='notification'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}>
                                <FaBell fontSize={"18px"}></FaBell>
                            </Box>

                            <Box className='help'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}>
                                <FaQuestionCircle fontSize={"18px"}></FaQuestionCircle>
                            </Box>

                            <Box className='settings'
                                margin={"0 1.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.5rem"}
                                borderRadius={"5px"}
                                marginRight={"0"}
                                onClick={() => {
                                    navigate("/account");
                                }}
                            >
                                <MdManageAccounts fontSize={"24px"}></MdManageAccounts>
                            </Box>
                        </Flex>) :
                        (<VerticalNavIcons></VerticalNavIcons>)}
                </Flex>
            </Flex>
        </>
    )
}

var MemoizedNavbar = null;
export default MemoizedNavbar = React.memo(Navbar);