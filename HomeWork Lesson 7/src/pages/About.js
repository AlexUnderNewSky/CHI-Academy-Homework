import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4" align="center">
      About the Rick and Morty App
    </Typography>
    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
      This app allows you to browse Rick and Morty characters, view detailed
      information about each character, and switch between light and dark modes.
    </Typography>
  </Container>
);

export default About;
