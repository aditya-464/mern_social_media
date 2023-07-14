import { Button } from '@chakra-ui/react';
import React from 'react'

export const EmptyButton = (props) => {
    const { fs, pd, name, width } = props;

    return (
        <>
            <Button
                width={width}
                background={"linear-gradient(#F6FFDE, #F6FFDE) padding-box, linear-gradient(90deg, rgba(219,0,91,1) 0%, rgba(247,147,39,1) 100%, rgba(247,147,39,1) 100%)"}
                border={"2.5px solid transparent"}
                borderRadius={"10px"}
                fontSize={fs}
                fontWeight={"semibold"}
                padding={pd}
                color={"primaryDark"}
                _hover={{
                    borderRadius: "4px"
                }}
                _active={{
                    opacity: "0.7",
                    borderRadius: "4px"
                }}
                letterSpacing={"1.5px"}
                textTransform={"uppercase"}>
                {name}
            </Button>
        </>
    )
}
