import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, Dialog, DialogTitle, DialogActions, Paper, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TicketViewPage = () => {
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    axios.get('http://localhost:8080/api/tickets')
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/api/tickets/${selectedId}`)
      .then(() => {
        setOpenDialog(false);
        fetchTickets();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '40px', background: '#f9f9f9', minHeight: '100vh' }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate('/AdminHome')}
        style={{ marginBottom: '20px', fontWeight: 'bold', color: '#0d47a1', borderColor: '#0d47a1' }}
      >
        BACK
      </Button>

      {/* Heading */}
      <Typography
        variant="h5"
        style={{
          color: '#0d47a1',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
         Booked Tickets List
      </Typography>

      <Paper elevation={3} style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#0d47a1' }}>
            <TableRow>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Hall Name</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>SeatNo</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.hallName}</TableCell>
                <TableCell>{ticket.selectedSeats}</TableCell>
                <TableCell>{ticket.selectedDate}</TableCell>
                <TableCell>{ticket.selectedTime}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ fontWeight: 'bold' }}
                    onClick={() => handleDelete(ticket.id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TicketViewPage;
