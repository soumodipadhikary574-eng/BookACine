import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    organization: "",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Success
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false); // Error
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, contact, organization, message } = formData;
    if (!fullName || !email || !contact || !organization || !message) {
      setSnackbarErrorMessage("Please fill in all fields.");
      setSnackbarErrorOpen(true);
      return;
    }

    try {
      // Make POST request to your backend API endpoint
      // Change URL to your actual backend endpoint
      await axios.post("http://localhost:8080/api/contactus/add", formData);

      // If successful
      setSnackbarOpen(true);
      setFormData({ fullName: "", email: "", contact: "", organization: "", message: "" });
    } catch (error) {
      // If error returned from backend
      const errMsg =
        error.response?.data?.message || "Failed to submit message. Please try again later.";
      setSnackbarErrorMessage(errMsg);
      setSnackbarErrorOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseErrorSnackbar = () => {
    setSnackbarErrorOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url("https://www.bookachange.org/wp-content/themes/book-a-change/images/Flower-pattern-2.png")`,
        backgroundColor: "rgb(22, 24, 28)",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "rgb(22, 23, 25)", boxShadow: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>
              BookACine
            </Typography>
          </Box>
          
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          py: 10,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" align="center" fontWeight={700} color="#fff" gutterBottom>
          Send Us A Message
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#f6eddc",
            p: 4,
            borderRadius: 0,
            border: "10px solid transparent",
            borderImage:
              "linear-gradient(to right, #f3444a, #f3444a 30%, #6c257e, #ebc505, #ebc505) 1",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(),
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                variant="standard"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="contact"
                label="Contact No."
                variant="standard"
                value={formData.contact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email Id"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="organization"
                label="Name Of Your Organization"
                variant="standard"
                value={formData.organization}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              fullWidth
              name="message"
              label="Your Message"
              multiline
              rows={4}
              variant="outlined"
              value={formData.message}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#F84464", textTransform: "none", px: 4, py: 1.5 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity="success" onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          Message submitted successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={snackbarErrorOpen} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
        <Alert severity="error" onClose={handleCloseErrorSnackbar} sx={{ width: "100%" }}>
          {snackbarErrorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;