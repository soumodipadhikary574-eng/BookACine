import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, IconButton, Snackbar, Alert, Typography, Box, TablePagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({ id: "", title: "", language: "", imageUrl: "" });
  const [imageFile, setImageFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    const response = await axios.get("http://localhost:8080/api/movies");
    setMovies(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/movies/${id}`);
    fetchMovies();
    setSnackbar({ open: true, message: "Movie deleted successfully", severity: "success" });
    setConfirmDeleteId(null);
  };

  const handleOpenEdit = (movie) => {
    setSelectedMovie(movie);
    setImageFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie({ id: "", title: "", language: "", imageUrl: "" });
    setImageFile(null);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", selectedMovie.title);
    formData.append("language", selectedMovie.language);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await axios.put(`http://localhost:8080/api/movies/${selectedMovie.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    handleClose();
    fetchMovies();
    setSnackbar({ open: true, message: "Movie updated successfully", severity: "success" });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedMovies = movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {/* Title and Back Button */}
      <Box sx={{ mt: 3, mx: 4, position: 'relative', height: 50 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#1976d2",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "50%",
            lineHeight: "50px"
          }}
        >
          Movie Management
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/adminhome")}
          startIcon={<span style={{ fontSize: "18px" }}>❌</span>}
          sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        >
        </Button>
      </Box>

      {/* Movie Table */}
      <TableContainer component={Paper} sx={{ maxWidth: 1100, mx: "auto", borderRadius: 3, mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><b>ID</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Title</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Language</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Poster</b></TableCell>
              <TableCell sx={{ color: "white" }}><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMovies.map((movie) => (
              <TableRow key={movie.id} hover>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell>
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    width="80"
                    style={{ borderRadius: 8 }}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/80")}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEdit(movie)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setConfirmDeleteId(movie.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={movies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={selectedMovie.title}
            onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Language"
            fullWidth
            value={selectedMovie.language}
            onChange={(e) => setSelectedMovie({ ...selectedMovie, language: e.target.value })}
          />
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Choose Poster Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Button>
          {(imageFile || selectedMovie.imageUrl) && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : selectedMovie.imageUrl
                }
                alt="Preview"
                style={{ width: "100px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
              <Typography variant="caption" display="block" mt={1}>Poster Preview</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!selectedMovie.title || !selectedMovie.language}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(confirmDeleteId)} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={() => handleDelete(confirmDeleteId)}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MovieTable;
