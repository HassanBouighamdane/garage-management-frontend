import axios from 'axios';

const API_URL = 'http://localhost:800/api/v1';

export const getInvoices = () => {
  return axios.get(`${API_URL}/invoices`);
};
