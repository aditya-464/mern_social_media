import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { FillButton } from './FillButton'

export const LoginForm = (props) => {
    return (
        <>
            <form style={{ width: props.width, padding: "1rem", margin: "auto" }}>
                <FormControl marginBottom={"1rem"}>
                    <FormLabel
                        fontSize={"h4"}
                        letterSpacing={"1px"}
                        marginBottom={"2%"}>
                        Email
                    </FormLabel>
                    <Input
                        name='email'
                        fontSize={"h5"}
                        padding={"0.5rem"}
                        height={"5%"}
                        outline={"1px solid #DB005B"}
                        _focus={{
                            outline: "1px solid blue"
                        }}></Input>
                </FormControl>
                <FormControl >
                    <FormLabel
                        fontSize={"h4"}
                        letterSpacing={"1px"}
                        marginBottom={"2%"}>
                        Password
                    </FormLabel>
                    <Input
                        type='password'
                        name='password'
                        fontSize={"h5"}
                        padding={"0.5rem"}
                        height={"5%"}
                        outline={"1px solid #DB005B"}
                        marginBottom={"15%"}
                        _focus={{
                            outline: "1px solid blue"
                        }}></Input>
                </FormControl>
                <FillButton name="log in" fs="h5" pd="2rem" width="100%"></FillButton>
            </form>
        </>
    )
}
