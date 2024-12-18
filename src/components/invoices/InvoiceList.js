import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../../api/api';

import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  const loadInvoices = async () => {
    try {
      const response = await fetchInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Sent Invoices
      </Typography>
      {invoices.length > 0 ? (
        <List>
          {invoices.map((invoice, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`To: ${invoice.clientEmail}`}
                secondary={
                  <>
                    <strong>Subject:</strong> {invoice.subject}
                    <br />
                    <strong>Message:</strong> {invoice.message}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No invoices sent yet.
        </Typography>
      )}
    </Paper>
  );
};

export default InvoiceList;
