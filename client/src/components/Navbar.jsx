import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { FaSearch, FaMoon, FaSun, FaBell, FaQuestionCircle } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoaderPage, setMode, setNavbarSize, setViewportSize } from 'state';
import { VerticalNavIcons } from './VerticalNavIcons';
import { IoSettingsSharp } from 'react-icons/io5';


export const Navbar = () => {
    const [screenSize, setScreenSize] = useState({
        width: 0, height: 0
    });
    const mode = useSelector((state) => state.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navRef = useRef(null);

    const toggleMode = () => {
        dispatch(setMode());
    }

    useLayoutEffect(() => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
        dispatch(setViewportSize({
            width: window.innerWidth,
            height: window.innerHeight
        }))
        dispatch(setNavbarSize({
            height: navRef.current.offsetHeight,
            width : navRef.current.offsetWidth
        }))
    }, []);

    return (
        <>
            <Flex className='navbar-container'
                width={"100vw"}
                padding={{ base: "1vh 5vw", lg: "1vh 2vw", xl: "1vh 5vw", "3xl": "1.5vh 10vw" }}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                fontFamily={"Poppins, sans-serif"}
                ref={navRef}
            >
                <Flex className='navbar-left-container'
                    width={"50%"}>
                    <Flex className='app-icon-container'
                        justifyContent={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                    >
                        <Text
                            fontSize={{ base: "20px", sm: "28px", lg: "28px", "3xl": "36px" }}
                            fontWeight={600}
                            letterSpacing={"1px"}
                            bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                            bgClip={"text"}
                            _hover={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                dispatch(setLoaderPage(true));
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
                            paddingRight={{ base: "1rem", "3xl": "1.5rem" }}
                            paddingLeft={{ base: "0.5rem", lg: "1rem" }}
                            borderRadius={"5px"}
                            bgColor={mode === "light" ? "lightHover" : "darkHover"}
                            color={mode === "light" ? "primaryDark" : "primaryLight"}
                        >
                            <Input
                                width={{ base: "10rem", sm: "15rem", lg: "15rem", "3xl": "20rem" }}
                                fontSize={{ base: "14px", "3xl": "18px" }}
                                _placeholder={{
                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                    opacity: "0.7",
                                }}
                                placeholder='Search...'
                                outline={"none"}
                                border={"none"}
                                marginRight={"1rem"}
                                padding={{ lg: "1rem 0.5rem", "3xl": "1.5rem 1rem" }}
                                focusBorderColor={"transparent"}
                            >
                            </Input>
                            <FaSearch fontSize={screenSize.width < 1900 ? "16px" : "20px"} />
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
                                {mode === "light" ? (<FaMoon fontSize={screenSize.width < 1900 ? "18px" : "24px"}></FaMoon>) : (<FaSun fontSize={screenSize.width < 1900 ? "18px" : "24px"}></FaSun>)}
                            </Box>

                            <Box className='message'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}>
                                <MdChat fontSize={screenSize.width < 1900 ? "18px" : "24px"}></MdChat>
                            </Box>

                            <Box className='notification'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}>
                                <FaBell fontSize={screenSize.width < 1900 ? "18px" : "24px"}></FaBell>
                            </Box>

                            <Box className='help'
                                margin={"0 0.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}>
                                <FaQuestionCircle fontSize={screenSize.width < 1900 ? "18px" : "24px"}></FaQuestionCircle>
                            </Box>

                            <Box className='settings'
                                margin={"0 1.5rem"}
                                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                                padding={"0.7rem"}
                                borderRadius={"5px"}
                                marginRight={"0"}
                                onClick={() => {
                                    navigate("/account");
                                }}
                            >
                                <IoSettingsSharp fontSize={screenSize.width < 1900 ? "18px" : "24px"}></IoSettingsSharp>
                            </Box>
                        </Flex>) :
                        (<VerticalNavIcons></VerticalNavIcons>)}
                </Flex>
            </Flex >
        </>
    )
}

var MemoizedNavbar = null;
export default MemoizedNavbar = React.memo(Navbar);