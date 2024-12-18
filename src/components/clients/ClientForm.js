import { useState } from "react";
import { addClient } from "../../api/client";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

const ClientForm = ({ onClose, onSave, type, client }) => {
    const [formData, setFormData] = useState({
        cin: client?.cin || "",
        firstName: client?.firstName || "",
        lastName: client?.lastName || "",
        address: client?.address || "",
        email: client?.email || "",
        phone: client?.phone || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === "create") {
                await addClient(formData);
            } else if (type === "update") {
                // Update client logic here
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{type === "create" ? "Add New Client" : "Update Client"}</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="CIN"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        disabled={type === "update"}
                    />
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
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
        </Dialog>
    );
};

export default ClientForm;
