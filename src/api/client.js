
import axios from 'axios';


const API_URL=process.env.REACT_APP_API_GATEWAY+"/api/v1/clients/";
export const addClient=async(data)=>{
    try {
        await axios.post(`${API_URL}`, data);
    } catch (error) {
        console.error('There was an error adding the client!', error);
    }
};

export const getAllClients = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        
        return response.data; 
    } catch (error) {
        console.error('There was an error fetching the clients!', error);
        return [];  
    }
};

export const updateClient=async (data)=>{
    try {
        
        axios.put(`${API_URL}/${data.cin}`,data);
    } catch (error) {
        console.error('There was an error updating the client!', error);
    }

};