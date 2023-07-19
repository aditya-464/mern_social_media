import { Flex, Text } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { HiOutlineUserPlus, HiOutlineUserMinus } from 'react-icons/hi2'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setViewProfile } from "state";
import React from 'react'
import Avatar from 'react-avatar';

export const PostUserDetails = (props) => {
    const { friendId, name, subtitle, userPicturePath, hideIcons, homepage } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);
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
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                borderRadius={"10px"}
            >
                <Flex className='view-post-image'
                    justify={"center"}
                    align={"center"}
                    onClick={() => {
                        dispatch(setViewProfile(friendId));
                        navigate(`/profile/${friendId}`);
                    }}
                    _hover={{
                        cursor: "pointer",
                    }}
                >
                    <Avatar
                        // src={userPicturePath === "picturePath" || !userPicturePath ? profileDummyImg : `http://127.0.0.1:3300/assets/${userPicturePath}`}
                        src={userPicturePath === "" || !userPicturePath ? profileDummyImg : userPicturePath}
                        alt={"user-image"}
                        size={50}
                        round={true}
                    />
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
                    >
                        <Text className="name"
                            fontSize={{ base: "16px", md: "16px", lg: "16px", "3xl": "21px" }}
                            fontWeight={"500"}
                            onClick={() => {
                                dispatch(setViewProfile(friendId));
                                navigate(`/profile/${friendId}`);
                            }}
                            _hover={{
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            {name}
                        </Text>
                        <Text className="location"
                            fontSize={{base :"12px", lg:"14px", "3xl":"16px"}}
                            opacity={"0.7"}
                        >
                            {subtitle}
                        </Text>
                    </Flex>
                    {(_id !== friendId) && !hideIcons && (homepage == true) && <Flex className='friend-icon'
                        fontSize={{ base: "20px", lg: "22px" }}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"10px"}
                        padding={"1rem"}
                        _hover={{
                            backgroundColor: mode === "light" ? "lightHover" : "darkHover",
                            cursor: "pointer",
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

var MemoizedPostUserDetails = null;
export default MemoizedPostUserDetails = React.memo(PostUserDetails);