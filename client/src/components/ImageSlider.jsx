import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ok1 from "../assets/ok1.webp"
import ok3 from "../assets/ok3.webp"
import ok4 from "../assets/ok4.webp"
import ok6 from "../assets/ok6.webp"
import ok8 from "../assets/ok8.webp"
import { Box, Img } from '@chakra-ui/react';



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
    };

    return (
        <>
            <Box width={imgwidth}>
                <Slider {...settings}>
                    <Box>
                        <Img src={ok4} width={imgwidth}></Img>
                    </Box>
                    <Box>
                        <Img src={ok3} width={imgwidth}></Img>
                    </Box>
                    <Box>
                        <Img src={ok1} width={imgwidth}></Img>
                    </Box>
                    <Box>
                        <Img src={ok8} width={imgwidth}></Img>
                    </Box>
                    <Box>
                        <Img src={ok6} width={imgwidth}></Img>
                    </Box>
                </Slider>
            </Box>
        </>
    )
}