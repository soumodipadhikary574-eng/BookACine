import React from 'react';
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Button,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText
} from '@mui/material';

const priceOptions = ['₹0–100', '₹101–200', '₹201–300', '₹301+'];
const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

export default function MovieShowtimes() {
  const [selectedPrices, setSelectedPrices] = React.useState([]);
  const [selectedTimes, setSelectedTimes] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handlePriceChange = (e) => setSelectedPrices(e.target.value);
  const handleTimeChange = (e) => setSelectedTimes(e.target.value);

  const navigate = useNavigate();

  const formatDateLabel = (date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const next7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const isPriceInSelectedRange = (price) => {
    if (selectedPrices.length === 0) return true;
    return selectedPrices.some(range => {
      if (range === '₹0–100') return price <= 100;
      if (range === '₹101–200') return price > 100 && price <= 200;
      if (range === '₹201–300') return price > 200 && price <= 300;
      if (range === '₹301+') return price > 300;
      return false;
    });
  };

  const isTimeInSelectedRange = (timeStr) => {
    if (selectedTimes.length === 0) return true;
    const parseTime = (t) => {
      const [time, meridian] = t.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (meridian === 'PM' && hours !== 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;
      return hours + minutes / 60;
    };
    const hour = parseTime(timeStr);
    return selectedTimes.some(range => {
      if (range === 'Morning') return hour >= 6 && hour < 12;
      if (range === 'Afternoon') return hour >= 12 && hour < 16;
      if (range === 'Evening') return hour >= 16 && hour < 20;
      if (range === 'Night') return hour >= 20 && hour <= 23.99;
      return false;
    });
  };

  const theaters = [
    {
      name: 'INOX: South City, Kolkata',
      cancel: true,
      image: 'https://via.placeholder.com/150',
      language: 'Hindi',
      times: [
        { time: '08:30 AM', price: 120 },
        { time: '01:00 PM', price: 220 },
        { time: '03:30 PM', price: 180 },
        { time: '08:00 PM', price: 250 },
        { time: '09:35 PM', price: 280 },
        { time: '10:30 PM', price: 180 },
        { time: '11:00 PM', price: 200 }
      ]
    },
    {
      name: 'PVR: Diamond Plaza, Jessore Kolkata',
      cancel: true,
      image: 'https://via.placeholder.com/150',
      language: 'Hindi',
      times: [
        { time: '09:00 AM', price: 90 },
        { time: '10:30 AM', price: 110 },
        { time: '12:00 PM', price: 160 },
        { time: '03:30 PM', price: 180 },
        { time: '07:00 PM', price: 300 },
        { time: '09:45 PM', price: 350 }
      ]
    }
  ];

  const handleShowClick = (theater, slot) => {
    navigate("/SeatLayoutComponent", {
  state: {
    date: selectedDate.toDateString(),
    time: slot.time,
    hall: theater.name,
    price: slot.price,
    movie: {
      title: 'Sample Movie',
      language: theater.language,
      image: theater.image,
    }
  }
});
  };

  return (
    <Box sx={{ p: 4, fontFamily: 'sans-serif' }}>
      <Typography variant="h4" gutterBottom>
        Book Your Show
      </Typography>

      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, mb: 3 }}>
        {next7Days.map((date, index) => (
          <Button
            key={index}
            onClick={() => setSelectedDate(date)}
            variant={selectedDate.toDateString() === date.toDateString() ? 'contained' : 'outlined'}
            sx={{ minWidth: 100, flexShrink: 0 }}
          >
            {formatDateLabel(date)}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl size="small">
          <InputLabel>Language</InputLabel>
          <Select defaultValue="Hindi - 2D" label="Language">
            <MenuItem value="Hindi - 2D">Hindi - 2D</MenuItem>
            <MenuItem value="English - 2D">English - 2D</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Price Range</InputLabel>
          <Select
            multiple
            value={selectedPrices}
            onChange={handlePriceChange}
            label="Price Range"
            renderValue={(selected) => selected.length > 0 ? selected.join(', ') : 'Any'}
          >
            {priceOptions.map((price) => (
              <MenuItem key={price} value={price}>
                <Checkbox checked={selectedPrices.includes(price)} />
                <ListItemText primary={price} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Preferred Time</InputLabel>
          <Select
            multiple
            value={selectedTimes}
            onChange={handleTimeChange}
            label="Preferred Time"
            renderValue={(selected) => selected.length > 0 ? selected.join(', ') : 'Any'}
          >
            {timeOptions.map((timeSlot) => (
              <MenuItem key={timeSlot} value={timeSlot}>
                <Checkbox checked={selectedTimes.includes(timeSlot)} />
                <ListItemText primary={timeSlot} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        {theaters.map((theater, index) => {
          const filteredTimes = theater.times.filter(
            (slot) =>
              isPriceInSelectedRange(slot.price) &&
              isTimeInSelectedRange(slot.time)
          );

          if (filteredTimes.length === 0) return null;

          return (
            <Grid item xs={12} key={index}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {theater.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  {theater.cancel && <Chip label="Cancellation available" color="info" size="small" />}
                  <Chip label="M-Ticket" size="small" />
                  <Chip label="Food & Beverage" size="small" />
                  <Chip label="LAN" variant="outlined" size="small" />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {filteredTimes.map((slot, i) => {
                    const buttonColor = slot.price > 200 ? 'warning' : 'success';
                    return (
                      <Button
                        onClick={() => handleShowClick(theater, slot)}
                        variant="outlined"
                        color={buttonColor}
                        key={i}
                        sx={{ minWidth: 100 }}
                      >
                        {slot.time}
                      </Button>
                    );
                  })}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}