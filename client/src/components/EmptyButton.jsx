import { Button } from '@chakra-ui/react';
import React from 'react'

export const EmptyButton = (props) => {
    const { fs, pd, name } = props;

    return (
        <>
            <Button
                background={"linear-gradient(white, white) padding-box, linear-gradient(90deg, rgba(219,0,91,1) 0%, rgba(247,147,39,1) 100%, rgba(247,147,39,1) 100%)"}
                border={"2.5px solid transparent"}
                borderRadius={"10px"}
                fontSize={fs}
                fontWeight={"semibold"}
                padding={pd}
                color={"primaryDark"}
                _hover={{ opacity: "0.8", borderRadius: "4px" }}
                _active={{ opacity: "0.8", borderRadius: "4px" }}
                letterSpacing={"1.5px"}
                textTransform={"uppercase"}>
                {name}
            </Button>
        </>
    )
}
