import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/userActions";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../store/slices/userSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const validationSchema = Yup.object({
    username: Yup.string().max(12, "Must be 12 characters or less").required("Required"),
    password: Yup.string().max(12, "Must be 12 characters or less").required("Required"),
  });

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const token = await loginUser(values.username, values.password);
      localStorage.setItem("token", token.access_token);
      dispatch(login(token.access_token));
      navigate("/");
    } catch (error) {
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
        <Typography variant="h5">Login</Typography>
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
        <Button onClick={() => navigate("/register")} sx={{ ml: 2, mt: 2 }}>
          Register
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
