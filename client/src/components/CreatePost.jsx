import { Box, Flex, Text, Input, Img, Button } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import React from 'react'
import { MdOutlineImage, MdOutlineGifBox, MdOutlineMicNone } from "react-icons/md";
import { FillButton } from './FillButton';

export const CreatePost = () => {
    return (
        <>
            <Box className='create-post-container'
                width={"35vw"}
                bgColor={"secondaryLight"}
                color={"primaryDark"}
                borderRadius={"10px"}
                padding={"1.5rem"}
            >
                <Flex className="image-post-box">
                    <Flex className='image-box'
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Img src={profileDummyImg}
                            width={"3vw"}
                            borderRadius={"50%"}
                        ></Img>
                    </Flex>
                    <Flex className='post-box'
                        width={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Input
                            placeholder={'Write your post...'}
                            fontSize={"h6"}
                            bgColor={"#d2cdcd"}
                            color={"primaryDark"}
                            focusBorderColor={"none"}
                            width={"100%"}
                            padding={"2rem 1rem"}
                            marginLeft={"1rem"}
                            border={"none"}
                            outline={"none"}
                            borderRadius={"20px"}
                        ></Input>
                    </Flex>
                </Flex>
                <Box className='dropzone-box'>

                </Box>
                <Flex className='button-box'
                    width={"100%"}
                    align={"center"}
                    justify={"space-between"}
                    marginTop={"1rem"}
                >
                    <Flex className='button-grp'
                        color={"primaryDark"}
                        width={"20%"}
                        fontSize={"h6"}
                        justify={"center"}
                        align={"center"}
                        borderRadius={"20px"}
                        _hover={{
                            bgColor: "#d2cdcd",
                            cursor: "pointer"
                        }}
                    >
                        <MdOutlineImage></MdOutlineImage>
                        <Text padding={"0.5rem"}>Image</Text>
                    </Flex>

                    <Flex className='button-grp'
                        color={"primaryDark"}
                        width={"20%"}
                        fontSize={"h6"}
                        justify={"center"}
                        align={"center"}
                        borderRadius={"20px"}
                        _hover={{
                            bgColor: "#d2cdcd",
                            cursor: "pointer"
                        }}
                    >
                        <MdOutlineGifBox></MdOutlineGifBox>
                        <Text padding={"0.5rem"}>Clip</Text>
                    </Flex>

                    <Flex className='button-grp'
                        color={"primaryDark"}
                        width={"20%"}
                        fontSize={"h6"}
                        justify={"center"}
                        align={"center"}
                        borderRadius={"20px"}
                        _hover={{
                            bgColor: "#d2cdcd",
                            cursor: "pointer"
                        }}
                    >
                        <MdOutlineMicNone></MdOutlineMicNone>
                        <Text padding={"0.5rem"}>Audio</Text>
                    </Flex>

                    <FillButton name="post" width="20%" fs="h6" pd="1.6rem 0" br="20px"></FillButton>
                </Flex>
            </Box>
        </>
    )
}
