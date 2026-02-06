import React, { useState } from "react";
import {Routes, Route } from "react-router";
import "./App.css";
import Reg from "./components/Reg";
import ContactForm from "./components/ContactForm";
import RatingPage from "./components/RatingPage";
import SeatLayoutComponent from "./components/SeatLayoutComponent";
import FoodAndBeverageSelection from "./components/FoodAndBeverageSelection";
import Home from "./components/Home";
import Homefoot from "./components/Homefoot";
import Login from "./components/Login";
import Showtime from "./components/Showtime";
import MovieDetails from "./components/MovieDetails";
import MovieTable from "./components/MovieTable";
import TicketPage from "./components/TicketPage";
import RazorpayPayment from "./components/RazorpayPayment";
import AdminHome from "./components/AdminHome";
import Addmovie from "./components/Addmovie";
import AdminLogin from "./components/AdminLogin";
import ViewUser from "./components/ViewUser";
import TicketAdminView from "./components/TicketAdminView";




function App(){
const [open, setOpen] = useState(false);

  return (
   <Routes>
     <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home/>} />
          <Route path="/Homefoot" element={<Homefoot />} />
        <Route path="/Reg" element={<Reg/>} />
        <Route path="/ContactForm" element={<ContactForm/>} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="/Showtime" element={<Showtime />} />
        <Route path="/SeatLayoutComponent" element={<SeatLayoutComponent />} />
        <Route path="/FoodAndBeverageSelection" element={<FoodAndBeverageSelection />} />
        <Route path="/RatingPage" element={<RatingPage />} />
        <Route path="/TicketPage" element={<TicketPage />} />
        <Route path="/RazorpayPayment" element={<RazorpayPayment />} />

        {/* ADMIN SIDE */}
         <Route path="/AdminLogin" element={<AdminLogin />} /> 
        <Route path="/AdminHome" element={<AdminHome/>} />
        <Route path="/ViewUser" element={<ViewUser />} />
        <Route path="/Addmovie" element={<Addmovie />} />
        <Route path="/MovieTable" element={<MovieTable />} />
          <Route path="/TicketAdminView" element={<TicketAdminView />} />

</Routes> 
  
    );
}

export default App;