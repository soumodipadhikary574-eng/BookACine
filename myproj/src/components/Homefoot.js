import React from "react";
import { Container, Typography, Grid, Button, Box,IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router";

const FooterSection = ({ title, links }) => (
  <Box sx={{ marginBottom: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
      {title}
    </Typography>
    {links.map((link, index) => (
      <Typography key={index} variant="body2" sx={{ color: "gray" }}>
        {link}
      </Typography>
    ))}
  </Box>
);

const App = () => {
  const pressButton = () => {
  window.open("/ContactForm", "_blank", "noopener,noreferrer");
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          flexGrow: 1,
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2d2d2d",
            padding: 4,
            color: "white",
            textAlign: "center",
           
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            List your Show
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Got a show, event, activity or a great experience? Partner with us & get listed on BooACine
          </Typography>
          <Button onClick={pressButton}variant="contained" color="error">
            Contact today!
          </Button>
        </Box>
        <Grid
          container
          spacing={3}
          sx={{
            backgroundColor: "#1c1c1c",
            color: "white",
            padding: 3,
            width: "100%",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <SupportAgentIcon fontSize="large" />
            <Typography>24/7 CUSTOMER CARE</Typography>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <ConfirmationNumberIcon fontSize="large" />
            <Typography>RESEND BOOKING CONFIRMATION</Typography>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <EmailIcon fontSize="large" />
            <Typography>SUBSCRIBE TO THE NEWSLETTER</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#121212",
            padding: 4,
            color: "white",
            
            
            width: "100%",
          }}
        >
          <FooterSection
            title="MOVIES NOW SHOWING IN KOLKATA"
            links={["Sikandar", "A Minecraft Movie", "The Diplomat", "Chhaava", "Hunterrr", "Darr"]}
          />
          <FooterSection
            title="UPCOMING MOVIES IN KOLKATA"
            links={["Premier League 2025", "Meroon", "Jaat", "Good Bad Ugly", "Bazooka"]}
          />
          <FooterSection
            title="MOVIE UPDATES AND CELEBRITIES"
            links={["Upcoming Movies", "Movies Now Showing", "Movie Celebrities"]}
          />
          <FooterSection
            title="MOVIES BY GENRE"
            links={["Drama Movies", "Action Movies", "Thriller Movies", "Comedy Movies", "Romantic Movies"]}
          />
        </Box>
        <Box sx={{ backgroundColor: "#1c1c1c", color: "white", textAlign: "center", padding: 3, width: "100%" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Book<span style={{ color: "red" }}>A</span>Cine
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton color="inherit"><FacebookIcon /></IconButton>
            <IconButton color="inherit"><InstagramIcon /></IconButton>
            <IconButton color="inherit"><YouTubeIcon /></IconButton>
            <IconButton color="inherit"><PinterestIcon /></IconButton>
            <IconButton color="inherit"><LinkedInIcon /></IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Copyright 2025 © Bigtree Entertainment Pvt. Ltd. All Rights Reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            The content and images used on this site are copyright protected and copyrights vest with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default App;