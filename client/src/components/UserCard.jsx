import { Box, Flex, Img, Text } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { IoLocationSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';



export const UserCard = (props) => {
    const { userId, picturePath } = props;
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://127.0.0.1:3300/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        setUser(data);

    }
    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const { fullname, bio, location, occupation, profileViews, impressions } = user;

    return (
        <>
            <Box className='user-card-container'
                width={"25vw"}
                backgroundColor={"secondaryLight"}
                borderRadius={"10px"}
                padding={"1rem"}
                color={"primaryDark"}
                fontFamily={"Poppins, sans-serif"}
            >
                <Flex className='user-name-image'
                    marginBottom={"1rem"}
                >
                    <Flex className='image-box'
                    justify={"center"}
                    align={"center"}
                    >
                        <Avatar
                            src={user.picturePath === "picturePath" || !user.picturePath ? profileDummyImg : `http://127.0.0.1:3300/assets/${user.picturePath}`}
                            size={60}
                            round={true}
                        />
                    </Flex>
                    <Flex className='name-box'
                        flexDirection={"column"}
                        justifyContent={"center"}
                        paddingLeft={"1.5rem"}
                    >
                        <Text className='name'
                            fontSize={"20px"}
                            fontWeight={"bold"}
                        >
                            {fullname}
                        </Text>
                        <Text className='bio'
                            fontSize={"14px"}
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
                            fontSize={"14px"}
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
                            fontSize={"14px"}
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
                    fontSize={"14px"}
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
