import { Box, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { PostUserDetails } from './PostUserDetails';
import { setFriends } from 'state';


export const FriendsList = (props) => {
    const { self, homepage } = props;
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);
    const viewProfileId = useSelector((state) => state.viewProfile);

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


    const getUserFriendsList = async () => {
        const response = await fetch(`http://127.0.0.1:3300/users/${viewProfileId}/friends`, {
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
        if (self == true) {
            getFriendsList();
        }
        else {
            getUserFriendsList();
        }
    }, [self, viewProfileId])

    return (
        <>
            <Box className='friends-list-container'
                width={{ base: "90vw", sm: "60vw", md: "55vw", lg: "30vw", xl: "25vw", "3xl": "20vw" }}
                margin={{ base: "auto", lg: "0" }}
                fontFamily={"Poppins, sans-serif"}
                padding={"0.5rem 1.5rem"}
                paddingBottom={"1.5rem"}
                bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
                color={mode === "light" ? "primaryDark" : "primaryLight"}
                borderRadius={"10px"}
            >
                <Text
                    marginTop={"1rem"}
                    fontSize={{base : "h5", "3xl":"24px"}}
                    fontWeight={"500"}
                >
                    Friends List
                </Text>

                <Box className='friends-list'
                    maxH={{ base: "25vh", sm: "27vh", md: "20vh", lg: "30vh" }}
                    overflowY={"auto"}
                    scrollBehavior={"smooth"}
                    paddingRight={"0.5rem"}
                >
                    {!friends ?
                        (<Text
                            margin={"1rem 0"}
                            fontSize={{ base: "14px", lg: "16px", "3xl" : "18px" }}
                            opacity={"0.7"}
                        >
                            User has no friends...
                        </Text>)
                        : (Array.isArray(friends) && friends.length > 0 && friends.map((friend, ind) => (
                            <Box
                                margin={"1rem 0"}
                                key={`${friend._id}+${friend.fullname}+${ind}`}
                            >
                                <PostUserDetails
                                    friendId={friend._id}
                                    name={friend.fullname}
                                    subtitle={friend.location}
                                    userPicturePath={friend.picturePath}
                                    self={self}
                                    homepage={homepage}
                                ></PostUserDetails>
                            </Box>
                        )))
                    }
                </Box>
            </Box>
        </>
    )
}


var MemoizedFriendsList = null;
export default MemoizedFriendsList = React.memo(FriendsList);