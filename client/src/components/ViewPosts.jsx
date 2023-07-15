import { Box, Flex, Img, Input, Text } from '@chakra-ui/react'
import { BiShareAlt, BiSolidHeart, BiHeart, BiChat, BiSend } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { PostUserDetails } from './PostUserDetails';

export const ViewPosts = (props) => {
  const {
    postId,
    postUserId,
    fullname,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    hideIcons,
  } = props;

  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const patchLike = async () => {
    const response = await fetch(`http://127.0.0.1:3300/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchComment = async () => {
    const response = await fetch(`http://127.0.0.1:3300/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        comment: comment
      }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }

  return (
    <>
      <Box className='view-post-container'
        width={"35vw"}
        height={"auto"}
        bgColor={"secondaryLight"}
        color={"primaryDark"}
        padding={"1.5rem"}
        borderRadius={"10px"}
        fontFamily={"Poppins, sans-serif"}
        marginBottom={"2.5rem"}
      >

        <PostUserDetails
          friendId={postUserId}
          name={fullname}
          subtitle={location}
          userPicturePath={userPicturePath}
          hideIcons={hideIcons}
        >
        </PostUserDetails>

        <Flex className="view-post"
          flexDir={"column"}
        >
          <Box className='post-text'
            marginY={"1.5rem"}
          >
            <Text
              fontSize={"14px"}
            >
              {description}
            </Text>
          </Box>
          <Flex className='post-image'>
            {picturePath &&
              <Img
                src={`http://127.0.0.1:3300/assets/${picturePath}`}
                width={"100%"}
                height={"auto"}
                borderRadius={"10px"}
              ></Img>}
          </Flex>

          <Flex className='post-action-box'
            width={"100%"}
            fontSize={"24px"}
            marginTop={"1.5rem"}
            align={"center"}
            justify={"space-between"}
          >

            <Flex className='left-side'>
              <Flex className='like-grp'
                align={"center"}
              >
                <Box
                  padding={"0.8rem"}
                  borderRadius={"10px"}
                  _hover={{
                    bgColor: "#d2cdcd",
                    cursor: "pointer"
                  }}
                  onClick={patchLike}
                >
                  {isLiked ? (<BiSolidHeart color='#DB005B'></BiSolidHeart>) : (<BiHeart></BiHeart>)}
                </Box>
                <Box
                  minWidth={"3vw"}
                >
                  <Text fontSize={"h6"} marginLeft={"0.2rem"}>{likeCount}</Text>
                </Box>
              </Flex>

              <Flex className='comment-grp'
                align={"center"}
              >
                <Box
                  padding={"0.8rem"}
                  borderRadius={"10px"}
                  _hover={{
                    bgColor: "#d2cdcd",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setIsComments(!isComments);
                  }}
                >
                  <BiChat></BiChat>
                </Box>
                <Box
                  minWidth={"3vw"}
                >
                  <Text fontSize={"h6"} marginLeft={"0.2rem"}>{comments.length}</Text>
                </Box>
              </Flex>
            </Flex>

            <Flex className='right-side'>
              <Flex className='like-grp'
                align={"center"}
              >
                <Box
                  padding={"0.8rem"}
                  borderRadius={"10px"}
                  _hover={{
                    bgColor: "#d2cdcd",
                    cursor: "pointer"
                  }}
                >
                  <BiShareAlt></BiShareAlt>
                </Box>
              </Flex>
            </Flex>
          </Flex>

          {isComments &&
            <>

              <Flex className='comments-section'
                fontSize={"13px"}
                marginTop={"1rem"}
                maxHeight={"20vh"}
                overflowY={"auto"}
                flexDir={"column"}
                scrollBehavior={"smooth"}
              >
                {Array.isArray(comments) && comments.map((comment, i) => (
                  <Flex className='individual-comment' key={`${comment.name}+${i}`}>
                    <Text
                      fontWeight={"bold"}
                      marginRight={"1.5rem"}
                    >{comment.name}</Text>
                    <Text>{comment.comment}</Text>
                  </Flex>
                ))}
              </Flex>
              <Flex className='add-comment'
                padding={"1.5rem 0 1rem 0"}
                height={"9vh"}
              >
                <Input
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  height={"100%"}
                  outline={"none"}
                  bgColor={"#d2cdcd"}
                  border={"1px solid secondaryLight"}
                  placeholder='Add a comment'
                  borderRadius={"20px"}
                  fontSize={"13px"}
                  padding={"0 1.5rem"}
                  focusBorderColor={"transaprent"}
                ></Input>
                <Flex
                  justify={"center"}
                  align={"center"}
                  fontSize={"28px"}
                  padding={"0 0.8rem"}
                  borderRadius={"7px"}
                  _hover={{ bgColor: "#d2cdcd" }}
                  cursor={"pointer"}
                  marginLeft={"1rem"}
                  onClick={() => {
                    if (comment) {
                      patchComment();
                    }
                    setComment("");
                  }}
                >
                  <BiSend></BiSend>
                </Flex>
              </Flex>
            </>
          }
        </Flex>
      </Box>
    </>
  )
}


var MemoizedViewPosts = null;
export default MemoizedViewPosts = React.memo(ViewPosts);