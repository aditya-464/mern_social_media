import { Box, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { PostUserDetails } from './PostUserDetails';
import { setFriends } from 'state';


export const FriendsList = () => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const getFriendsList = async () => {
        const response = await fetch(`http://127.0.0.1:3300/users/${_id}/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    const friends = useSelector((state) => state.user.friends);

    useEffect(() => {
        getFriendsList();
    }, [])

    return (
        <>
            <Box className='friends-list-container'
                width={"25vw"}
                fontFamily={"Poppins, sans-serif"}
                padding={"0.5rem 1.5rem"}
                paddingBottom={"1.5rem"}
                bgColor={"secondaryLight"}
                borderRadius={"10px"}
            >
                <Text
                    marginTop={"1rem"}
                    fontSize={"h5"}
                    fontWeight={"500"}
                >
                    Friends List
                </Text>
                {!friends ?
                    (<Text margin={"1rem 0"}>User has no friends...</Text>)
                    : (Array.isArray(friends) && friends.length > 0 && friends.map((friend, id) => (
                        <Box
                            margin={"1rem 0"}
                            key={`${friend._id}+${friend.fullname}`}
                        >
                            <PostUserDetails
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


var MemoizedFriendsList = null;
export default MemoizedFriendsList = React.memo(FriendsList);