
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import TermsModal from './TermsModal';

const items = [
  { id: 1, name: "Combo 2 (Cheese)", description: "Cheese Popcorn 190 g + 2 Coke", price: 1050, image: "🍿🥤" },
  { id: 2, name: "Combo 2 (Caramel)", description: "Caramel Popcorn 180 g + 2 Coke", price: 960, image: "🍿🥤" },
  { id: 3, name: "Regular Cheese Popcorn 90g", description: "423 kcal", price: 360, image: "🍿" },
  { id: 4, name: "Medium Salted Popcorn 180g", description: "849 kcal", price: 510, image: "🍿" }
];

function FoodAndBeverage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    seats: selectedSeats = [],
    totalPrice: ticketTotal = 0,
    movie = {},
    selectedDate = null,
    selectedTime = null,
    hallName = null,
  } = location.state || {};

  const [cart, setCart] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleAdd = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemove = (item) => {
    setCart((prev) => {
      if (!prev[item.id]) return prev;
      const newQty = prev[item.id] - 1;
      if (newQty <= 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item.id]: newQty };
    });
  };

  const getTotal = () =>
    Object.entries(cart).reduce((total, [id, qty]) => {
      const item = items.find((i) => i.id === parseInt(id));
      return total + item.price * qty;
    }, 0);

  const handleAgreeTerms = async () => {
    const selectedFoodItems = Object.entries(cart).map(([id, qty]) => {
      const item = items.find(i => i.id === parseInt(id));
      return { ...item, qty };
    });

    const totalAmount = ticketTotal + 94.4 + getTotal();

    try {
      const res = await fetch('http://localhost:8080/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount })
      });

      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();

      const options = {
        key: "rzp_test_mufoltUfznOxOQ",
        amount: data.amount,
        currency: data.currency,
        name: "BookACine",
        description: "Movie & Food Payment",
        order_id: data.id,
        handler: async function (response) {
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            amount: totalAmount,
            paymentMethod: "card",
            status: "success",
            movieName: movie.title,
            seats: selectedSeats.join(", "),
            foodItems: selectedFoodItems.map(f => `${f.name} (x${f.qty})`).join(", "),
            date: selectedDate,
            time: selectedTime,
            hall: hallName,
          };

          try {
            await fetch("http://localhost:8080/save-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentData),
            });
          } catch (error) {
            console.error("Data save failed:", error);
            alert("Payment done, but saving info failed.");
          }

          navigate("/TicketPage", {
            state: {
              movie,
              selectedDate,
              selectedTime,
              hallName,
              selectedSeats,
              selectedFoodItems,
              foodTotal: getTotal(),
              ticketTotal: ticketTotal,
            },
          });
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Order Error:", err);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1 style={{ textAlign: "center" }}>Grab a <span style={{ color: "red" }}>bite</span>!</h1>
        <div className="items">
          {items.map((item) => (
            <div className="card" key={item.id}>
              <div className="image">{item.image}</div>
              <div className="info">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>₹{item.price.toFixed(2)}</p>
                {cart[item.id] ? (
                  <div className="qty-control">
                    <button onClick={() => handleRemove(item)}>-</button>
                    <span>{cart[item.id]}</span>
                    <button onClick={() => handleAdd(item)}>+</button>
                  </div>
                ) : (
                  <button className="add" onClick={() => handleAdd(item)}>Add</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <h3 style={{ color: "red" }}>BOOKING SUMMARY</h3>
        <p>{selectedSeats.join(', ')} ({selectedSeats.length} Tickets) <span>Rs. {ticketTotal.toFixed(2)}</span></p>
        <p>Convenience fees <span>Rs. 94.40</span></p>
        <p>Sub total <span>Rs. {(ticketTotal + 94.4).toFixed(2)}</span></p>

        <div className="checkbox-row">
          <input type="checkbox" checked readOnly />
          <label>Food & Beverage</label>
          <span>Rs. {getTotal().toFixed(2)}</span>
        </div>

        {Object.keys(cart).map((id) => {
          const item = items.find((i) => i.id === parseInt(id));
          return (
            <p key={id}>
              {item.name} (Qty. {cart[id]}) <span>Rs. {(item.price * cart[id]).toFixed(2)}</span>
            </p>
          );
        })}

        <div className="total" style={{ color: "red", fontWeight: "bold" }}>
          TOTAL <span>Rs. {(ticketTotal + 94.4 + getTotal()).toFixed(2)}</span>
        </div>

        <button className="proceed-btn" onClick={() => setOpenModal(true)}>Proceed</button>
      </div>

      <TermsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAccept={() => {
          setOpenModal(false);
          handleAgreeTerms();
        }}
      />
    </div>
  );
}

export default FoodAndBeverage;
