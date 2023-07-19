import { Box, Flex, Text, Input } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import React, { useState } from 'react'
import { MdOutlineImage, MdOutlineGifBox, MdOutlineMicNone, MdDeleteOutline } from "react-icons/md";
import FillButton from './FillButton';
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setViewProfile } from "state";
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';


export const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const user = useSelector((state) => state.user);
    const viewportSize = useSelector((state) => state.viewportSize);
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
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
                width={{ base: "90vw", sm: "60vw", md: "55vw", lg: "35vw", xl: "35vw", "3xl": "30vw" }}
                margin={{ base: "auto", lg: "0" }}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                borderRadius={"10px"}
                padding={"1.5rem"}
            >
                <Flex className="image-post-box">
                    <Flex className='image-box'
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={() => {
                            dispatch(setViewProfile(_id));
                            navigate(`/profile/${_id}`);
                        }}
                        _hover={{
                            cursor: "pointer",
                        }}
                    >
                        <Avatar
                            // src={user.picturePath === "picturePath" || !user.picturePath ? profileDummyImg : `http://127.0.0.1:3300/assets/${user.picturePath}`}
                            src={user.picturePath === "" || !user.picturePath ? profileDummyImg : user.picturePath}
                            size={viewportSize.width >= 992 ? 70 : 60}
                            round={true}
                        />
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
                            fontSize={{ base: "h6", "3xl": "h5" }}
                            focusBorderColor={"none"}
                            bgColor={mode === "light" ? "lightHover" : "darkHover"}
                            _placeholder={{
                                color: mode === "light" ? "primaryDark" : "primaryLight",
                                opacity: "0.8",
                            }}
                            color={mode === "light" ? "primaryDark" : "primaryLight"}
                            width={"100%"}
                            padding={{ base: "2rem 1.5rem", "3xl": "2.5rem 2rem" }}
                            marginLeft={"1rem"}
                            border={"none"}
                            outline={"none"}
                            borderRadius={{ base: "20px", "3xl": "35px" }}
                        ></Input>
                    </Flex>
                </Flex>
                {isImage &&
                    <Box className='dropzone-box'>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            accept={{
                                'image/png': ['.png'],
                                'image/jpeg': ['.jpeg'],
                                'image/webp': ['.webp'],
                            }}
                            multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <Flex
                                    width={"100%"}
                                    fontSize={"h6"}
                                    border={image ? "1px dashed #DB005B" : mode === "light" ? "1px dashed black" : "1px dashed white"}
                                    borderRadius={"10px"}
                                    margin={"1rem 0"}
                                >
                                    <Flex
                                        {...getRootProps()}
                                        width={"100%"}
                                        height={{ base: viewportSize.height <= 700 ? "7vh" : "5vh", lg: "8vh" }}
                                        _hover={{ cursor: "pointer" }}
                                        flexDir={"column"}
                                        justify={"center"}
                                    >
                                        <input {...getInputProps()} />
                                        {!image ? (
                                            <Text opacity={"0.5"} paddingLeft={"1rem"}>Add image here</Text>
                                        ) : (
                                            <Flex>
                                                <Text paddingLeft={"1rem"}>{image.name}</Text>
                                            </Flex>
                                        )}
                                    </Flex>
                                    {image && (
                                        <Flex
                                            justify={"center"}
                                            align={"center"}
                                            fontSize={"h4"}
                                            padding={"1rem"}
                                            borderRadius={"5px"}
                                            onClick={() => { setImage(null) }}
                                            _hover={{
                                                backgroundColor: mode === "light" ? "lightHover" : "darkHover",
                                                cursor: "pointer",
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
                        color={mode === "light" ? "primaryDark" : "primaryLight"}
                        width={"20%"}
                        padding={{ base: "1rem 0", xl: "0", "3xl": "0.5rem" }}
                        fontSize={{ base: "24px", xl: "h5", "3xl": "21px" }}
                        justify={"center"}
                        align={"center"}
                        borderRadius={{ base: "10px", xl: "20px", "3xl": "35px" }}
                        _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}

                        onClick={() => { setIsImage(!isImage) }}
                    >
                        <MdOutlineImage></MdOutlineImage>
                        {viewportSize.width >= 1280 && (<Text padding={"0.5rem"} fontSize={"h6"}>Image</Text>)}
                    </Flex>

                    <Flex className='button-grp'
                        color={mode === "light" ? "primaryDark" : "primaryLight"}
                        width={"20%"}
                        padding={{ base: "1rem 0", xl: "0", "3xl": "0.5rem" }}
                        fontSize={{ base: "24px", xl: "h5", "3xl": "21px" }}
                        justify={"center"}
                        align={"center"}
                        borderRadius={{ base: "10px", xl: "20px", "3xl": "35px" }}
                        _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}

                    >
                        <MdOutlineGifBox></MdOutlineGifBox>
                        {viewportSize.width >= 1280 && (<Text padding={"0.5rem"} fontSize={"h6"}>Clip</Text>)}
                    </Flex>

                    <Flex className='button-grp'
                        color={mode === "light" ? "primaryDark" : "primaryLight"}
                        width={"20%"}
                        padding={{ base: "1rem 0", xl: "0", "3xl": "0.5rem" }}
                        fontSize={{ base: "24px", xl: "h5", "3xl": "21px" }}
                        justify={"center"}
                        align={"center"}
                        borderRadius={{ base: "10px", xl: "20px", "3xl": "35px" }}
                        _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}

                    >
                        <MdOutlineMicNone></MdOutlineMicNone>
                        {viewportSize.width >= 1280 && (<Text padding={"0.5rem"} fontSize={"h6"}>Audio</Text>)}
                    </Flex>

                    <Box className='post-btn'
                        width={{ base: "25%", xl: "20%" }}
                        onClick={() => {
                            if (post) {
                                handlePost();
                            }
                        }}
                    >
                        <FillButton name="post" width="100%" fs={{ base: "h6", "3xl": "20px" }} pd={{ base: "1.6rem 0", "3xl": "2rem 0" }} br="20px"></FillButton>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

var MemoizedCreatePost = null;
export default MemoizedCreatePost = React.memo(CreatePost);