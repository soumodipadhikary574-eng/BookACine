// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SeatSelection = ({ onBook }) => {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/seats')
//       .then(res => setSeats(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const toggleSeat = (seatId) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   const handleBooking = () => {
//     onBook(selectedSeats);
//   };

//   return (
//     <div>
//       <h3>Select Seats</h3>
//       <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px' }}>
//         {seats.map(seat => (
//           <div key={seat.id}
//             onClick={() => !seat.booked && toggleSeat(seat.id)}
//             style={{
//               width: '40px', height: '40px', margin: '5px',
//               backgroundColor: seat.booked ? 'gray' : (selectedSeats.includes(seat.id) ? 'green' : 'lightblue'),
//               textAlign: 'center', lineHeight: '40px', cursor: seat.booked ? 'not-allowed' : 'pointer'
//             }}>
//             {seat.id}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleBooking} disabled={selectedSeats.length === 0}>Book Now</button>
//     </div>
//   );
// };

// export default SeatSelection;
