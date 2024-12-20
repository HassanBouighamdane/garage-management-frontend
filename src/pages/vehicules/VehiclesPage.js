import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import VehicleTable from '../../components/vehicules/VehiculeTable';
import VehicleForm from '../../components/vehicules/VehiculeForm';
import {getAllVehicules} from '../../api/vehicule'

const VehiclePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [formType, setFormType] = useState('create');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
           
            const fetchedVehicles = await getAllVehicules();
            setVehicles(fetchedVehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleVehicleSelect = (vehicle) => {
        setSelectedVehicle(vehicle); // Track the selected vehicle
    };

    const handleUpdateVehicle = () => {
        setFormType('update');
        setShowAddVehicleForm(true);
    };

    return (
        <Box sx={{ mt: 5, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Vehicles
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setFormType('create');
                        setShowAddVehicleForm(true);
                    }}
                >
                    New Vehicle
                </Button>
                {selectedVehicle && (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleUpdateVehicle}
                    >
                        Update Vehicle
                    </Button>
                )}
            </Box>
            {showAddVehicleForm && (
                <VehicleForm
                    onClose={() => setShowAddVehicleForm(false)}
                    onSave={fetchVehicles}
                    type={formType}
                    vehicle={formType === 'update' ? selectedVehicle : null}
                />
            )}
            <VehicleTable
                vehicles={vehicles}
                onVehicleSelect={handleVehicleSelect}
                selectedVehicle={selectedVehicle}
            />
        </Box>
    );
};

export default VehiclePage;
