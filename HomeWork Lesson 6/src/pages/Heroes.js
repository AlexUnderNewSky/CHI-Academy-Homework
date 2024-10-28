import React from "react";
import CharacterTable from "../components/CharacterTable";
import { Container, Typography } from "@mui/material";

const Heroes = ({ darkMode }) => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Rick and Morty Characters
    </Typography>
    <CharacterTable darkMode={darkMode} /> 
  </Container>
);

export default Heroes;
