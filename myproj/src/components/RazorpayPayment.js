import React from "react";

const RazorpayPayment = () => {
  const handlePayment = async () => {
    // 1. Create order by calling backend
    const orderResponse = await fetch("http://localhost:8080/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 }), // amount in INR
    });
    const orderData = await orderResponse.json();

    // 2. Configure Razorpay options
    const options = {
      key: "rzp_test_mufoltUfznOxOQ", // your key id
      amount: orderData.amount, // amount in paise
      currency: orderData.currency,
      name: "Your Company",
      description: "Test Transaction",
      order_id: orderData.id, // order id from backend
      handler: async function (response) {
        // 3. Save payment info to backend after successful payment
        const paymentData = {
          razorpayPaymentId: response.razorpay_payment_id,
          amount: orderData.amount / 100,
          paymentMethod: "card", // assuming card
          status: "success",
        };

        await fetch("http://localhost:8080/save-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        });

        alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // 4. Open Razorpay payment modal
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Card</button>
    </div>
  );
};

export default RazorpayPayment;
