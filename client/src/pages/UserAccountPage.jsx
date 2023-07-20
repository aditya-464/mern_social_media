import { Box, Flex } from '@chakra-ui/react'
import React, { Suspense, memo, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
// import MemoizedAccountPage from 'components/AccountPage'
// import MemoizedNavbar from 'components/Navbar'

const MemoizedAccountPage = React.lazy(() => import("components/AccountPage"));
const MemoizedNavbar = React.lazy(() => import("components/Navbar"));

const UserAccountPage = () => {
    // const [height, setHeight] = useState(0);
    // const [pageLoad, setPageLoad] = useState(false);
    // const navRef = useRef(null);
    const mode = useSelector((state) => state.mode);
    const navbarSize = useSelector((state) => state.navbarSize);


    // window.addEventListener("load", () => {
    //     setPageLoad(true);
    // })

    // useLayoutEffect(() => {
    //     if (navRef != null) {
    //         setHeight(navRef.current.offsetHeight);
    //     }
    // }, [pageLoad])

    return (
        <>
            <Box className='navbar'
                width={"100vw"}
                position={"fixed"}
                top={0}
                // ref={navRef}
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
                <Suspense>
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
                </Suspense>
            </Flex>


        </>
    )
}

export default memo(UserAccountPage);
