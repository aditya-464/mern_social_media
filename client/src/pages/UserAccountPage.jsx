import { Box, Flex } from '@chakra-ui/react'
import MemoizedAccountPage from 'components/AccountPage'
import MemoizedNavbar from 'components/Navbar'
import React from 'react'

export const UserAccountPage = () => {
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
                bgColor={"primaryLight"}
                flexDir={"column"}
                justify={"center"}
                align={"center"}
            >
                <Box className='account-page-inner-container'
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
