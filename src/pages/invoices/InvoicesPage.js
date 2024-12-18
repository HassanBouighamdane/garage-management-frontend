import React, { useState } from 'react';
import InvoiceForm from '../../components/invoices/InvoicesForm';
import InvoiceList from '../../components/invoices/InvoiceList';
import { Container, Typography } from '@mui/material';

function Invoices() {
  const [refresh, setRefresh] = useState(false);

  const handleInvoiceSent = () => {
    setRefresh(!refresh);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Invoice Management System
      </Typography>
      <InvoiceForm onInvoiceSent={handleInvoiceSent} />
      <InvoiceList key={refresh} />
    </Container>
  );
}

export default Invoices