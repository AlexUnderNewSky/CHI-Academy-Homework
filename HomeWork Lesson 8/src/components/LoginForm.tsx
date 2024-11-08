import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/userActions";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { login } from "../store/slices/userSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const token = await loginUser(username, password);
      localStorage.setItem("token", token.access_token);
      dispatch(login(token.access_token));
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
      <Typography variant="h5">Login</Typography>
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
        Login
      </Button>
      <Button onClick={() => navigate("/register")} sx={{ ml: 2, mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default LoginForm;
