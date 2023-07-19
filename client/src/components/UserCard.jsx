import { Box, Flex, Text } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { IoLocationSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { setViewProfile } from 'state';



export const UserCard = (props) => {
    const { userId } = props;
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);
    const viewportSize = useSelector((state) => state.viewportSize);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = async () => {
        if (!userId) return null;
        const response = await fetch(`https://vakya-app.onrender.com/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        setUser(data);

    }
    useEffect(() => {
        getUser();
    }, [userId]);

    if (!user) {
        return null;
    }

    const { fullname, bio, location, occupation, profileViews, impressions } = user;

    return (
        <>
            <Box className='user-card-container'
                width={{ base: "90vw", sm: "60vw", md: "55vw", lg: "30vw", xl: "25vw", "3xl": "20vw" }}
                margin={{ base: "auto", lg: "0" }}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                borderRadius={"10px"}
                padding={"1rem"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                fontFamily={"Poppins, sans-serif"}
            >
                <Flex className='user-name-image'
                    marginBottom={"1rem"}
                >
                    <Flex className='image-box'
                        justify={"center"}
                        align={"center"}
                        onClick={() => {
                            dispatch(setViewProfile(userId));
                            navigate(`/profile/${userId}`);
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
                    <Flex className='name-box'
                        flexDirection={"column"}
                        justifyContent={"center"}
                        paddingLeft={"1.5rem"}
                    >
                        <Text className='name'
                            fontSize={{ base: "20px", md: "22px", lg: "20px", "3xl": "24px" }}
                            fontWeight={"500"}
                            onClick={() => {
                                dispatch(setViewProfile(userId));
                                navigate(`/profile/${userId}`);
                            }}
                            _hover={{
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            {fullname}
                        </Text>
                        <Text className='bio'
                            fontSize={{ base: "14px", md: "16px", lg: "14px", "3xl": "18px" }}
                        >
                            {bio}
                        </Text>
                    </Flex>
                </Flex>

                <Box className='line-break'
                    width={"90%"}
                    height={"1px"}
                    backgroundColor={"#c4c4c4"}
                    margin={"auto"}
                ></Box>

                <Box className='user-location-occupation'
                    marginTop={"0.5rem"}
                    marginBottom={"1rem"}
                >
                    <Flex className='location'
                        fontSize={"h5"}
                        padding={"0.5rem 2rem"}
                        alignItems={"center"}
                    >
                        <IoLocationSharp></IoLocationSharp>
                        <Text
                            fontSize={{ base: "14px", md: "16px", lg: "14px", "3xl": "18px" }}
                            marginLeft={"1rem"}
                        >
                            {location}
                        </Text>
                    </Flex>
                    <Flex className='occupation'
                        fontSize={"h5"}
                        padding={"0.5rem 2rem"}
                        alignItems={"center"}
                    >
                        <MdWork></MdWork>
                        <Text
                            fontSize={{ base: "14px", md: "16px", lg: "14px", "3xl": "18px" }}
                            marginLeft={"1rem"}
                        >
                            {occupation}
                        </Text>
                    </Flex>
                </Box>

                <Box className='line-break'
                    width={"90%"}
                    height={"1px"}
                    backgroundColor={"#c4c4c4"}
                    margin={"auto"}
                ></Box>

                <Box className='user-profile-post-detail'
                    fontSize={{ base: "14px", md: "16px", lg: "14px", "3xl": "18px" }}
                    padding={"0.5rem 2rem"}
                    marginBottom={"1rem"}
                >
                    <Flex className='profile-views'
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        padding={"0.5rem 0"}
                    >
                        <Text className='profile-views-text'>
                            Who's viewed your profile
                        </Text>
                        <Text className='prfile-view-number'
                            fontWeight={"bold"}
                        >
                            {profileViews}
                        </Text>
                    </Flex>
                    <Flex className='impressions-views'
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Text className='impressions-views-text'>
                            Impressions of your posts
                        </Text>
                        <Text className='impressions-view-number'
                            fontWeight={"bold"}
                        >
                            {impressions}
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

var MemoizedUserCard = null;
export default MemoizedUserCard = React.memo(UserCard);