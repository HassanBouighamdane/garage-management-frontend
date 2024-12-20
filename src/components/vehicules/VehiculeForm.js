import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Dialog,DialogActions,DialogContent,DialogTitle, MenuItem,IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addBrand, addModelToBrand, getAllBrands, getAllModels } from '../../api/brands';
import { addVehicule } from '../../api/vehicule';
import { getAllClients } from '../../api/client';

const VehicleForm = ({ onClose, onSave, type, vehicle }) => {
    const [formData, setFormData] = useState({
        vin: '',
        registrationNumber: '',
        year: '',
        color: '',
        mileage: '',
        purchaseDate: '',
        ownerId: '',
        brand: '',
        model: '',
        fuelType: '',
        status: '',
    });

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [fuelType,setFuelType]=useState([]);
    const [status,setStatus]=useState([]);
    const [newBrandDialog, setNewBrandDialog] = useState(false);
    const [newModelDialog, setNewModelDialog] = useState(false);
    const [newBrand, setNewBrand] = useState('');
    const [newModel, setNewModel] = useState('');
    const [clients,setClients]=useState([]);
    

    useEffect(()=>{
        fetchClients();
    },[]);
    
    useEffect(() => {
        if (type === 'update' && vehicle) {
            setFormData(vehicle);
        }
    }, [type, vehicle]);

    useEffect(() => {
        // Fetch brands data
        fetchBrands();
    }, []);

    useEffect(() => {
        if (formData.brand) {
            // Fetch models when a brand is selected
            fetchModels(formData.brand);
        }
    }, [formData.brand]);

    useEffect(()=>{
        fetchFuelTypes();
        fetchStatus();
    },[]);

      const fetchClients = async () => {
            try {
                const fetchedClients = await getAllClients();
                setClients(fetchedClients);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

    const fetchStatus=async()=>{
        const statusData=[
            {id:'1',name: 'FUNCTIONAL'},
            {id:'2',name: 'UNDER_REPAIR'},
            {id:'3',name: 'INACTIVE'},
            {id:'4',name: 'DAMAGED'},
        ]
        setStatus(statusData);
    }

    const fetchBrands = async () => {
        const brandsData = await getAllBrands();
        setBrands(brandsData);
    };

    const fetchFuelTypes=async()=>{
        const fuelTypeData=[
            {id:'1',name:'ESSENCE'},
            {id:'2',name:'DIESEL'},
            {id:'3',name:'HYBRID'},
            {id:'4',name:'ELECTRIC'},
        ];
        setFuelType(fuelTypeData);
    };

    const fetchModels = async (brandId) => {
        const modelsData = await getAllModels(brandId);
        setModels(modelsData || []);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await addVehicule(formData);
        onSave();
        onClose();
    };

    const addNewBrand = async() => {
        if (newBrand) {
            await addBrand({name:newBrand})
            setNewBrand('');
            setNewBrandDialog(false);
            await fetchBrands();
        }
    };

    const addNewModel = async() => {
        if (newModel) {
            await addModelToBrand(formData.brand,{name:newModel})
            setNewModel('');
            setNewModelDialog(false);
            await fetchModels(formData.brand);
        }
    };

    return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{type === "create" ? "Add New Vehicule" : "Update Vehicule"}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mb: 3 }} onSubmit={handleSubmit}>
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
                select
                label="Owner"
                name="ownerId"
                value={formData.ownerId}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            >
                {clients.map((client) => (
                            <MenuItem key={client.cin} value={client.cin}>
                                {client.firstName+' '+client.lastName}
                            </MenuItem>
                        ))}
            </TextField>
            <TextField
                fullWidth
                type='date'
                label="purchase Date"
                name="purchaseDate"
                value={formData.purchaseDate}
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
                        select
                        fullWidth
                        label="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setNewBrandDialog(true)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            ),
                        }}
                    >
                        {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.name}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label="Model"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                        disabled={!formData.brand}
                        InputProps={{
                            endAdornment: (
                                <IconButton disabled={!formData.brand} onClick={() => setNewModelDialog(true)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            ),
                        }}
                    >
                        {models.map((model) => (
                            <MenuItem key={model.id} value={model.name}>
                                {model.name}
                            </MenuItem>
                        ))}
                    </TextField>
            <TextField
                select
                fullWidth
                label="Fuel Type"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            >
                {fuelType.map((type)=>(
                    <MenuItem key={type.id} value={type.name}>
                        {type.name}
                    </MenuItem>
                ))}
                </TextField>
            <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
            >
                {status.map((stat)=>(
                    <MenuItem key={stat.id} value={stat.name}>
                        {stat.name}
                    </MenuItem>
                ))}
            </TextField>
            </Box>
                     </DialogContent>
                     <DialogActions>
                         <Button onClick={onClose} color="secondary">
                             Cancel
                         </Button>
                         <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                             {type === "create" ? "Submit" : "Update"}
                         </Button>
                     </DialogActions>


                     {/* New Brand Dialog */}
            <Dialog open={newBrandDialog} onClose={() => setNewBrandDialog(false)}>
                <DialogTitle>Add New Brand</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="New Brand"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewBrandDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={addNewBrand} variant="contained" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* New Model Dialog */}
            <Dialog open={newModelDialog} onClose={() => setNewModelDialog(false)}>
                <DialogTitle>Add New Model</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="New Model"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewModelDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={addNewModel} variant="contained" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
                 </Dialog>
        
    );
};

export default VehicleForm;
