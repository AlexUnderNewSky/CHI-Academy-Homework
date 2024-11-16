'use client';

import React from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../api/userActions";
import Link from "next/link";

const validationSchema = Yup.object({
  username: Yup.string()
    .max(12, "Must be 12 characters or less")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be 12 characters or less")
    .required("Password is required"),
});

const RegisterForm: React.FC = () => {
  const [error, setError] = React.useState<string>("");

  const handleRegister = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await registerUser(values.username, values.password);
      <Link href="/login">Login</Link>
    } catch (error) {
      console.log(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      <Form>
        <Typography variant="h5">Register</Typography>
        <Box sx={{ m: 1 }} />
        {error && <Alert severity="error">{error}</Alert>}

        <Field
          name="username"
          as={TextField}
          label="Username"
          fullWidth
          required
        />
        <ErrorMessage name="username" component="div" />

        <Box sx={{ m: 1 }} />

        <Field
          name="password"
          as={TextField}
          label="Password"
          type="password"
          fullWidth
          required
        />
        <ErrorMessage name="password" component="div" />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <Link href="/login">
        <Button sx={{ mt: 2, ml: 2 }}>
          Already have an account? Login
        </Button>
        </Link>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
