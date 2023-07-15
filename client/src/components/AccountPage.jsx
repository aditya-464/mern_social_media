import { Box, Flex, FormControl, FormLabel, Img, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { FillButton } from './FillButton'
import Dropzone from "react-dropzone";
import { MdDeleteOutline } from 'react-icons/md'
import { EmptyButton } from './EmptyButton'
import { setLogin, setLogout } from 'state'
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom'


export const AccountPage = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const [userDetails, setUserDetails] = useState({
        _id: user._id, fullname: user.fullname, username: user.username, occupation: user.occupation, location: user.location, bio: user.bio
    })
    const [option, setOption] = useState("user-image");
    const [image, setImage] = useState(null);
    const [editBtnCLicked, setEditBtnCLicked] = useState(false);
    const [editBtnCLickedAcc, setEditBtnCLickedAcc] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                        paddingRight={"2rem"}
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
                            border={option === "user-image" ? "2px solid #d2cdcd" : "2px solid transparent"}
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
                            border={option === "account-details" ? "2px solid #d2cdcd" : "2px solid transparent"}
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
                            border={option === "logout" ? "2px solid #d2cdcd" : "2px solid transparent"}
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
                                            src={user.picturePath === "picturePath" || !user.picturePath ? profileDummyImg : `http://127.0.0.1:3300/assets/${user.picturePath}`}
                                            size={180}
                                            round={true}
                                        />
                                    </Flex>
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
                                                    border={image ? "1px dashed #DB005B" : "1px dashed black"}
                                                    borderRadius={"10px"}
                                                    margin={"1rem 0"}
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
                        }

                        {option === "account-details" &&
                            <Flex className='account-details-group'
                                width={"100%"}
                                height={"100%"}
                                flexDir={"column"}
                                justify={"space-between"}
                                marginTop={"1rem"}
                                marginLeft={"1rem"}
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
                                                fontSize={"h5"}
                                            >
                                                Full Name
                                            </FormLabel>
                                            {editBtnCLickedAcc && <Input
                                                name='fullname'
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.fullname}
                                                fontSize={"h6"}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"fullname"}
                                                value={user.fullname}
                                                fontSize={"h6"}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >
                                            </Input>}
                                        </FormControl>

                                        <FormControl
                                            width={"45%"}
                                        >
                                            <FormLabel
                                                fontSize={"h5"}
                                            >
                                                Username
                                            </FormLabel>

                                            {editBtnCLickedAcc && <Input
                                                name={"username"}
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.username}
                                                fontSize={"h6"}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}

                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"location"}
                                                fontSize={"h6"}
                                                value={user.username}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >

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
                                                fontSize={"h5"}
                                            >
                                                Occupation
                                            </FormLabel>
                                            {editBtnCLickedAcc && <Input
                                                name={"occupation"}
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.occupation}
                                                fontSize={"h6"}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"occupation"}
                                                value={user.occupation}
                                                fontSize={"h6"}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >

                                            </Input>}
                                        </FormControl>

                                        <FormControl
                                            width={"45%"}
                                        >
                                            <FormLabel
                                                fontSize={"h5"}
                                            >
                                                Location
                                            </FormLabel>

                                            {editBtnCLickedAcc && <Input
                                                name={"location"}
                                                onChange={(e) => handleInput(e)}
                                                value={userDetails.location}
                                                fontSize={"h6"}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >
                                            </Input>}

                                            {!editBtnCLickedAcc && <Input
                                                contentEditable={"false"}
                                                name={"location"}
                                                fontSize={"h6"}
                                                value={user.location}
                                                padding={"2rem 1rem"}
                                                borderRadius={"5px"}
                                                bgColor={"#d2cdcd"}
                                                focusBorderColor={"none"}
                                                border={"2px solid #d2cdcd"}
                                            >

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
                                                fontSize={"h5"}
                                            >
                                                Bio
                                            </FormLabel>

                                            {editBtnCLickedAcc &&
                                                <Textarea
                                                    name={"bio"}
                                                    onChange={(e) => handleInput(e)}
                                                    value={userDetails.bio}
                                                    fontSize={"h6"}
                                                    padding={"1rem 1rem"}
                                                    borderRadius={"5px"}
                                                    bgColor={"#d2cdcd"}
                                                    overflowY={"auto"}
                                                    rows={"3"}
                                                    focusBorderColor={"none"}
                                                    border={"2px solid #d2cdcd"}

                                                >
                                                </Textarea>
                                            }

                                            {!editBtnCLickedAcc &&
                                                <Textarea
                                                    contentEditable={"false"}
                                                    name={"bio"}
                                                    fontSize={"h6"}
                                                    value={user.bio}
                                                    padding={"1rem 1rem"}
                                                    borderRadius={"5px"}
                                                    bgColor={"#d2cdcd"}
                                                    overflowY={"auto"}
                                                    rows={"3"}
                                                    focusBorderColor={"none"}
                                                    border={"2px solid #d2cdcd"}
                                                >
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
                                        width={"20%"}
                                        onClick={() => {
                                            setEditBtnCLickedAcc(false);
                                            updateUser();
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <FillButton name="save" fs="h6" pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>}

                                    {!editBtnCLickedAcc && <Box
                                        width={"20%"}
                                        onClick={() => {
                                            setEditBtnCLickedAcc(true);
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <FillButton name="edit" fs="h6" pd="2.2rem 0" width="100%"></FillButton>
                                    </Box>}

                                    {editBtnCLickedAcc && <Box
                                        width={"20%"}
                                        onClick={() => {
                                            setEditBtnCLickedAcc(false);
                                            reloadInputs();
                                        }}
                                        marginLeft={"2rem"}
                                    >
                                        <EmptyButton name="cancel" fs="h6" pd="2rem 0" width="100%"></EmptyButton>
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
                                        fontSize={"h5"}
                                        textAlign={"center"}
                                        paddingTop={"1rem"}
                                    >
                                        Are you certain you wish to log out?
                                    </Text>
                                </Box>
                                <Flex className='btns'
                                    width={"100%"}
                                    justify={"center"}
                                    align={"center"}
                                    marginTop={"3rem"}
                                >
                                    <Box
                                        width={"20%"}
                                        marginRight={"1rem"}
                                        onClick={() => {
                                            logoutFunc();
                                        }}
                                    >
                                        <EmptyButton name="yes" fs="h6" pd="2rem 0" width="100%"></EmptyButton>

                                    </Box>
                                    <Box
                                        width={"20%"}
                                        marginLeft={"1rem"}
                                        onClick={() => {
                                            navigate("/home");
                                        }}
                                    >
                                        <FillButton name="no" fs="h6" pd="2.2rem 0" width="100%"></FillButton>
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
