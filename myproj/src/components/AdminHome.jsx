import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TheatersIcon from '@mui/icons-material/Theaters';
import StarRateIcon from "@mui/icons-material/StarRate";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";


const drawerWidth = 260;

// ✅ Menu items with paths
const menuItems = [
  { text: "User Database", icon: <PeopleIcon />, path: "/ViewUser" },
  { text: "Add Movie", icon: <AddBoxIcon  />, path: "/Addmovie" }, // Navigate to Addmovie.js
{ text: "Manage Movie", icon: <TheatersIcon />, path: "/MovieTable" },
  { text: "Manage Bookings", icon: <MovieIcon />, path: "/TicketAdminView" },
  // { text: "Rating", icon: <StarRateIcon />, path: "/" },
  { text: "Logout", icon: <LogoutIcon />, path: "/AdminLogin" },
];

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Avatar sx={{ bgcolor: "#ffffff22", mx: "auto", mb: 1 }}>🎬</Avatar>
          <Typography variant="h6" fontWeight="bold">
            BookACine
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
        <List>
          {menuItems.map(({ text, icon, path }, index) => (
            <ListItem
              button
              key={index}
              onClick={() => navigate(path)} // ✅ Routing to path
              sx={{
                '&:hover': {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                },
                px: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {icon}
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f2f6fc",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: "#203a43",
            mb: 2,
            mt: 2,
            textShadow: "1px 1px 2px #ccc",
          }}
        >
          BookACine Admin Panel
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            maxWidth: 700,
            color: "#333",
            fontStyle: "italic",
            backgroundColor: "#ffffffdd",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          Welcome to BookACine, the one-stop solution for managing everything
          from movie scheduling to user interactions. Streamline your booking
          operations and enhance the cinematic experience with our modern tools
          and real-time insights.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHomePage;