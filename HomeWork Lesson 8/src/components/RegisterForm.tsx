import React from "react";
import { registerUser } from "../api/userActions";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      await registerUser(username, password);
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
      <Typography variant="h5">Register</Typography>
      <Box sx={{ m: 1 }} />
      {error && <Alert severity="error">{error}</Alert>}
      <TextField name="username" label="Username" fullWidth required />
      <Box sx={{ m: 1 }} />
      <TextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Register
      </Button>
      <Button onClick={() => navigate("/login")} sx={{ mt: 2, ml: 2 }}>
        Already have an account? Login
      </Button>
    </Box>
  );
};

export default RegisterForm;
