import { Box, Flex, Img, Text } from '@chakra-ui/react'
import profileDummyImg from "../assets/profile-dummy-img.jpg"
import { HiOutlineUserPlus, HiOutlineUserMinus } from "react-icons/hi2";
import { BiShareAlt, BiSolidHeart, BiHeart, BiChat } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

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
    comments, } = props;

  const [isComments, setIsComments] = useState(false);
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
        <Flex className="view-post-name-image">
          <Flex className='view-post-image'
            justify={"center"}
            align={"center"}
          >
            <Img src={profileDummyImg}
              width={"3vw"}
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
            >
              <Text className="name"
                fontSize={"h6"}
                fontWeight={"bold"}
              >
                {fullname}
              </Text>
              <Text className="location"
                fontSize={"12px"}
              >
                {location}
              </Text>
            </Flex>
            <Flex className='friend-icon'
              fontSize={"22px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"10px"}
              padding={"1rem"}
              _hover={{
                bgColor: "#d2cdcd",
                cursor: "pointer"
              }}
            >
              <HiOutlineUserPlus></HiOutlineUserPlus>
            </Flex>
          </Flex>
        </Flex>
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
                marginRight={"2rem"}
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
                  <BiHeart></BiHeart>
                </Box>
                <Text fontSize={"h6"} marginLeft={"0.2rem"}>156</Text>
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
                >
                  <BiChat></BiChat>
                </Box>
                <Text fontSize={"h6"} marginLeft={"0.2rem"}>28</Text>
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
        </Flex>

      </Box>
    </>
  )
}
