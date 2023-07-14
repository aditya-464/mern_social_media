import { FormControl, FormErrorMessage, FormLabel, Input, Text, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FillButton } from './FillButton'
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const signupSchema = yup.object().shape({
    fullname: yup.string().required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().min(6, "Password must be atleast 6 characters").max(20, "Password must be less than 20 characters").required("Required")
});

const initialValuesSignup = {
    fullname: "",
    email: "",
    password: ""
};

export const SignupForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState("");

    const signup = async (values, onSubmitProps) => {
        const signupResponse = await fetch("http://127.0.0.1:3300/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        const signupData = await signupResponse.json();
        onSubmitProps.resetForm();
        if (signupResponse.status === 201) {
            dispatch(
                setLogin({
                    user: signupData.user,
                    token: signupData.token
                })
            );
            navigate("/home");
        }
        else {
            setSignupErrorFunc(signupData.message);
        }
    };

    const setSignupErrorFunc = (message) => {
        setSignupError(message);
        setTimeout(() => {
            setSignupError("");
        }, 3000);
    }
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

                    <form style={{ width: props.width, padding: "1rem", margin: "auto", color: "primaryDark", textAlign: "center", fontFamily: "Poppins, sans-serif" }} onSubmit={handleSubmit}>
                        <FormControl
                            marginBottom={"1rem"}
                            isInvalid={errors.fullname && touched.fullname}>
                            <FormLabel
                                fontSize={"h5"}
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
                            isInvalid={errors.email && touched.email}>
                            <FormLabel
                                fontSize={"h5"}
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
                                fontSize={"h5"}
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
                        {signupError
                            && <Text
                                marginTop={"5%"}
                                fontSize={"h6"}
                                color={"red"} letterSpacing={"1px"}
                                textAlign={"center"}>
                                * {signupError} *
                            </Text>
                        }
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

var MemoizedSignupForm = null;
export default MemoizedSignupForm = React.memo(SignupForm);