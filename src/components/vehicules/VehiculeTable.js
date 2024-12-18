import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Radio,
    Paper,
} from '@mui/material';

const VehicleTable = ({ vehicles, onVehicleSelect, selectedVehicle }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>VIN</TableCell>
                        <TableCell>Registration Number</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Mileage</TableCell>
                        <TableCell>Fuel Type</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.vin}>
                            <TableCell>
                                <Radio
                                    checked={
                                        selectedVehicle?.vin === vehicle.vin
                                    }
                                    onChange={() => onVehicleSelect(vehicle)}
                                    value={vehicle.vin}
                                    inputProps={{ 'aria-label': vehicle.vin }}
                                />
                            </TableCell>
                            <TableCell>{vehicle.vin}</TableCell>
                            <TableCell>{vehicle.registrationNumber}</TableCell>
                            <TableCell>{vehicle.brand.name}</TableCell>
                            <TableCell>{vehicle.model.name}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>{vehicle.color}</TableCell>
                            <TableCell>{vehicle.mileage}</TableCell>
                            <TableCell>{vehicle.fuelType}</TableCell>
                            <TableCell>{vehicle.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehicleTable;
