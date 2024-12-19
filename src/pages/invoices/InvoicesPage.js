import React, { useState } from 'react';
import InvoiceList from '../../components/invoices/InvoiceList';
import { Container, Typography } from '@mui/material';

function Invoices() {
  const [refresh, setRefresh] = useState(false);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Invoice Management System
      </Typography>
      <InvoiceList key={refresh} />
    </Container>
  );
}

export default Invoices