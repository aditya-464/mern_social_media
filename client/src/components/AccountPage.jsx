import { Box, Flex, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import FillButton from './FillButton'
import Dropzone from "react-dropzone";
import { MdDeleteOutline } from 'react-icons/md'
import EmptyButton from './EmptyButton'
import { setLogin, setLogout } from 'state'
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom'


export const AccountPage = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);
    const viewportSize = useSelector((state) => state.viewportSize);


    const [userDetails, setUserDetails] = useState({
        _id: user._id, fullname: user.fullname, username: user.username, occupation: user.occupation, location: user.location, bio: user.bio
    })
    const [option, setOption] = useState("user-image");
    const [val, setVal] = useState(0);
    const [image, setImage] = useState(null);
    const [editBtnCLicked, setEditBtnCLicked] = useState(false);
    const [editBtnCLickedAcc, setEditBtnCLickedAcc] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formData = new FormData();
    formData.append("_id", user._id);
    if (image) {
        formData.append("picture", image);
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
        setImage(null);
    };


    const updateUser = async () => {
        const response = await fetch("http://127.0.0.1:3300/users/updateUser", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });

        const data = await response.json();
        dispatch(
            setLogin({
                user: data.newUser,
                token: data.token
            })
        );
    }



    const handleInput = (e) => {
        let name = e.target.name;
        let val = e.target.value;

        setUserDetails({ ...userDetails, [name]: val });
    }

    const reloadInputs = () => {
        setUserDetails({
            _id: user._id, fullname: user.fullname, username: user.username, occupation: user.occupation, location: user.location, bio: user.bio
        })
    }

    const logoutFunc = () => {
        dispatch(setLogout());
        navigate("/");
    }


    return (
        <>
            <Box className='account-page-container'
                width={{ base: "90vw", sm: "70vw", lg: "65vw", xl: "50vw", "3xl": "40vw" }}
                height={{ base: "auto", lg: "70vh", "3xl": "60vh" }}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                borderRadius={"10px"}
                padding={"1.5rem"}
            >
                <Flex className="account-page-box"
                    width={"100%"}
                    height={{ base: "auto", lg: "100%" }}
                    flexDir={{ base: "column", lg: "row" }}
                >
                    <Box className='left-side'
                        width={{ base: "100%", lg: "35%" }}
                        height={{ base: "auto", lg: "100%" }}
                        borderRight={{ base: "none", lg: "2px solid #d2cdcd" }}
                        borderBottom={{ base: "2px solid #d2cdcd", lg: "none" }}
                        fontFamily={"Poppins, sans-serif"}
                        fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
                        paddingRight={{ base: "0", lg: "2rem" }}
                        paddingBottom={{ base: "2rem", lg: "0" }}
                        marginBottom={{ base: "2rem", lg: "0" }}
                    >
                        <Box className='left-side-row'
                            width={"100%"}
                            padding={"0.5rem 1rem"}
                            borderRadius={"5px"}
                            _hover={{
                                backgroundColor: mode === "light" ? "lightHover" : "darkHover",
                                cursor: "pointer"
                            }}
                            border={option === "user-image" ? mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050" : "2px solid transparent"}
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
                                backgroundColor: mode === "light" ? "lightHover" : "darkHover",
                                cursor: "pointer"
                            }}
                            border={option === "account-details" ? mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050" : "2px solid transparent"}
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
                                backgroundColor: mode === "light" ? "lightHover" : "darkHover",
                                cursor: "pointer"
                            }}
                            border={option === "logout" ? mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050" : "2px solid transparent"}
                            transitionDuration={"100ms"}
                            onClick={() => {
                                setOption("logout");
                            }}
                        >
                            <Text>Logout</Text>
                        </Box>
                    </Box>

                    <Flex className='right-side'
                        width={{ base: "100%", lg: "65%" }}
                        height={{ base: "55vh", lg: "100%" }}
                        flexDir={"column"}
                        justify={"space-between"}
                        paddingLeft={"1rem"}
                        fontFamily={"Poppins, sans-serif"}
                    >

                        {option === "user-image" &&
                            <Flex className='user-image-section'
                                width={"100%"}
                                height={"100%"}
                                flexDir={"column"}
                                justify={"space-between"}
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
                                            // src={user.picturePath === "picturePath" || !user.picturePath ? profileDummyImg : `http://127.0.0.1:3300/assets/${user.picturePath}`}
                                            src={user.picturePath === "" || !user.picturePath ? profileDummyImg : user.picturePath}
                                            size={(viewportSize.width < 480) ? 150 : (viewportSize.width < 1900) ? 180 : 220}
                                            round={true}
                                        />
                                    </Flex>
                                    <Text
                                        fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
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
                                                    width={"90%"}
                                                    fontSize={{ base: "h6", lg: "h5", "3xl": "22px" }}
                                                    border={image ? "1px dashed #DB005B" : mode === "light" ? "1px dashed black" : "1px dashed white"}
                                                    borderRadius={"10px"}
                                                    margin={"auto"}
                                                    marginY={"1rem"}
                                                >
                                                    <Flex
                                                        {...getRootProps()}
                                                        width={"100%"}
                                                        height={"8vh"}
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
                                </Box>
                                <Flex className='action-buttons'
                                    width={"100%"}
                                    padding={"0.5rem"}
                                    paddingTop={"1rem"}
                                    justify={"flex-end"}
                                    align={"center"}
                                >

                                    {editBtnCLicked && image && <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        onClick={() => {
                                            updateUserImage();
                                            setEditBtnCLicked(false);

                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <FillButton name="save" fs={{ base: "h6", "3xl": "18px" }} pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>}

                                    {!editBtnCLicked && <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        onClick={() => {
                                            setEditBtnCLicked(true);
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <FillButton name="edit" fs={{ base: "h6", "3xl": "18px" }} pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>}

                                    {editBtnCLicked && <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        onClick={() => {
                                            setEditBtnCLicked(false);
                                            setImage(null);
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <EmptyButton name="cancel" fs={{ base: "h6", "3xl": "18px" }} pd="2rem 0" width="100%"></EmptyButton>
                                    </Box>}
                                </Flex>

                            </Flex>
                        }

                        {option === "account-details" &&
                            <Flex className='account-details-group'
                                width={"100%"}
                                height={"100%"}
                                flexDir={"column"}
                                justify={"space-between"}
                                marginTop={"1rem"}
                                marginLeft={{ base: "0", lg: "1rem" }}
                                paddingRight={"1rem"}
                            >
                                <Flex className='input-boxes'
                                    width={"100%"}
                                    justify={"space-between"}
                                    align={"center"}
                                    flexDir={"column"}
                                    overflowY={"auto"}
                                    scrollBehavior={"smooth"}
                                >

                                    <Flex className='right-side-row'
                                        width={"100%"}
                                        justify={"space-between"}
                                        align={"center"}
                                        marginBottom={"2rem"}
                                        padding={"0 1rem"}
                                    >
                                        <FormControl
                                            width={"45%"}
                                        >
                                            <FormLabel
                                                fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
                                            >
                                                Full Name
                                            </FormLabel>
                                            {editBtnCLickedAcc && <Input
                                                name='fullname'
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.fullname}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}
                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                onChange={()=>setVal(1)}
                                                name={"fullname"}
                                                value={user.fullname}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                            >
                                            </Input>}
                                        </FormControl>

                                        <FormControl
                                            width={"45%"}
                                        >
                                            <FormLabel
                                                fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
                                            >
                                                Username
                                            </FormLabel>

                                            {editBtnCLickedAcc && <Input
                                                name={"username"}
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.username}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}
                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"location"}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                onChange={()=>setVal(1)}
                                                value={user.username}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                            >

                                            </Input>}
                                        </FormControl>
                                    </Flex>

                                    <Flex className='right-side-row'
                                        width={"100%"}
                                        justify={"space-between"}
                                        align={"center"}
                                        marginBottom={"2rem"}
                                        padding={"0 1rem"}
                                    >
                                        <FormControl
                                            width={"45%"}
                                        >
                                            <FormLabel
                                                fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
                                            >
                                                Occupation
                                            </FormLabel>
                                            {editBtnCLickedAcc && <Input
                                                name={"occupation"}
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.occupation}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"occupation"}
                                                onChange={()=>setVal(1)}
                                                value={user.occupation}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                            >

                                            </Input>}
                                        </FormControl>

                                        <FormControl
                                            width={"45%"}
                                        >
                                            <FormLabel
                                                fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
                                            >
                                                Location
                                            </FormLabel>

                                            {editBtnCLickedAcc && <Input
                                                name={"location"}
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.location}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"location"}
                                                fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                onChange={()=>setVal(1)}
                                                value={user.location}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                _placeholder={{
                                                    color: mode === "light" ? "primaryDark" : "primaryLight",
                                                    opacity: "0.8",
                                                }}
                                                color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                _hover={{
                                                    outline: "none",
                                                }}
                                                focusBorderColor={"none"}
                                                border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                            >

                                            </Input>}
                                        </FormControl>
                                    </Flex>

                                    <Flex className='right-side-row'
                                        width={"100%"}
                                        justify={"space-between"}
                                        align={"center"}
                                        padding={"0 1rem"}
                                    >
                                        <FormControl
                                            width={"100%"}
                                        >
                                            <FormLabel
                                                fontSize={{ base: "h6", lg: "h5", "3xl": "24px" }}
                                            >
                                                Bio
                                            </FormLabel>

                                            {editBtnCLickedAcc &&
                                                <Textarea
                                                    name={"bio"}
                                                    onChange={(e) => handleInput(e)}
                                                    value={userDetails.bio}
                                                    fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                    padding={"1rem 1rem"}
                                                    borderRadius={"5px"}
                                                    bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                    _placeholder={{
                                                        color: mode === "light" ? "primaryDark" : "primaryLight",
                                                        opacity: "0.8",
                                                    }}
                                                    color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                    _hover={{
                                                        outline: "none",
                                                    }}
                                                    overflowY={"auto"}
                                                    rows={"3"}
                                                    focusBorderColor={"none"}
                                                    border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}
                                                >
                                                </Textarea>
                                            }

                                            {!editBtnCLickedAcc &&
                                                <Textarea
                                                    contentEditable={"false"}
                                                    suppressContentEditableWarning={true}
                                                    name={"bio"}
                                                    fontSize={{ base: "14px", lg: "h6", "3xl": "18px" }}
                                                    onChange={()=>setVal(1)}
                                                    value={user.bio}
                                                    padding={"1rem 1rem"}
                                                    borderRadius={"5px"}
                                                    bgColor={mode === "light" ? "lightHover" : "darkHover"}
                                                    _placeholder={{
                                                        color: mode === "light" ? "primaryDark" : "primaryLight",
                                                        opacity: "0.8",
                                                    }}
                                                    color={mode === "light" ? "primaryDark" : "primaryLight"}
                                                    _hover={{
                                                        outline: "none",
                                                    }}
                                                    overflowY={"auto"}
                                                    rows={"3"}
                                                    focusBorderColor={"none"}
                                                    border={mode === "light" ? "2px solid #d2cdcd" : "2px solid #505050"}                                                >
                                                </Textarea>
                                            }


                                        </FormControl>
                                    </Flex>
                                </Flex>

                                {/* Action buttons */}

                                <Flex className='action-buttons'
                                    width={"100%"}
                                    padding={"0.5rem"}
                                    paddingTop={"1rem"}
                                    justify={"flex-end"}
                                    align={"center"}
                                >

                                    {editBtnCLickedAcc && <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        onClick={() => {
                                            setEditBtnCLickedAcc(false);
                                            updateUser();
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <FillButton name="save" fs={{ base: "h6", "3xl": "18px" }} pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>}

                                    {!editBtnCLickedAcc && <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        onClick={() => {
                                            setEditBtnCLickedAcc(true);
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <FillButton name="edit" fs={{ base: "h6", "3xl": "18px" }} pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>}

                                    {editBtnCLickedAcc && <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        onClick={() => {
                                            setEditBtnCLickedAcc(false);
                                            reloadInputs();
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <EmptyButton name="cancel" fs={{ base: "h6", "3xl": "18px" }} pd="2rem 0" width="100%"></EmptyButton>
                                    </Box>}
                                </Flex>

                            </Flex>
                        }

                        {option === "logout" &&
                            (<Flex className='logout-section'
                                flexDir={"column"}
                            >
                                <Box className='question'>
                                    <Text
                                        fontSize={{ base: "h6", lg: "h5" }}
                                        textAlign={"center"}
                                        paddingTop={"1rem"}
                                    >
                                        Are you certain you wish to Logout?
                                    </Text>
                                </Box>
                                <Flex className='btns'
                                    width={"100%"}
                                    justify={"center"}
                                    align={"center"}
                                    marginTop={"3rem"}
                                >
                                    <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        marginRight={"1rem"}
                                        onClick={() => {
                                            logoutFunc();
                                        }}
                                    >
                                        <EmptyButton name="yes" fs={{ base: "h6", "3xl": "18px" }} pd="2rem 0" width="100%"></EmptyButton>

                                    </Box>
                                    <Box
                                        width={{ base: "30%", lg: "20%" }}
                                        marginLeft={"1rem"}
                                        onClick={() => {
                                            navigate("/home");
                                        }}
                                    >
                                        <FillButton name="no" fs={{ base: "h6", "3xl": "18px" }} pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>
                                </Flex>

                            </Flex>)

                        }
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

var MemoizedAccountPage = null;
export default MemoizedAccountPage = React.memo(AccountPage);
