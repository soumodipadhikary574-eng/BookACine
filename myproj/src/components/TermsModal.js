import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TermsModal = ({ open, onClose, onAccept }) => {
  const terms = [
    {
      text: 'This cinema is now CASHLESS. Pay for your food & drinks with ease using your credit/debit card, UPI, you can also purchase Gift Card with cash. Enjoy a fast, secure, and seamless experience.',
      color: 'red',
    },
    { text: 'Entry is allowed only for valid ticket holders.' },
    { text: 'Guests aged under 18 will not be allowed in A rated movies.' },
    { text: 'Children above the age of 3 years require tickets for U or U/A rated movies.' },
    { text: 'In case a ticket is lost or misplaced, a duplicate ticket cannot be issued.' },
    { text: 'Tickets once purchased cannot be exchanged or adjusted/transferred for any other show.' },
    { text: 'Guest Agrees to be contacted by INOX Management for the purpose of seeking feedback for service improvement.' },
    { text: 'Decision(s) taken by INOX shall be final and binding. Rights of admission reserved.' },
    { text: 'Outside food and beverages are not allowed inside the cinema premises.' },
    { text: 'Patrons under the influence of alcohol or drugs will not be allowed inside the Cinema Premises.' },
    { text: 'Ticket prices and movie schedules are subject to change without any prior notification.' },
  ];

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
    onClose(); // Also close the modal
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }}>
        Terms & Conditions
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {terms.map((term, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ mb: 1, color: term.color || 'text.primary' }}
          >
            {`${index + 1}. ${term.text}`}
          </Typography>
        ))}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleAccept}
          sx={{ px: 6 }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsModal;