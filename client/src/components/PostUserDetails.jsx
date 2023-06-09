import { Flex, Img, Box, Text } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { HiOutlineUserPlus, HiOutlineUserMinus } from 'react-icons/hi2'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import React from 'react'

export const PostUserDetails = (props) => {
    const { friendId, name, subtitle, userPicturePath } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const patchFriend = async () => {
        const response = await fetch(
            `http://127.0.0.1:3300/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    let isFriend = null;
    if (Array.isArray(friends)) {
        isFriend = friends.find((friend) => friend._id === friendId);
    }

    return (
        <>
            <Flex className="view-post-name-image"
                width={"100%"}
                bgColor={"secondaryLight"}
                color={"primaryDark"}
                borderRadius={"10px"}
            >
                <Flex className='view-post-image'
                    justify={"center"}
                    align={"center"}
                    onClick={() => {
                        navigate("/profile");
                    }}
                    _hover={{cursor: "pointer"}}
                >
                    <Img
                        src={userPicturePath === "picturePath" ? profileDummyImg : `http://127.0.0.1:3300/assets/${userPicturePath}`}
                        width={"4vw"}
                        borderRadius={"50%"}
                    ></Img>
                </Flex>
                <Flex className='view-post-details'
                    width={"100%"}
                    justifyContent={"space-between"}
                    align={"center"}
                >

                    <Flex className='view-post-name'
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"flex-start"}
                        paddingLeft={"1rem"}
                        onClick={() => {
                            navigate("/profile");
                        }}
                        _hover={{cursor: "pointer"}}
                    >
                        <Text className="name"
                            fontSize={"h6"}
                            fontWeight={"bold"}
                        >
                            {name}
                        </Text>
                        <Text className="location"
                            fontSize={"12px"}
                        >
                            {subtitle}
                        </Text>
                    </Flex>
                    {(_id !== friendId) && <Flex className='friend-icon'
                        fontSize={"22px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"10px"}
                        padding={"1rem"}
                        _hover={{
                            bgColor: "#d2cdcd",
                            cursor: "pointer"
                        }}
                        onClick={() => { patchFriend() }}
                    >
                        {isFriend ? (<HiOutlineUserMinus></HiOutlineUserMinus>) : (<HiOutlineUserPlus></HiOutlineUserPlus>)}
                    </Flex>}
                </Flex>
            </Flex>
        </>
    )
}
