// import ImageSlider from 'components/ImageSlider'
import React from 'react'
import img1 from "../assets/ok1.webp"
import img3 from "../assets/ok3.webp"
import img4 from "../assets/ok4.webp"
import img6 from "../assets/ok6.webp"
import img8 from "../assets/ok8.webp"
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export const Ad = () => {
  const images = [
    { url: img1 },
    { url: img3 },
    { url: img4 },
    { url: img6 },
    { url: img8 },
  ];

  return (
    <>
      <Box
      width={"20vw"}
      >
        <Carousel>

          <div>
            <img src={img1} />
            <p className="">Rasen - our latest foundation colors, a diverse palette celebrating every skin tone. Achieve flawless radiance and embrace your unique beauty with confidence, inclusivity, and endless possibilities
            </p>
          </div>
          <div>
            <img src={img4} />
            <p className="">Rasen - our latest foundation colors, a diverse palette celebrating every skin tone. Achieve flawless radiance and embrace your unique beauty with confidence, inclusivity, and endless possibilities 2</p>
          </div>
          <div>
            <img src={img3} />
            <p className="">Rasen - our latest foundation colors, a diverse palette celebrating every skin tone. Achieve flawless radiance and embrace your unique beauty with confidence, inclusivity, and endless possibilities 3</p>
          </div>
        </Carousel>
      </Box >
    </>
    // <ImageSlider></ImageSlider>
  )
}
