import { Box, Flex, Img, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { FillButton } from './FillButton'
import Dropzone from "react-dropzone";
import { MdDeleteOutline } from 'react-icons/md'
import { EmptyButton } from './EmptyButton'
import { setLogin } from 'state'
import Avatar from 'react-avatar';


export const AccountPage = () => {
    const [option, setOption] = useState("user-image");
    const [image, setImage] = useState(null);
    const [editBtnCLicked, setEditBtnCLicked] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const formData = new FormData();
    formData.append("_id", user._id);
    if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
    }

    const updateUserImage = async () => {
        const response = await fetch(`http://127.0.0.1:3300/users/updateUserImage`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        dispatch(
            setLogin({
                user: data.newUser,
                token: data.token
            })
        );
        console.log(user);
        setImage(null);
    };

    return (
        <>
            <Box className='account-page-container'
                width={"50vw"}
                bgColor={"secondaryLight"}
                color={"primaryDark"}
                borderRadius={"10px"}
                height={"70vh"}
                padding={"1.5rem"}
            >
                <Flex className="account-page-box"
                    width={"100%"}
                    height={"100%"}
                >
                    <Box className='left-side'
                        width={"35%"}
                        height={"100%"}
                        borderRight={"2px solid #d2cdcd"}
                        fontFamily={"Poppins, sans-serif"}
                        fontSize={"h5"}
                        paddingRight={"1rem"}
                    >
                        <Box className='left-side-row'
                            width={"100%"}
                            padding={"0.5rem 1rem"}
                            borderRadius={"5px"}
                            _hover={{
                                bgColor: "#d2cdcd",
                                color: "primaryDark",
                                cursor: "pointer",

                            }}
                            border={option === "user-image" ? "1px solid #d2cdcd" : "1px solid transparent"}
                            transitionDuration={"100ms"}
                            onClick={() => {
                                setOption("user-image");
                            }}
                        >
                            <Text>User Image</Text>
                        </Box>
                        <Box className='left-side-row'
                            width={"100%"}
                            padding={"0.5rem 1rem"}
                            borderRadius={"5px"}
                            _hover={{
                                bgColor: "#d2cdcd",
                                color: "primaryDark",
                                cursor: "pointer",

                            }}
                            border={option === "account-details" ? "1px solid #d2cdcd" : "1px solid transparent"}
                            transitionDuration={"100ms"}
                            onClick={() => {
                                setOption("account-details");
                            }}
                        >
                            <Text>Account Details</Text>
                        </Box>
                        <Box className='left-side-row'
                            width={"100%"}
                            padding={"0.5rem 1rem"}
                            borderRadius={"5px"}
                            _hover={{
                                bgColor: "#d2cdcd",
                                color: "primaryDark",
                                cursor: "pointer",
                            }}
                            border={option === "logout" ? "1px solid #d2cdcd" : "1px solid transparent"}
                            transitionDuration={"100ms"}
                            onClick={() => {
                                setOption("logout");
                            }}
                        >
                            <Text>Logout</Text>
                        </Box>
                    </Box>
                    <Flex className='right-side'
                        width={"65%"}
                        height={"100%"}
                        flexDir={"column"}
                        justify={"space-between"}
                        paddingLeft={"1rem"}
                    >
                        <Box className='user-image'
                            overflowY={"auto"}
                            scrollBehavior={"smooth"}
                            padding={"0.5rem"}
                        >
                            <Flex 
                            justify={"center"}
                            align={"center"}
                            >
                                <Avatar
                                    src={user.picturePath === "picturePath" || !user.picturePath ? profileDummyImg : `http://127.0.0.1:3300/assets/${user.picturePath}`}
                                    size={180}
                                    round={true}
                                />
                            </Flex>


                            {/* <Avatar ></Avatar> */}

                            <Text
                                fontSize={"h5"}
                                textAlign={"center"}
                                padding={"1rem 0"}
                            >
                                {user.fullname}
                            </Text>
                            {editBtnCLicked && <Box className='add-image'
                                width={"100%"}
                                marginTop={"3rem"}
                            >
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
                                            margin={"1rem 0"}
                                        >
                                            <Flex
                                                {...getRootProps()}
                                                width={"100%"}
                                                height={"7vh"}
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
                        </Box>
                        <Flex className='action-buttons'
                            width={"100%"}
                            padding={"0.5rem"}
                            paddingTop={"1rem"}
                            justify={"flex-end"}
                            align={"center"}
                        >

                            {editBtnCLicked && image && <Box
                                width={"20%"}
                                onClick={() => {
                                    updateUserImage();
                                    setEditBtnCLicked(false);

                                }}
                                marginLeft={"2rem"}
                            >
                                <FillButton name="save" fs="h6" pd="2.2rem 0" width="100%"></FillButton>
                            </Box>}

                            {!editBtnCLicked && <Box
                                width={"20%"}
                                onClick={() => {
                                    setEditBtnCLicked(true);
                                }}
                                marginLeft={"2rem"}
                            >
                                <FillButton name="edit" fs="h6" pd="2.2rem 0" width="100%"></FillButton>
                            </Box>}

                            {editBtnCLicked && <Box
                                width={"20%"}
                                onClick={() => {
                                    setEditBtnCLicked(false);
                                    setImage(null);
                                }}
                                marginLeft={"2rem"}
                            >
                                <EmptyButton name="cancel" fs="h6" pd="2rem 0" width="100%"></EmptyButton>
                            </Box>}
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}
