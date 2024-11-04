import React from "react";
import ExhibitList from "../components/ExhibitList";
import { Container } from "@mui/material";

const ExhibitPage: React.FC = () => {
  return (
    <Container>
      <ExhibitList />
    </Container>
  );
};

export default ExhibitPage;
