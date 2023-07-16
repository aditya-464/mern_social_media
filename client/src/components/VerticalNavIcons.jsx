import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { FaBell, FaMoon, FaQuestionCircle, FaSun } from 'react-icons/fa';
import { MdChat, MdManageAccounts } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { setMode } from 'state';
import { HiMenu } from 'react-icons/hi';
import { IoSettingsSharp } from 'react-icons/io5';


export const VerticalNavIcons = () => {
    const mode = useSelector((state) => state.mode);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const toggleMode = () => {
        dispatch(setMode());
    }

    return (
        <>
            <Box className='menu-icon'
                margin={"0 1.5rem"}
                _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                padding={"0.5rem"}
                borderRadius={"5px"}
                marginRight={"0"}
                ref={btnRef}
                onClick={onOpen}
            >
                <HiMenu fontSize={"24px"}></HiMenu>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={"xs"}
            >
                <DrawerOverlay />
                <DrawerContent
                    bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                    color={mode === "light" ? "primaryDark" : "primaryLight"}
                >
                    <DrawerCloseButton 
                    fontSize={"h6"} 
                    padding={"2rem"}
                    borderRadius={"5px"}
                    _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                    />
                    <DrawerBody
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginTop={"4rem"}
                    >
                        <Flex className='display-mode'
                            margin={"0 0.5rem"}
                            _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                            padding={"1rem"}
                            borderRadius={"5px"}
                            onClick={(toggleMode)}
                            justify={"flex-start"}
                            align={"center"}
                        >
                            {mode === "light" ? (<FaMoon fontSize={"18px"}></FaMoon>) : (<FaSun fontSize={"18px"}></FaSun>)}
                            <Text
                                fontSize={"h6"}
                                fontWeight={"500"}
                                marginLeft={"1rem"}
                            >
                                Display Mode
                            </Text>
                        </Flex>

                        <Flex className='message'
                            margin={"0 0.5rem"}
                            _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                            padding={"1rem"}
                            borderRadius={"5px"}
                            justify={"flex-start"}
                            align={"center"}
                        >
                            <MdChat fontSize={"18px"}></MdChat>
                            <Text
                                fontSize={"h6"}
                                fontWeight={"500"}
                                marginLeft={"1rem"}
                            >
                                Messages
                            </Text>
                        </Flex>

                        <Flex className='notification'
                            margin={"0 0.5rem"}
                            _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                            padding={"1rem"}
                            borderRadius={"5px"}
                            justify={"flex-start"}
                            align={"center"}
                        >
                            <FaBell fontSize={"18px"}></FaBell>
                            <Text
                                fontSize={"h6"}
                                fontWeight={"500"}
                                marginLeft={"1rem"}
                            >
                                Notifications
                            </Text>
                        </Flex>

                        <Flex className='help'
                            margin={"0 0.5rem"}
                            _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                            padding={"1rem"}
                            borderRadius={"5px"}
                            justify={"flex-start"}
                            align={"center"}
                        >
                            <FaQuestionCircle fontSize={"18px"}></FaQuestionCircle>
                            <Text
                                fontSize={"h6"}
                                fontWeight={"500"}
                                marginLeft={"1rem"}
                            >
                                Help
                            </Text>
                        </Flex>

                        <Flex className='settings'
                            margin={"0 0.5rem"}
                            _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                            padding={"1rem"}
                            borderRadius={"5px"}
                            marginRight={"0"}
                            onClick={() => {
                                navigate("/account");
                            }}
                            justify={"flex-start"}
                            align={"center"}
                        >
                            <IoSettingsSharp fontSize={"18px"}></IoSettingsSharp>
                            <Text
                                fontSize={"h6"}
                                fontWeight={"500"}
                                marginLeft={"1rem"}
                            >
                                Account
                            </Text>
                        </Flex>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
