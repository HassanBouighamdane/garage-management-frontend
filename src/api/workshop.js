import axios from 'axios';

const API_URL = 'http://localhost:8083/api/v1';

// Workshops API
export const getWorkshops = () => {
  return axios.get(`${API_URL}/workshop`);
};

export const getWorkshopTasks = (workshopId) => {
  return axios.get(`${API_URL}/workshop/${workshopId}/tasks`);
};

export const addWorkshop = (workshopData) => {
  return axios.post(`${API_URL}/workshop`, workshopData);
};

export const deleteWorkshop = (workshopId) => {
  return axios.delete(`${API_URL}/workshop/${workshopId}`);
};

// Tasks API
export const addTaskToWorkshop = (workshopId, taskData) => {
  return axios.post(`${API_URL}/workshop/${workshopId}/tasks`, taskData);
};

