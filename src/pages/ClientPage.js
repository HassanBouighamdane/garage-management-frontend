import React, { useState, useEffect } from 'react';
import { getAllClients } from '../api/client';
import ClientForm from '../components/clients/ClientForm';
import ClientTable from '../components/clients/ClientTable';
import { Box, Button, Typography } from '@mui/material';

const ClientPage = () => {
    const [clients, setClients] = useState([]);
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [formType, setFormType] = useState('create');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const fetchedClients = await getAllClients();
            setClients(fetchedClients);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleClientSelect = (client) => {
        setSelectedClient(client); // Track the selected client
    };

    const handleUpdateClient = () => {
        setFormType('update');
        setShowAddClientForm(true);
    };

    return (
        <Box sx={{ mt: 5, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Clients
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setFormType('create');
                        setShowAddClientForm(true);
                    }}
                >
                    New Client
                </Button>
                {selectedClient && (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleUpdateClient}
                    >
                        Update Client
                    </Button>
                )}
            </Box>
            {showAddClientForm && (
                <ClientForm
                    onClose={() => setShowAddClientForm(false)}
                    onSave={fetchClients}
                    type={formType}
                    client={formType === 'update' ? selectedClient : null}
                />
            )}
            <ClientTable
                clients={clients}
                onClientSelect={handleClientSelect}
                selectedClient={selectedClient}
            />
        </Box>
    );
};

export default ClientPage;
