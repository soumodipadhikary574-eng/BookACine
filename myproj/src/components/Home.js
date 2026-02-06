import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import Homefoot from './Homefoot';
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const languages = [
  "English",
  "hindi",
  "bengali",
  "Telugu",
  "Tamil",
  "Korean",
  "Malayalam",
  "Marathi",
];

const BookMyShowClone = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/movies");
        setAllMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const handleLanguageClick = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = allMovies.filter((movie) => {
    const matchesLanguage = selectedLanguages.length
      ? selectedLanguages.includes(movie.language)
      : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  const sliderContent = [
    {
      image:
        "https://assetscdn1.paytm.com/images/cinema/coverHousefull-5-db7bdfb0-3adc-11f0-b426-a50671acfc24.jpg",
    },
    {
      title: "Critically Acclaimed & Loved Worldwide!",
      buttonText: "Watch Now",
      bgColor: "#1a1a1a",
      image:
        "https://c.ndtvimg.com/2025-04/j11hg6vs_s_625x300_22_April_25.jpg?im=FitAndFill,algorithm=dnn,width=773,height=435",
    },
    {
      title: "Experience the Magic of Cinema!",
      buttonText: "Stream Today",
      bgColor: "#333",
      image: "https://assetscdn1.paytm.com/images/cinema/cover%20The-Eken--Benaras-e-Bibhishika-d7bb6260-3172-11f0-b426-a50671acfc24.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box>
      <AppBar position="static" color="default" sx={{ padding: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
            Book<span style={{ color: "black" }}>A</span>Cine
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for Movies.."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              maxWidth: "400px",
              bgcolor: "white",
              borderRadius: "5px",
              marginX: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body1" sx={{ marginX: 2 }}>
            Kolkata
          </Typography>

          <Button variant="contained" color="error" onClick={toggleDrawer}>
            Hi user
          </Button>

          <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <List>
              <ListItem button onClick={(e) => setNotifAnchorEl(e.currentTarget)}>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button>
                {/* <ListItemText primary="Your order" /> */}
              </ListItem>
              <ListItem button>
                {/* <ListItemText primary="Help and Support" /> */}
              </ListItem>
            </List>

            <Popover
              open={Boolean(notifAnchorEl)}
              anchorEl={notifAnchorEl}
              onClose={() => setNotifAnchorEl(null)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Box sx={{ p: 2, minWidth: 200 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Notifications
                </Typography>
                <Typography variant="body2">🎬 New Release!</Typography>
                <Typography variant="body2">
                  Don't miss <strong>"Sikandar"</strong> - now showing in theatres near you! 🍿
                </Typography>
              </Box>
            </Popover>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Container sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Box sx={{ width: "800px", height: "400px", overflow: "hidden" }}>
          <Slider {...settings}>
            {sliderContent.map((slide, index) => (
              <Box key={index} sx={{ position: "relative", width: "100%", height: "400px" }}>
                <Box
                  component="img"
                  src={slide.image}
                  alt={slide.title || `Slide ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 2,
                  }}
                />
                {(slide.title || slide.buttonText) && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      textAlign: "center",
                      zIndex: 3,
                      px: 2,
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {slide.title}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: 2,
                        backgroundColor: "#d32f2f",
                        ":hover": { backgroundColor: "#b71c1c" },
                      }}
                    >
                      {slide.buttonText}
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>

      <Container sx={{ display: "flex", marginTop: 4 }}>
        <Box sx={{ width: "25%", padding: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          <Typography variant="subtitle1" color="error" fontWeight="bold" sx={{ marginTop: 2 }}>
            Languages
          </Typography>
          {languages.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              variant={selectedLanguages.includes(lang) ? "filled" : "outlined"}
              color={selectedLanguages.includes(lang) ? "error" : "default"}
              onClick={() => handleLanguageClick(lang)}
              sx={{ margin: 0.5, cursor: "pointer" }}
            />
          ))}
          <Button variant="outlined" color="error" sx={{ marginTop: 2, width: "100%" }}>
            Browse by Cinemas
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Movies In Kolkata
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Card
                    onClick={() =>
                      navigate(`/movieDetails/${movie.id}`, { state: { movie } })
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={movie.imageUrl || movie.image}
                      alt={movie.title}
                    />
                    <CardContent>
                      <Typography variant="body1" fontWeight="bold">
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.language}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ marginTop: 2, color: "gray" }}>
                No movies found
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>

      <Homefoot />
    </Box>
  );
};

export default BookMyShowClone;