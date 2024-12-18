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

const ClientTable = ({ clients, onClientSelect, selectedClient }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>CIN</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map((client) => (
                        <TableRow key={client.cin}>
                            <TableCell>
                                <Radio
                                    checked={
                                        selectedClient?.cin === client.cin
                                    }
                                    onChange={() => onClientSelect(client)}
                                    value={client.cin}
                                    inputProps={{ 'aria-label': client.cin }}
                                />
                            </TableCell>
                            <TableCell>{client.cin}</TableCell>
                            <TableCell>{client.firstName}</TableCell>
                            <TableCell>{client.lastName}</TableCell>
                            <TableCell>{client.address}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientTable;
