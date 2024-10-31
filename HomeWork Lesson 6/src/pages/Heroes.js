import React from "react";
import CharacterTable from "../components/CharacterTable";
import { Container, Typography, Drawer } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Heroes = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHeroDetailRoute = /^\/heroes\/\d+$/.test(location.pathname);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Rick and Morty Characters
      </Typography>
      <CharacterTable darkMode={darkMode} />

      <Drawer
        anchor="right"
        open={isHeroDetailRoute}
        onClose={() => navigate("/heroes")}
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            width: "345px",
            boxSizing: "border-box",
            padding: "20px",
          },
        }}
      >
        <Outlet />
      </Drawer>
    </Container>
  );
};

export default Heroes;
