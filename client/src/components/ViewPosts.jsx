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
    homepage,
  } = props;

  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);
  const viewportSize = useSelector((state) => state.viewportSize);
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
        width={{ base: "90vw", sm: "60vw", md: "55vw", lg: "35vw", xl: "35vw", "3xl": "30vw" }}
        height={"auto"}
        bgColor={mode === "light" ? "secondaryLight" : "secondaryDark"}
        color={mode === "light" ? "primaryDark" : "primaryLight"}
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
          homepage={homepage}
        >
        </PostUserDetails>

        <Flex className="view-post"
          flexDir={"column"}
        >
          <Box className='post-text'
            marginY={"1.5rem"}
          >
            <Text
              fontSize={{base : "14px", "3xl":"18px"}}
            >
              {description}
            </Text>
          </Box>
          <Flex className='post-image'>
            {picturePath &&
              <Img
                // src={`http://127.0.0.1:3300/assets/${picturePath}`}
                src={picturePath}
                width={"100%"}
                height={"auto"}
                borderRadius={"10px"}
              ></Img>}
          </Flex>

          <Flex className='post-action-box'
            width={"100%"}
            fontSize={{ base: "20px", lg: "24px" }}
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
                  _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
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
                  _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
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
                  _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
                >
                  <BiShareAlt></BiShareAlt>
                </Box>
              </Flex>
            </Flex>
          </Flex>

          {isComments &&
            <>

              <Flex className='comments-section'
                fontSize={{base :"13px", "3xl":"14px"}}
                marginTop={"1rem"}
                maxHeight={{ base: "15vh", lg: "20vh" }}
                overflowY={"auto"}
                flexDir={"column"}
                scrollBehavior={"smooth"}
              >
                {Array.isArray(comments) && comments.map((comment, i) => (
                  <Flex className='individual-comment'
                    key={`${comment.name}+${i}`}
                    marginBottom={"0.7rem"}
                  >
                    <Text
                      fontWeight={"500"}
                      marginRight={"1.5rem"}
                      minWidth={{ base: "15vw", lg: "5vw" }}
                    >
                      {comment.name}
                    </Text>
                    <Text
                      opacity={"0.7"}
                    >
                      {comment.comment}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex className='add-comment'
                padding={"1.5rem 0 1rem 0"}
                height={{ base: (viewportSize.height <= 700) ? "10vh" : "8vh", md:"7vh", lg: "9vh", "3xl":"8vh" }}
              >
                <Input
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  height={"100%"}
                  outline={"none"}
                  bgColor={mode === "light" ? "lightHover" : "darkHover"}
                  border={"1px solid secondaryLight"}
                  _placeholder={{
                    color: mode === "light" ? "primaryDark" : "primaryLight",
                    opacity: "0.7",
                  }}
                  placeholder={'Add a comment'}
                  borderRadius={"10px"}
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
                  _hover={{ backgroundColor: mode === "light" ? "lightHover" : "darkHover", cursor: "pointer" }}
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