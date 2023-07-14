import { Button } from '@chakra-ui/react'
import React from 'react'

export const FillButton = (props) => {
    const { fs, pd, name, width, br } = props;
    return (
        <>
            <Button
                type='submit'
                width={width}
                background={"linear-gradient(90deg, rgba(219,0,91,1) 0%, rgba(247,147,39,1) 100%, rgba(247,147,39,1) 100%)"}
                borderRadius={br == null ? "7px" : `${br}`}
                fontSize={fs}
                fontWeight={"semibold"}
                padding={pd}
                color={"primaryLight"}
                _hover={{
                    color : "primaryLight",
                    borderRadius: br == null ? "4px" : `${br}`
                }}
                _active={{
                    opacity: "0.6",
                    // borderRadius: "4px"
                    borderRadius: br == null ? "4px" : `${br}`
                }}
                letterSpacing={"1.5px"}
                textTransform={"uppercase"}
            >
                {name}
            </Button>
        </>
    )
}
