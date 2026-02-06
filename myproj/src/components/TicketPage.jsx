// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Container,
//   Grid,
//   Paper,
//   Divider,
// } from '@mui/material';

// const TicketPage = () => {
//   const location = useLocation();

//   const {
//     movie = {},
//     selectedSeats = [],
//     ticketTotal = 0,
//     foodItems = [],
//     foodTotal = 0,
//     selectedDate = '',
//     selectedTime = '',
//     hallName = '',
//   } = location.state || {};

//   const convenienceFee = 94.4;
//   const totalAmount = ticketTotal + convenienceFee + foodTotal;

//   return (
//     <Container maxWidth="md" sx={{ my: 5 }}>
//       <Paper
//         elevation={10}
//         sx={{
//           borderRadius: '20px',
//           overflow: 'hidden',
//           bgcolor: '#f9f9fb',
//           color: '#333',
//           position: 'relative',
//           p: 4,
//           boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
//           border: '1px solid #e0e0e0',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold">
//             🎟️ Movie Ticket
//           </Typography>
//           {/* <Typography variant="subtitle2" sx={{ color: '#777' }}>
//             Ticket No: 00000000
//           </Typography> */}
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={6}>
//             {/* <Typography variant="subtitle1">🎬 Movie</Typography>
//             <Typography variant="h6" fontWeight="bold">
//               {movie.title || 'Untitled Movie'}
//             </Typography> */}

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🏢 Theater
//             </Typography>
//             <Typography variant="body1">{hallName || 'N/A'}</Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🪑 Seats
//             </Typography>
//             <Typography variant="body1">
//               {selectedSeats.join(', ') || 'None'}
//             </Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🎟️ No. of Tickets
//             </Typography>
//             <Typography variant="body1">{selectedSeats.length}</Typography>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1">📅 Date</Typography>
//             <Typography variant="body1">{selectedDate || 'N/A'}</Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🕒 Time
//             </Typography>
//             <Typography variant="body1">{selectedTime || 'N/A'}</Typography>

           
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Box sx={{ textAlign: 'center' }}>
//           <Typography variant="body2" sx={{ color: '#999' }}>
//             Thank you for booking with us. Enjoy your movie! 🍿
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default TicketPage;







// import React, { useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Box, Typography, Container, Grid, Paper, Divider, Button
// } from '@mui/material';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const TicketPage = () => {
//   const location = useLocation();
//   const ticketRef = useRef();  // ⬅️ reference for the ticket content

//   const {
//     movie = {},
//     selectedSeats = [],
//     ticketTotal = 0,
//     foodItems = [],
//     foodTotal = 0,
//     selectedDate = '',
//     selectedTime = '',
//     hallName = '',
//   } = location.state || {};

//   const convenienceFee = 94.4;
//   const totalAmount = ticketTotal + convenienceFee + foodTotal;

//   // ⬇️ Function to download PDF
//   const handleDownload = () => {
//     const input = ticketRef.current;

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('ticket.pdf');
//     });
//   };

//   return (
//     <Container maxWidth="md" sx={{ my: 5 }}>
//       {/* ✅ Download PDF Button */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//         <Button variant="contained" color="primary" onClick={handleDownload}>
//           Download PDF
//         </Button>
//       </Box>

//       <Paper
//         elevation={10}
//         sx={{
//           borderRadius: '20px',
//           overflow: 'hidden',
//           bgcolor: '#f9f9fb',
//           color: '#333',
//           position: 'relative',
//           p: 4,
//           boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
//           border: '1px solid #e0e0e0',
//         }}
//         ref={ticketRef} // ⬅️ this section will be captured in PDF
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold">
//             🎟️ Movie Ticket
//           </Typography>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🏢 Theater
//             </Typography>
//             <Typography variant="body1">{hallName || 'N/A'}</Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🪑 Seats
//             </Typography>
//             <Typography variant="body1">
//               {selectedSeats.join(', ') || 'None'}
//             </Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🎟️ No. of Tickets
//             </Typography>
//             <Typography variant="body1">{selectedSeats.length}</Typography>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="subtitle1">📅 Date</Typography>
//             <Typography variant="body1">{selectedDate || 'N/A'}</Typography>

//             <Typography variant="subtitle1" sx={{ mt: 2 }}>
//               🕒 Time
//             </Typography>
//             <Typography variant="body1">{selectedTime || 'N/A'}</Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Box sx={{ textAlign: 'center' }}>
//           <Typography variant="body2" sx={{ color: '#999' }}>
//             Thank you for booking with us. Enjoy your movie! 🍿
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default TicketPage;






import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box, Typography, Container, Grid, Paper, Divider, Button
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const TicketPage = () => {
  const location = useLocation();
  const ticketRef = useRef();

  const {
    movie = {},
    selectedSeats = [],
    ticketTotal = 0,
    foodItems = [],
    foodTotal = 0,
    selectedDate = '',
    selectedTime = '',
    hallName = '',
  } = location.state || {};

  const convenienceFee = 94.4;
  const totalAmount = ticketTotal + convenienceFee + foodTotal;

  // ✅ Save ticket to backend on first render
  useEffect(() => {
    const saveTicket = async () => {
      try {
        await axios.post('http://localhost:8080/api/tickets', {
          movieTitle: movie.title || 'Untitled Movie',
          hallName: hallName,
          selectedSeats: selectedSeats.join(', '),
          numberOfTickets: selectedSeats.length,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          ticketTotal: ticketTotal,
          foodItems: foodItems.map(item => `${item.name} x${item.quantity}`).join(', '),
          foodTotal: foodTotal,
          convenienceFee: convenienceFee,
          totalAmount: totalAmount
        });
        console.log("🎫 Ticket saved successfully!");
      } catch (error) {
        console.error("Error saving ticket:", error);
      }
    };

    saveTicket();
  }, []);

  const handleDownload = () => {
    const input = ticketRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ticket.pdf');
    });
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download PDF
        </Button>
      </Box>

      <Paper
        elevation={10}
        sx={{
          borderRadius: '20px',
          overflow: 'hidden',
          bgcolor: '#f9f9fb',
          color: '#333',
          position: 'relative',
          p: 4,
          boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
          border: '1px solid #e0e0e0',
        }}
        ref={ticketRef}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">🎟️ Movie Ticket</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>🏢 Theater</Typography>
            <Typography variant="body1">{hallName || 'N/A'}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>🪑 Seats</Typography>
            <Typography variant="body1">{selectedSeats.join(', ') || 'None'}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>🎟️ No. of Tickets</Typography>
            <Typography variant="body1">{selectedSeats.length}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">📅 Date</Typography>
            <Typography variant="body1">{selectedDate || 'N/A'}</Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>🕒 Time</Typography>
            <Typography variant="body1">{selectedTime || 'N/A'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Thank you for booking with us. Enjoy your movie! 🍿
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TicketPage;
