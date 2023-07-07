import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { FillButton } from './FillButton'
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().min(6, "Password must be atleast 6 characters").max(20, "Password must be less than 20 characters").required("Required")
});

const initialValuesLogin = {
    email: "",
    password: "",
};




export const LoginForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (values, onSubmitProps) => {

    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);
    }

    return (
        <>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesLogin}
                validationSchema={loginSchema}>
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (

                    <form style={{ width: props.width, padding: "1rem", margin: "auto", color: "primaryDark" }} onSubmit={handleSubmit}>
                        <FormControl
                            marginBottom={"1rem"}
                            isInvalid={errors.email && touched.email}>
                            <FormLabel
                                fontSize={"h4"}
                                letterSpacing={"1px"}
                                marginBottom={"2%"}>
                                Email
                            </FormLabel>
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name='email'
                                fontSize={"h6"}
                                padding={"1rem 0.5rem"}
                                height={"5%"}
                                outline={"1px solid #DB005B"}
                                _focus={{
                                    outline: "1px solid blue"
                                }}></Input>
                            <FormErrorMessage fontSize={"larger"}>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            marginBottom={"10%"}
                            isInvalid={errors.password && touched.password}>
                            <FormLabel
                                fontSize={"h4"}
                                letterSpacing={"1px"}
                                marginBottom={"2%"}>
                                Password
                            </FormLabel>
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                type='password'
                                name='password'
                                fontSize={"h6"}
                                padding={"1rem 0.5rem"}
                                height={"5%"}
                                outline={"1px solid #DB005B"}
                                _focus={{
                                    outline: "1px solid blue"
                                }}></Input>
                            <FormErrorMessage fontSize={"larger"}>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <FillButton name="log in" fs="h5" pd="8% 0" width="100%"></FillButton>
                        <Text
                            color={"primaryDark"}
                            fontSize={"h6"}
                            marginTop={"5%"}>
                            Don't have an account? <Text color={"pinkish"} display={"inline"} _hover={{ textDecoration: "underline" }}><NavLink to="/signup" > Sign Up</NavLink></Text>
                        </Text>
                    </form>
                )}
            </Formik>
        </>
    )
}
