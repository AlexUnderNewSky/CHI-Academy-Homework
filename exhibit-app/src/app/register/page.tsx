'use client';

import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Container } from "@mui/material";

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
