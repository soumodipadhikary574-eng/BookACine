import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminid: adminId, password }),  // ✅ FIXED
    });

    const result = await response.text();

    if (result === "Login successful") {  // ✅ FIXED
      alert("Welcome Admin!");
      navigate("/AdminHome");
    } else {
      alert(result); // Show backend error directly
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Try again later.");
  }
};


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container sx={{ width: "90%", maxWidth: 1000, height: "80vh", boxShadow: 3 }}>
        {/* Left Panel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            BookACine
          </Typography>
          <Typography variant="h6" textAlign="center">
            Your Ultimate Cinema Booking Experience
          </Typography>
        </Grid>

        {/* Right Panel - Login Form */}
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box sx={{ width: "80%", maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom fontWeight="600" textAlign="center">
              Admin Login
            </Typography>

            <TextField
              fullWidth
              label="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.5, backgroundColor: "#203a43" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLogin;