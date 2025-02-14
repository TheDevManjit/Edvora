import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import SignUpLogo from "../assets/img/signup.svg";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
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
      const response = await axios.post(
        "http://localhost:4001/api/v1/user/signup",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.error;
        if (error.response.status === 400) {
          setError("Please enter all required fields.");
        } else if (error.response.status === 401) {
          setError(errorMsg);
        } else if (error.response.status === 402) {
          setError("User already exists.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="gray.100"
      p={6}
    >
      <Grid
        item
        md={6}
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="img"
          src={SignUpLogo}
          alt="Signup Illustration"
          // width="80%"
          maxWidth={500}
          height="auto"
          borderRadius={2}
        />
      </Grid>
      <Grid item md={6} xs={12} display="flex" justifyContent="center">
        <Card sx={{ p: 4, width: "90%", maxWidth: 500 }}>
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Sign Up
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstname"
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography variant="body1" align="center" gutterBottom pt={1}>
              if you Have alredy Account{" "}
              <span style={{ color: "blue" }}>Login</span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
