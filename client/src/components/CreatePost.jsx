import { Box, Flex, Text, Input, Img } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import React, { useState } from 'react'
import { MdOutlineImage, MdOutlineGifBox, MdOutlineMicNone, MdDeleteOutline } from "react-icons/md";
import { FillButton } from './FillButton';
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";


export const CreatePost = () => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://127.0.0.1:3300/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }

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
                            width={"4vw"}
                            borderRadius={"50%"}
                        ></Img>
                    </Flex>
                    <Flex className='post-box'
                        width={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Input
                            onChange={(e) => setPost(e.target.value)}
                            value={post || ""}
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
                {isImage &&
                    <Box className='dropzone-box'>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Flex
                                    width={"100%"}
                                    fontSize={"h6"}
                                    border={image ? "1px dashed #DB005B" : "1px dashed black"}
                                    borderRadius={"10px"}
                                    padding={"1.5rem"}
                                    margin={"1rem 0"}
                                >
                                    <Box
                                        {...getRootProps()}
                                        width={"100%"}
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <Text opacity={"0.5"}>Add image here</Text>
                                        ) : (
                                            <Flex>
                                                <Text >{image.name}</Text>
                                            </Flex>
                                        )}
                                    </Box>
                                    {image && (
                                        <Flex
                                            justify={"center"}
                                            align={"center"}
                                            fontSize={"h5"}
                                            padding={"0.5rem"}
                                            borderRadius={"5px"}
                                            onClick={() => { setImage(null) }}
                                            _hover={{
                                                bgColor: "#d2cdcd",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <MdDeleteOutline></MdDeleteOutline>
                                        </Flex>
                                    )}
                                </Flex>
                            )}

                        </Dropzone>
                    </Box>}

                <Box className='line-break'
                    width={"100%"}
                    height={"1px"}
                    backgroundColor={"#c4c4c4"}
                    margin={"1.5rem 0"}
                ></Box>

                <Flex className='button-box'
                    width={"100%"}
                    align={"center"}
                    justify={"space-between"}
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
                        onClick={() => { setIsImage(!isImage) }}
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

                    <Box className='post-btn'
                        width={"20%"}
                        onClick={() => {
                            if (post) {
                                handlePost();
                            }
                        }}
                    >
                        <FillButton name="post" width="100%" fs="h6" pd="1.6rem 0" br="20px"></FillButton>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}
