import { Button } from '@chakra-ui/react'
import React from 'react'

export const FillButton = (props) => {
    const { fs, pd, name, width } = props;
    return (
        <>
            <Button
                width={width}
                background={"linear-gradient(90deg, rgba(219,0,91,1) 0%, rgba(247,147,39,1) 100%, rgba(247,147,39,1) 100%)"}
                borderRadius={"7px"}
                fontSize={fs}
                fontWeight={"semibold"}
                padding={pd}
                color={"primaryLight"}
                _hover={{ opacity: "0.8", borderRadius: "4px" }}
                _active={{ opacity: "0.8", borderRadius: "4px" }}
                letterSpacing={"1.5px"}
                textTransform={"uppercase"}>
                {name}
            </Button>
        </>
    )
}
