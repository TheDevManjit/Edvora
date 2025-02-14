import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TextField, Button, Card, CardContent, Typography, Grid, Box } from "@mui/material";
import LoginLogo from "../assets/img/login.svg";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:4001/api/v1/user/login", formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="gray.100" p={4}>
      <Grid item md={6} sm={12} display="flex" justifyContent="center" alignItems="center">
        <Box component="img" src={LoginLogo} alt="Login Illustration" width="80%" height="auto" borderRadius={2}  />
      </Grid>
      <Grid item md={6} sm={12} display="flex" justifyContent="center">
        <Card sx={{ p: 4, boxShadow: 3, width: "90%", maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h5" align="center" color="primary" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField fullWidth label="Email" name="email" type="email" required onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Password" name="password" type="password" required onChange={handleChange} /></Grid>
                <Grid item xs={12}><Button type="submit" variant="contained" color="primary" fullWidth>Login</Button></Grid>
              </Grid>
            </form>
            <Typography variant="body1" align="center" gutterBottom pt={1}>
              if you Don`t Have Account{" "}
              <span style={{ color: "blue" }}>Sign Up</span>
            </Typography>
            <Typography align="center" mt={2}>
              <a href="/forgot-password" style={{ color: "#1976d2", textDecoration: "none" }}>Forgot Password?</a>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
