// import ImageSlider from 'components/ImageSlider'
import React from 'react'
import img1 from "../assets/ok1.webp"
import img3 from "../assets/ok3.webp"
import img4 from "../assets/ok4.webp"
import img6 from "../assets/ok6.webp"
import img8 from "../assets/ok8.webp"
import SimpleImageSlider from "react-simple-image-slider";
import { Box } from '@chakra-ui/react'

export const Ad = () => {
  const images = [
    { url: img1 },
    { url: img3 },
    { url: img4 },
    { url: img6 },
    { url: img8 },
    // { url: img1 },
    // { url: img1 },
  ];

  return (
    <>
      <Box 
      width={"20vw"}
      >
        <SimpleImageSlider
          width={560}
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </Box>
    </>
    // <ImageSlider></ImageSlider>
  )
}
