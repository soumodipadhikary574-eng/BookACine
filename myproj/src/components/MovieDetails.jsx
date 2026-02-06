import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Stack,
  Divider,
} from "@mui/material";
// import Homefoot from "./Homefoot";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  if (!movie) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error" fontWeight="bold">
          Movie not found or missing data.
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3, px: 4, py: 1.5, fontWeight: 'bold' }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Card
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "#fafafa",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: 300 },
            height: { xs: 300, md: 450 },
            objectFit: "cover",
          }}
          image={movie.imageUrl || movie.image}
          alt={movie.title}
        />
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Typography variant="h3" gutterBottom color="error" fontWeight="bold">
            {movie.title}
          </Typography>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Language: {movie.language}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Typography variant="body1">
              <strong>Genre:</strong> {movie.genre || "Drama"}
            </Typography>
            <Typography variant="body1">
              <strong>Release Date:</strong> {movie.releaseDate || "2025-01-01"}
            </Typography>
            <Typography variant="body1">
              <strong>Duration:</strong> {movie.duration || "2h 15min"}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {movie.description || " A captivating film with drama, emotion, and engaging moments that leave a lasting impression."}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 4 }}
            justifyContent="flex-start"
          >
            <Button
              variant="outlined"
              color="error"
              size="large"
              sx={{ px: 4, fontWeight: 'bold' }}
              onClick={() => navigate("/home")}
            >
              Back to Home
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{ px: 4, fontWeight: 'bold' }}
              onClick={() => navigate("/Showtime")}
            >
              Book Tickets
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ mt: 6 }}>
        {/* <Homefoot /> */}
      </Box>
    </Container>
  );
};

export default MovieDetails;