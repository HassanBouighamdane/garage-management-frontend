import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const VehicleForm = ({ onClose, onSave, type, vehicle }) => {
    const [formData, setFormData] = useState({
        vin: '',
        registrationNumber: '',
        year: '',
        color: '',
        mileage: '',
        purchaseDate: '',
        ownerId: '',
        brand: { name: '' },
        model: { name: '' },
        fuelType: '',
        status: '',
    });

    useEffect(() => {
        if (type === 'update' && vehicle) {
            setFormData(vehicle);
        }
    }, [type, vehicle]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with an API call to save data
        console.log('Form data submitted:', formData);
        onSave();
        onClose();
    };

    return (
        <Box component="form" sx={{ mb: 3 }} onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {type === 'create' ? 'Add New Vehicle' : 'Update Vehicle'}
            </Typography>
            <TextField
                fullWidth
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Fuel Type"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
            <Button variant="text" onClick={onClose} sx={{ ml: 2 }}>
                Cancel
            </Button>
        </Box>
    );
};

export default VehicleForm;
