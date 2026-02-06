import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Divider
} from "@mui/material";
import ChairIcon from '@mui/icons-material/Chair';
import { useNavigate, useLocation } from "react-router-dom";

const rows = ['A', 'B', 'C', 'D'];
const seatsPerRow = 20;

export default function SeatLayoutComponent() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    hall = "Hall Name",
    date = "Date",
    time = "Time",
    price = 210,
    movie = {}
  } = location.state || {};

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}${seat}`;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handlePayNow = () => {
    const total = selectedSeats.length * price;

    // Navigate to Food and Beverage page with data
    navigate("/FoodandBeverageSelection", {
      state: {
        seats: selectedSeats,
        totalPrice: total,
        movie,
        selectedDate: date,
        selectedTime: time,
        hallName: hall
      }
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Select Your Seats
      </Typography>

      <Box textAlign="center" mb={2}>
        <Typography variant="subtitle1">{movie?.title || "Movie Title"}</Typography>
        <Typography variant="body2">{hall} | {date} | {time}</Typography>
        <Typography variant="body2">₹{price} per ticket</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {rows.map((row) => (
        <Grid container spacing={1} justifyContent="center" key={row}>
          <Grid item><Typography variant="subtitle1">{row}</Typography></Grid>
          {[...Array(seatsPerRow)].map((_, index) => {
            const seatNumber = index + 1;
            const seatId = `${row}${seatNumber}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
              <Grid item key={seatId}>
                <Button
                  onClick={() => handleSeatClick(row, seatNumber)}
                  sx={{
                    minWidth: 36,
                    height: 36,
                    color: isSelected ? "white" : "#555",
                    bgcolor: isSelected ? "green" : "#f5f5f5",
                    borderRadius: 1,
                    padding: 0,
                    '&:hover': {
                      bgcolor: isSelected ? "darkgreen" : "#e0e0e0",
                    },
                  }}
                >
                  <ChairIcon fontSize="small" />
                </Button>
              </Grid>
            );
          })}
        </Grid>
      ))}

      <Box mt={4} textAlign="center">
        <Typography variant="h6" gutterBottom>
          Tickets Selected: {selectedSeats.length} | Total: ₹{selectedSeats.length * price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayNow}
          disabled={selectedSeats.length === 0}
        >
          Continue to Food
        </Button>
      </Box>
    </Box>
  );
}