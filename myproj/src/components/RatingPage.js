import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Rating, // Import Rating component
  Snackbar,
  Alert,
  AppBar, // Added for consistent navbar
  Toolbar, // Added for consistent navbar
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star'; // Import StarIcon for custom labels

const RatingPage = () => {
  const [rating, setRating] = useState(0); // State for the star rating
  const [review, setReview] = useState(""); // State for the review text
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setSnackbarMessage("Please provide a star rating.");
      setSnackbarErrorOpen(true);
      return;
    }

    if (review.trim() === "") {
      setSnackbarMessage("Please write a review.");
      setSnackbarErrorOpen(true);
      return;
    }

    // Simulate submission
    console.log("Submitting Rating:", rating);
    console.log("Submitting Review:", review);

    setSnackbarMessage("Thank you for your rating and review!");
    setSnackbarOpen(true);

    // Clear form after submission
    setRating(0);
    setReview("");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarErrorOpen(false);
  };

  // Placeholder GIF URL - replace with your desired GIF
  const movieGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG1tY293b3V3Z2N5a2R6Z2d3bW84N25hY3NsaW11a2J6Z3Zlb2V0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYEqEzwN6Of8PBK/giphy.gif";

  return (
    <Box sx={{ backgroundColor: "#0F0F0F", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "rgb(22, 23, 25)", boxShadow: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: "#fff" }}>
            BookACine
          </Typography>
          <Box display="flex" gap={3}>
            <Typography variant="body1" sx={{ color: "#fff", cursor: "pointer" }}>Home</Typography>
            <Typography variant="body1" sx={{ color: "#fff", cursor: "pointer" }}>Movies</Typography>
            <Typography variant="body1" sx={{ color: "#F84464", cursor: "pointer", fontWeight: 600 }}>Rate Movie</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Container */}
      <Container
        maxWidth="md"
        sx={{
          py: 8,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" align="center" fontWeight={700} color="#fff" gutterBottom>
          Rate Your Movie Experience
        </Typography>

        {/* GIF Display */}
        <Box sx={{ my: 4, width: '100%', maxWidth: '400px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          <img
            src={movieGif}
            alt="Movie related GIF"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/cccccc/333333?text=GIF+Not+Found"; }}
          />
        </Box>

        {/* Rating Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#f6eddc",
            p: 4,
            borderRadius: '8px', // Rounded corners for the form
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)', // Subtle shadow
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3, // Spacing between form elements
          }}
        >
          <Typography variant="h6" color="#333" gutterBottom>
            How would you rate this movie?
          </Typography>
          <Rating
            name="movie-rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            sx={{
              fontSize: '3rem', // Larger stars
              color: '#FFD700', // Gold color for filled stars
              '& .MuiRating-iconEmpty': {
                color: '#ccc', // Lighter color for empty stars
              },
              justifyContent: 'center', // Center the stars
            }}
          />

          <TextField
            fullWidth
            name="review"
            label="Write your review"
            multiline
            rows={4}
            variant="outlined"
            value={review}
            onChange={handleReviewChange}
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#F84464",
              textTransform: "none",
              px: 4,
              py: 1.5,
              mt: 2, // Margin top for spacing
              alignSelf: 'center', // Center the button within the flex container
              '&:hover': {
                backgroundColor: '#e03a5b', // Darker shade on hover
              },
            }}
          >
            Submit Rating
          </Button>
        </Box>
      </Container>

      {/* Snackbar for success messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity="success" onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar for error messages */}
      <Snackbar open={snackbarErrorOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity="error" onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RatingPage;