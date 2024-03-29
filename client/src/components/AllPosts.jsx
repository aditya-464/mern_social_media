import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { ViewPosts } from './ViewPosts';
import { Box, Text } from '@chakra-ui/react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export const AllPosts = (props) => {
    const { userId, isProfile, hideIcons, homepage } = props;
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch("https://vakya-app.onrender.com/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        if (!userId) return null;
        const response = await fetch(
            `https://vakya-app.onrender.com/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile === true) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [userId]);




    return (
        <>
            <Box className='all-posts-container'
                width={{ base: "90vw", sm: "60vw", md: "55vw", lg: "35vw", xl: "35vw", "3xl": "30vw" }}
                margin={{ base: "auto", lg: "0" }}
                height={"auto"}
            >
                {posts.length === 0 && isProfile &&
                    <Text
                        fontSize={"h3"}
                        textAlign={"center"}
                        fontFamily={"Poppins, sans-serif"}
                        marginTop={"5rem"}
                    >
                        No posts yet <Text display={"inline-block"} paddingLeft={"1rem"}>&#58; &#40;</Text>
                    </Text>
                }
                {Array.isArray(posts) && posts.map(
                    ({
                        _id,
                        userId,
                        fullname,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    }) => (
                        <LazyLoadComponent
                        key={_id}
                        >
                            <ViewPosts
                                key={_id}
                                postId={_id}
                                postUserId={userId}
                                fullname={fullname}
                                description={description}
                                location={location}
                                picturePath={picturePath}
                                userPicturePath={userPicturePath}
                                likes={likes}
                                comments={comments}
                                hideIcons={hideIcons}
                                homepage={homepage}
                            />
                        </LazyLoadComponent>
                    )
                )}
            </Box>
        </>
    )
}

var MemoizedAllPosts = null;
export default MemoizedAllPosts = React.memo(AllPosts);
