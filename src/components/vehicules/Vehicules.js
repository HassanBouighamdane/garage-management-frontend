import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({
    vin: "",
    licensePlate: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    mileage: "",
    fuelType: "",
    purchaseDate: "",
    owner: "",
    status: "",
  });

  const handleInputChange = (e) => {
    setCurrentVehicle({ ...currentVehicle, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, currentVehicle]);
    setCurrentVehicle({
      vin: "",
      licensePlate: "",
      brand: "",
      model: "",
      year: "",
      color: "",
      mileage: "",
      fuelType: "",
      purchaseDate: "",
      owner: "",
      status: "",
    });
    setOpen(false);
  };

  const handleDelete = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Vehicle Management</h2>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add Vehicle
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>VIN</TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle, index) => (
              <TableRow key={index}>
                <TableCell>{vehicle.vin}</TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.color}</TableCell>
                <TableCell>{vehicle.mileage}</TableCell>
                <TableCell>{vehicle.fuelType}</TableCell>
                <TableCell>{vehicle.purchaseDate}</TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Vehicle Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            label="VIN"
            name="vin"
            value={currentVehicle.vin}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="License Plate"
            name="licensePlate"
            value={currentVehicle.licensePlate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Brand"
            name="brand"
            value={currentVehicle.brand}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Model"
            name="model"
            value={currentVehicle.model}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={currentVehicle.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Color"
            name="color"
            value={currentVehicle.color}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mileage"
            name="mileage"
            type="number"
            value={currentVehicle.mileage}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Select
            name="fuelType"
            value={currentVehicle.fuelType}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Gasoline">Gasoline</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
          <TextField
            label="Purchase Date"
            name="purchaseDate"
            type="date"
            value={currentVehicle.purchaseDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Owner"
            name="owner"
            value={currentVehicle.owner}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Select
            name="status"
            value={currentVehicle.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Functional">Functional</MenuItem>
            <MenuItem value="Under Repair">Under Repair</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddVehicle} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Vehicles;
