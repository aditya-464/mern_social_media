import { FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FillButton from './FillButton'
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setViewProfile } from "state";

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string().required("Required")
});

const initialValuesLogin = {
    email: "",
    password: "",
};

export const LoginForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://127.0.0.1:3300/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });

        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedInResponse.status === 200) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            dispatch(setViewProfile(loggedIn.user._id));
            navigate("/home");
        }
        else {
            invalidCredentialsFunc();
        }

    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);
    };

    const invalidCredentialsFunc = () => {
        setInvalidCredentials(true);
        setTimeout(() => {
            setInvalidCredentials(false);
        }, 3000);
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
                    resetForm,
                }) => (

                    <form style={{
                        width: props.width, padding: "1rem", margin: "auto", color: "primaryDark", textAlign: "center", fontFamily: "Poppins, sans-serif"
                    }} onSubmit={handleSubmit}>
                        <FormControl
                            marginBottom={"1rem"}
                            isInvalid={errors.email && touched.email}>
                            <FormLabel
                                fontSize={{ base: "h6", sm: "h4", lg: "h5", "3xl": "h3" }}
                                letterSpacing={"1px"}
                                marginBottom={"2%"}>
                                Email
                            </FormLabel>
                            <Input
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name='email'
                                fontSize={{ base: "14px", sm: "h5", lg: "h6", "3xl": "h4" }}
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
                                fontSize={{ base: "h6", sm: "h4", lg: "h5", "3xl": "h3" }}
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
                                fontSize={{ base: "14px", sm: "h5", lg: "h6", "3xl": "h4" }}
                                padding={"1rem 0.5rem"}
                                height={"5%"}
                                outline={"1px solid #DB005B"}
                                _focus={{
                                    outline: "1px solid blue"
                                }}></Input>
                            <FormErrorMessage fontSize={"larger"}>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <FillButton name="log in" fs={{ base: "h6", sm: "h5", lg: "h5", "3xl": "h4" }} pd={{ base: "10% 0", sm: "8% 0" }} width="100%"></FillButton>
                        {invalidCredentials
                            && <Text
                                marginTop={"5%"}
                                fontSize={{ base: "h6", sm: "h5", lg: "h6", "3xl": "h4" }}
                                color={"red"} letterSpacing={"1px"}
                                textAlign={"center"}>
                                * Invalid Credentials *
                            </Text>
                        }
                        <Text
                            color={"primaryDark"}
                            fontSize={{ base: "h6", sm: "h5", lg: "h6", "3xl": "h4" }}
                            marginTop={"5%"}
                            display={"inline-block"}>
                            Don't have an account? <span className='signup-link'><NavLink to="/signup" > Sign Up</NavLink></span>
                        </Text>
                    </form>
                )}
            </Formik>
        </>
    )
}

var MemoizedLoginForm = null;
export default MemoizedLoginForm = React.memo(LoginForm);