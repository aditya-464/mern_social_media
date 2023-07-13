import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { PostUserDetails } from './PostUserDetails';


export const FriendsList = () => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);


    return (
        <>
            <Box className='friends-list-container'
                width={"25vw"}
                fontFamily={"Poppins, sans-serif"}
                padding={"0.5rem 1.5rem"}
                bgColor={"secondaryLight"}
                borderRadius={"10px"}
            >
                {!friends ?
                    (<Text margin={"1rem 0"}>User has no friends...</Text>)
                    : (friends.map((friend, id) => (
                        <Box 
                        margin={"1rem 0"}
                        >
                            <PostUserDetails
                                key={`${friend._id}+${friend.fullname}`}
                                friendId={friend._id}
                                name={friend.fullname}
                                subtitle={friend.location}
                                userPicturePath={friend.picturePath}
                            ></PostUserDetails>
                        </Box>
                    )))
                }
            </Box>
        </>
    )
}
