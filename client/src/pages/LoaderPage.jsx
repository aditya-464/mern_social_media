import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Spinner } from '@chakra-ui/react'
import { useSelector } from 'react-redux'


const LoaderPage = () => {
    const viewportSize = useSelector((state)=>state.viewportSize);
    const mode = useSelector((state)=>state.mode);

    return (
        <>
            <Box className='loader-page-container'
                width={"100vw"}
                height={"100vh"}
                bgColor={mode === "light" ? "primaryLight" : "primaryDark"}
                position={"fixed"}
                top={0}
                zIndex={100000}
                >
                <Flex className='loader-page'
                    width={"100%"}
                    margin={"auto"}
                    paddingTop={`${0.3 * viewportSize.height}`+`px`}
                    flexDir={"column"}
                    justify={"center"}
                    align={"center"}

                >
                    <Box className='text'
                    marginBottom={"2rem"}
                    >
                        <Text
                            fontSize={{ base: "40px", md: "h1", lg: "h2", xl: "h2", '3xl': "70px" }}
                            fontWeight={600}
                            letterSpacing={"3px"}
                            bgGradient={"linear-gradient(90deg, rgba(219,0,91,1) 45%, rgba(247,147,39,1) 60%, rgba(247,147,39,1) 65%)"}
                            bgClip={"text"}
                        >
                            Vakya
                        </Text>
                    </Box>
                    <Box className='spinner'>
                        <Spinner
                            size='xl'
                            color='#007FFF'
                        />
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default LoaderPage