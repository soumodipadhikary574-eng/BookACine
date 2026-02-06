import { Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  Box
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // Fetch user data
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/test/view");
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user by ID
  const deleteUserData = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/test/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, margin: 'auto', mt: 6, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#0d47a1', fontWeight: '700', letterSpacing: 1 }}
      >
        User List
      </Typography>

      <Button
        variant="outlined"
        onClick={() => navigate('/adminhome')}
        sx={{
          mb: 2,
          borderColor: '#0d47a1',
          color: '#0d47a1',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: '#0d47a1',
            color: '#fff',
            borderColor: '#0d47a1'
          }
        }}
      >
        Back
      </Button>

      <TableContainer component={Paper} sx={{
        boxShadow: '0 8px 24px rgba(13, 129, 123, 0.3)',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#0d47a1' }}>
            <TableRow>
              {['ID', 'Name', 'Email', 'Phno', 'Password', 'Actions'].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((u) => (
              <TableRow key={u.id} hover sx={{ cursor: 'default' }}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phno}</TableCell>
                <TableCell>{u.password}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteUserData(u.id)}
                    color="error"
                    variant="outlined"
                    sx={{
                      fontWeight: '600',
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
