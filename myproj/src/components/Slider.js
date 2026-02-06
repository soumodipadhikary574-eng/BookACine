import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from "D:/React Projects/myproj/src/images/pexels-pixabay-56866.jpg"
import Img2 from "D:/React Projects/myproj/src/images/Screenshot (1).png"
const images = [
  Img1, Img2
  
];
const MuiImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <Box width="100%" height="20%" sx={{ m: 4, textAlign: "center" }}>
      {/* <Typography variant="h6" gutterBottom>
        Auto Image Slider
      </Typography> */}
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index} component="img" src={img} alt={`Slide ${index + 1}`} width="100%" />
        ))}
      </Slider>
      {/* <Typography variant="body1">Current Slide: {currentSlide + 1}</Typography> */}
    </Box>
  );
};

export default MuiImageSlider;
