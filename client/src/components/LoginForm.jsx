import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { FillButton } from './FillButton'
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const initialValuesLogin = {
    email: "",
    password: "",
};




export const LoginForm = (props) => {
    return (
        <>
            <form style={{ width: props.width, padding: "1rem", margin: "auto", color:"primaryDark" }}>
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
                <FillButton name="log in" fs="h5" pd="8% 0" width="100%"></FillButton>
                <Text 
                color={"primaryDark"}
                fontSize={"h6"}
                marginTop={"5%"}>Don't have an account? <Text color={"pinkish"} display={"inline"} _hover={{textDecoration : "underline"}}><NavLink to="/signup" > Sign Up</NavLink></Text>
                </Text>
            </form>
        </>
    )
}
