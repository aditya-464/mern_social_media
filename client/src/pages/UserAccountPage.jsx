import { Box, Flex } from '@chakra-ui/react'
import MemoizedAccountPage from 'components/AccountPage'
import MemoizedNavbar from 'components/Navbar'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const UserAccountPage = () => {
    const mode = useSelector((state)=>state.mode)
    return (
        <>
            <Box className='navbar'
                width={"100vw"}
                position={"fixed"}
            >
                <MemoizedNavbar></MemoizedNavbar>
            </Box>
            <Flex className='account-page-outer-container'
                maxWidth={"100vw"}
                height={"100vh"}
                bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
                flexDir={"column"}
                justify={"center"}
                align={"center"}
            >
                <Box className='account-page-inner-container'
                    bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
                    margin={"auto"}
                >
                    <Box className='account-page'
                        marginTop={"2rem"}
                    >
                        <MemoizedAccountPage></MemoizedAccountPage>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default memo(UserAccountPage);
