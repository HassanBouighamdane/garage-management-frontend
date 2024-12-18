import React, { useState } from 'react';
import { sendInvoice } from '../../api/api';

import { TextField, Button, Box, Typography, Paper } from '@mui/material';


const InvoiceForm = ({ onInvoiceSent }) => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendInvoice(formData);
      alert('Invoice sent successfully!');
      setFormData({ to: '', subject: '', message: '' });
      onInvoiceSent(); // Refresh the invoice list
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Failed to send invoice.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>
        Generate and Send Invoice
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Recipient Email"
          variant="outlined"
          name="to"
          value={formData.to}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Subject"
          variant="outlined"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Send Invoice
        </Button>
      </Box>
    </Paper>
  );
};

export default InvoiceForm;
