import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
