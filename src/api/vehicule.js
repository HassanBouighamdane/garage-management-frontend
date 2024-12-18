import axios from 'axios'
const API_URL=process.env.REACT_APP_API_GATEWAY+"/api/v1/vehicules";
export const getAllVehicules = async () => {
    try {
        const response = await axios(`${API_URL}/vehicule/`);
        
        return response.data; 
    } catch (error) {
        console.error('There was an error fetching the clients!', error);
        return [];  
    }
};