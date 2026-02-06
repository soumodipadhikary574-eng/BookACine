import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // 👉 import useNavigate

const ProductRegisterForm = () => {
  const [product, setProduct] = useState({
    name: '',
    email: '',
    password: '',
    phno: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate(); // 👉 create navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setShowPassword(value.length > 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    try {
      const res = await axios.post('http://localhost:8080/api/test/add', product);
      setMessage(res.data.message || 'User registered successfully!');
      setProduct({ email: '', name: '', phno: '', password: '' });
      setShowPassword(false);

      // 👉 Redirect to Login page after 2 seconds
      setTimeout(() => {
        navigate('/login'); // this will redirect to the Login page
      }, 2000);
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || 'User registration failed.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          borderRadius: 4,
          bgcolor: '#0f172a',
          color: '#e0f2fe',
          boxShadow: '0 8px 24px rgba(0, 255, 255, 0.2)'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#67e8f9',
            fontWeight: 700,
            letterSpacing: 1
          }}
        >
          User Registration
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {['email', 'name', 'phno', 'password'].map((field, index) => (
            <TextField
              key={index}
              label={
                field === 'phno' ? 'Phone Number' :
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              name={field}
              type={field === 'password' ? (showPassword ? 'password' : 'text') : (field === 'phno' ? 'number' : 'text')}
              fullWidth
              margin="normal"
              required
              value={product[field]}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#94a3b8' } }}
              InputProps={{
                style: {
                  color: '#e0f2fe',
                  backgroundColor: '#1e293b',
                  borderRadius: '8px'
                }
              }}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: 3,
              backgroundColor: '#06b6d4',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0891b2',
                boxShadow: '0 4px 20px rgba(6,182,212,0.4)'
              }
            }}
          >
            Register
          </Button>

          {message && (
            <Alert
              severity={error ? 'error' : 'success'}
              sx={{
                mt: 3,
                bgcolor: error ? '#fecaca' : '#bbf7d0',
                color: error ? '#991b1b' : '#166534',
                fontWeight: 500,
                borderRadius: 2
              }}
            >
              {message}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductRegisterForm;
