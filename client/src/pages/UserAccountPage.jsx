import { Box, Flex } from '@chakra-ui/react'
import MemoizedAccountPage from 'components/AccountPage'
import MemoizedNavbar from 'components/Navbar'
import React, { memo, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const UserAccountPage = () => {
    const [height, setHeight] = useState(0);
    const navRef = useRef(null);
    const mode = useSelector((state) => state.mode)

    useLayoutEffect(() => {
        setHeight(navRef.current.offsetHeight);
    }, [])

    return (
        <>
            <Box className='navbar'
                width={"100vw"}
                position={"fixed"}
                ref={navRef}
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
                        marginTop={{ base: `${(height + 20)/10}` + "rem", lg: "2rem" }}
                    >
                        <MemoizedAccountPage></MemoizedAccountPage>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default memo(UserAccountPage);
