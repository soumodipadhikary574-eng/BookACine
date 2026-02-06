import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (step === 2 && resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled, step]);

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/send-otp', { email });
      setStep(2);
      setCountdown(30);
      setResendDisabled(true);
      setAlert({ open: true, message: 'OTP sent to your email!', severity: 'success' });
    } catch (error) {
      const msg =
        error.response?.status === 400
          ? error.response.data
          : 'Failed to send OTP.';
      setAlert({ open: true, message: msg, severity: 'error' });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/verify-otp', {
        email,
        otp,
      });
      if (res.data === true) {
        setAlert({ open: true, message: 'Login successful!', severity: 'success' });
        navigate('/home');
      } else {
        setAlert({ open: true, message: 'Invalid OTP.', severity: 'error' });
      }
    } catch (error) {
      setAlert({ open: true, message: 'Verification failed.', severity: 'error' });
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/send-otp', { email });
      setCountdown(30);
      setResendDisabled(true);
      setAlert({ open: true, message: 'OTP resent to your email!', severity: 'info' });
    } catch (error) {
      setAlert({ open: true, message: 'Failed to resend OTP.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 6,
          width: '100%',
          background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
          boxShadow: '0px 12px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: '#1a237e',
            letterSpacing: 1,
            mb: 4,
          }}
        >
          {step === 1 ? 'Email Login' : 'Enter OTP'}
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={step === 2}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        />

        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              margin="normal"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
              }}
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="success"
                onClick={handleVerifyOtp}
                sx={{
                  width: '48%',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '15px',
                  backgroundColor: '#388e3c',
                  '&:hover': { backgroundColor: '#2e7d32' },
                }}
              >
                Verify OTP
              </Button>
              <Button
                variant="outlined"
                onClick={handleResendOtp}
                disabled={resendDisabled}
                sx={{
                  width: '48%',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  textTransform: 'none',
                  color: '#f57c00',
                  borderColor: '#f57c00',
                  '&:hover': {
                    borderColor: '#ef6c00',
                    backgroundColor: '#fff3e0',
                  },
                }}
              >
                {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </Button>
            </Box>
          </>
        )}

        {step === 1 && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'none',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#115293' },
            }}
            onClick={handleSendOtp}
            disabled={!email}
          >
            Send OTP
          </Button>
        )}

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default LoginPage;
