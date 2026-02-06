import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        py: 3,
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} My Website. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
