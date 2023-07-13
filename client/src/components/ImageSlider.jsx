import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ok1 from "../assets/ok1.webp"
import ok3 from "../assets/ok3.webp"
import ok4 from "../assets/ok4.webp"
import ok6 from "../assets/ok6.webp"
import ok8 from "../assets/ok8.webp"
import { Box, Flex, Img } from '@chakra-ui/react';



export const ImageSlider = (props) => {
    const { imgwidth } = props;
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: false,
    };

    return (
        <>
            <Box border={"2px solid red"} width={"20vw"}>
                <Slider {...settings}>
                    <Box>
                        <Img src={ok4} width={"20vw"}></Img>
                    </Box>
                    <Box>
                        <Img src={ok3} width={"20vw"}></Img>
                    </Box>
                    <Box>
                        <Img src={ok1} width={"20vw"}></Img>
                    </Box>
                    <Box>
                        <Img src={ok8} width={"20vw"}></Img>
                    </Box>
                    <Box>
                        <Img src={ok6} width={"20vw"}></Img>
                    </Box>
                </Slider>
            </Box>
        </>
    )
}
