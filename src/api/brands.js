import axios from 'axios';

const API_URL=process.env.REACT_APP_API_GATEWAY+"/api/v1/vehicules/brands";
export const addBrand=async(brand)=>{
    try {
        const response=await axios.post(`${API_URL}/`,brand);
        return response.data;
    } catch (error) {
        console.log("Error creating the brand"+error);
    }
};

export const getAllBrands=async()=>{
    try {
        const response=await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.log("error fetching the brands"+error);
    }
};

export const getAllModels=async(brandName)=>{
    try {
        const response=await axios.get(`${API_URL}/${brandName}/models`);
        return response.data;
    } catch (error) {
        console.log("error fetching models"+error);
    }
};