import axios from 'axios';

const API_URL = 'http://localhost:8085/api/v1';

export const sendInvoice = (invoiceData) => {
  return axios.post(`${API_URL}/notification/sendMail`, invoiceData);
};

export const fetchInvoices = () => {
  return axios.get(`${API_URL}/notification/`);
};
