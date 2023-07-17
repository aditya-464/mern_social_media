import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ok1 from "../assets/ok1.webp"
import ok3 from "../assets/ok3.webp"
import ok4 from "../assets/ok4.webp"
import ok6 from "../assets/ok6.webp"
import ok8 from "../assets/ok8.webp"
import { Box, Img, Text } from '@chakra-ui/react';



export const ImageSlider = (props) => {
    const { imgwidth } = props;
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <>
            <Box className='image-slider-container'
                width={imgwidth}
                borderRadius={"10px"}
                overflow={"hidden"}
                border={"none"}
                outline={"none"}
            >
                <Slider {...settings}>
                    <Box
                        border={"none"}
                        outline={"none"}
                    >
                        <Img src={ok4} width={imgwidth} borderRadius={"10px"}></Img>
                        <Text
                            fontSize={{ base: "14px", "3xl": "18px" }}
                            marginTop={"1rem"}
                        >Rasen - our latest foundation colors, a diverse palette celebrating every skin tone. Achieve flawless radiance and embrace your unique beauty with confidence, inclusivity, and endless possibilities.</Text>
                    </Box>
                    <Box
                        border={"none"}
                        outline={"none"}
                    >
                        <Img src={ok3} width={imgwidth} borderRadius={"10px"}></Img>
                        <Text
                            fontSize={{ base: "14px", "3xl": "18px" }}
                            marginTop={"1rem"}
                        >Elevate your style with our latest collection of men's shirts, meticulously crafted with premium fabrics and contemporary designs for confident and effortlessly stylish look.</Text>
                    </Box>
                    <Box
                        border={"none"}
                        outline={"none"}
                    >
                        <Img src={ok1} width={imgwidth} borderRadius={"10px"}></Img>
                        <Text
                            fontSize={{ base: "14px", "3xl": "18px" }}
                            marginTop={"1rem"}
                        >"Experience the pinnacle of skincare luxury with our collection. Unveil luminous beauty with our exquisite cream, serum, face pack, and lotion, delivering transformative results for your radiant complexion.</Text>
                    </Box>
                    <Box
                        border={"none"}
                        outline={"none"}
                    >
                        <Img src={ok8} width={imgwidth} borderRadius={"10px"}></Img>
                        <Text
                            fontSize={{ base: "14px", "3xl": "18px" }}
                            marginTop={"1rem"}
                        >Transform your living space into a haven of style and comfort with our latest home decoration business. Curated designs that reflect your personality and inspire a sense of harmony in every room.</Text>
                    </Box>
                    <Box
                        border={"none"}
                        outline={"none"}
                    >
                        <Img src={ok6} width={imgwidth} borderRadius={"10px"}></Img>
                        <Text
                            fontSize={{ base: "14px", "3xl": "18px" }}
                            marginTop={"1rem"}
                        >Step into our latest cafe, where culinary craftsmanship meets warm hospitality. Savor delectable flavors, sip artisanal beverages, and indulge in a cozy ambiance that feels like home.</Text>
                    </Box>
                </Slider>
            </Box>
        </>
    )
}


var MemoizedImageSlider = null;
export default MemoizedImageSlider = React.memo(ImageSlider);