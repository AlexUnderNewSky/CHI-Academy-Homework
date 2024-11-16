'use client';

import React from "react";
import Link from "next/link";  // Используем Link из Next.js
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api/userActions";  // Функция для логина

const LoginForm: React.FC = () => {
  const [error, setError] = React.useState<string>("");

  const validationSchema = Yup.object({
    username: Yup.string().max(12, "Must be 12 characters or less").required("Required"),
    password: Yup.string().max(12, "Must be 12 characters or less").required("Required"),
  });

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const token = await loginUser(values.username, values.password);
      localStorage.setItem("token", token.access_token);  // Сохраняем токен в localStorage
      window.location.href = "/exhibits";  // Перенаправляем на главную страницу после успешного логина
    } catch (error) {
      console.log(error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <Typography variant="h5" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12}}>Login</Typography>
        <Box sx={{ m: 1 }} />
        {error && <Alert severity="error">{error}</Alert>}
        <Field name="username" as={TextField} label="Username" fullWidth required />
        <ErrorMessage name="username" component="div" />
        <Box sx={{ m: 1 }} />
        <Field name="password" as={TextField} label="Password" type="password" fullWidth required />
        <ErrorMessage name="password" component="div" />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>

        {/* Используем Link из Next.js для перехода на страницу регистрации */}
        <Link href="/register" passHref>
          <Button sx={{ ml: 2, mt: 2 }}>
            Register
          </Button>
        </Link>
      </Form>
    </Formik>
  );
};

export default LoginForm;
