import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FillButton } from './FillButton'
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const signupSchema = yup.object().shape({
    fullname: yup.string().required("Required"),
    username: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required")
});

const initialValuesSignup = {
    fullname: "",
    username: "",
    email: "",
    password: ""
};

export const SignupForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (values, onSubmitProps) => {
        const signupResponse = await fetch("http://127.0.0.1:3300/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        if (signupResponse.status === 201) {
            const signupData = await signupResponse.json();
            console.log(signupData);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await signup(values, onSubmitProps);
    };

    return (
        <>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesSignup}
                validationSchema={signupSchema}>
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    resetForm,
                }) => (

                    <form style={{ width: props.width, padding: "1rem", margin: "auto", color: "primaryDark", textAlign: "center" }} onSubmit={handleSubmit}>
                        <FormControl
                            marginBottom={"1rem"}
                            isInvalid={errors.fullname && touched.fullname}>
                            <FormLabel
                                fontSize={"h4"}
                                letterSpacing={"1px"}
                                marginBottom={"2%"}>
                                Full Name
                            </FormLabel>
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fullname}
                                name='fullname'
                                fontSize={"h6"}
                                padding={"1rem 0.5rem"}
                                height={"5%"}
                                outline={"1px solid #DB005B"}
                                _focus={{
                                    outline: "1px solid blue"
                                }}></Input>
                            <FormErrorMessage fontSize={"larger"}>{errors.fullname}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            marginBottom={"1rem"}
                            isInvalid={errors.username && touched.username}>
                            <FormLabel
                                fontSize={"h4"}
                                letterSpacing={"1px"}
                                marginBottom={"2%"}>
                                Username
                            </FormLabel>
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name='username'
                                fontSize={"h6"}
                                padding={"1rem 0.5rem"}
                                height={"5%"}
                                outline={"1px solid #DB005B"}
                                _focus={{
                                    outline: "1px solid blue"
                                }}></Input>
                            <FormErrorMessage fontSize={"larger"}>{errors.username}</FormErrorMessage>
                        </FormControl>
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
                        <FillButton name="sign up" fs="h5" pd="8% 0" width="100%"></FillButton>
                        <Text
                            color={"primaryDark"}
                            fontSize={"h6"}
                            marginTop={"5%"}
                            display={"inline-block"}>
                            Already have an account? <span className='login-link'><NavLink to="/login" > Log In</NavLink></span>
                        </Text>
                    </form>
                )}
            </Formik>

        </>
    )
}
