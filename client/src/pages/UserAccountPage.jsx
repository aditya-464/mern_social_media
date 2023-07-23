import { Box, Flex } from '@chakra-ui/react'
import React, { Suspense, memo } from 'react'
import { useSelector } from 'react-redux'
import MemoizedAccountPage from "components/AccountPage"
const MemoizedNavbar = React.lazy(() => import("components/Navbar"));

const UserAccountPage = () => {
    const mode = useSelector((state) => state.mode);
    const navbarSize = useSelector((state) => state.navbarSize);

    return (
        <>
            <Box className='navbar'
                width={"100vw"}
                position={"fixed"}
                top={0}
                zIndex={100}
            >
                <Suspense>
                    <MemoizedNavbar></MemoizedNavbar>
                </Suspense>
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
                            marginTop={{ base: `${(navbarSize.height + 20) / 10}` + "rem", lg: "2rem" }}
                        >
                            <MemoizedAccountPage></MemoizedAccountPage>
                        </Box>
                    </Box>
                
            </Flex>


        </>
    )
}

export default memo(UserAccountPage);
