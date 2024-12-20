import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openWorkshopModal, setOpenWorkshopModal] = useState(false);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState({ date: "" });
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    vin: "",
  });
  const [invoice, setInvoice] = useState({
    vehicleVin: "",
    taskId: "",
    amount: "",
    dateIssued: "",
    status: "Pending",
  });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchWorkshops();
    fetchVehicles();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/workshop/");
      setWorkshops(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/vehicules/vehicule/");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleSelectWorkshop = async (workshopId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/workshop/${workshopId}/tasks`);
      setSelectedWorkshop(workshopId);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddWorkshop = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/workshop/", newWorkshop);
      setOpenWorkshopModal(false);
      setNewWorkshop({ date: "" });
      fetchWorkshops();
    } catch (error) {
      console.error("Error adding workshop:", error);
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/workshop/${workshopId}`);
      fetchWorkshops();
      setSelectedWorkshop(null); // Reset selected workshop
      setTasks([]);
    } catch (error) {
      console.error("Error deleting workshop:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/workshop/${selectedWorkshop}/tasks`, newTask);
      setOpenTaskModal(false);
      setNewTask({ name: "", description: "", startDate: "", endDate: "", vin: "" });
      handleSelectWorkshop(selectedWorkshop);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMarkAsCompleted = async (task) => {
    try {
      const updatedTask = { ...task, status: "Completed" };
      await axios.put(`http://localhost:8080/api/v1/workshop/${selectedWorkshop}/tasks`, updatedTask);
      setSelectedTask(updatedTask);
      setInvoice({ ...invoice, taskId: task.id, vehicleVin: task.vin });
      setOpenInvoiceModal(true);
      handleSelectWorkshop(selectedWorkshop); // Refresh task list
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleSendInvoice = async () => {
    try {
      console.log(invoice);
      await axios.post("http://localhost:8085/api/v1/invoices", invoice);

      setOpenInvoiceModal(false);
      setInvoice({ vehicleVin: "", taskId: "", amount: "", dateIssued: "", status: "Pending" });
      handleSelectWorkshop(selectedWorkshop);
    } catch (error) {
      console.error("Error sending invoice:", error);
    }
  };

  return (
    <div>
      <h1>Workshop Management</h1>
      <Button variant="contained" color="primary" onClick={() => setOpenWorkshopModal(true)}>
        Add Workshop
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workshops.map((workshop) => (
            <TableRow key={workshop.id}>
              <TableCell>{workshop.id}</TableCell>
              <TableCell>{workshop.date}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleSelectWorkshop(workshop.id)}
                >
                  View Tasks
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteWorkshop(workshop.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedWorkshop && (
        <div>
          <h2>Tasks for Workshop {selectedWorkshop}</h2>
          <Button variant="contained" onClick={() => setOpenTaskModal(true)}>
            Add Task
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>VIN</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.startDate}</TableCell>
                  <TableCell>{task.endDate}</TableCell>
                  <TableCell>{task.vin}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleMarkAsCompleted(task)}
                      disabled={task.status === "Completed"}
                    >
                      Mark as Completed & Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      

      {/* Add Workshop Modal */}
      <Dialog open={openWorkshopModal} onClose={() => setOpenWorkshopModal(false)}>
        <DialogTitle>Add Workshop</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newWorkshop.date}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWorkshopModal(false)}>Cancel</Button>
          <Button onClick={handleAddWorkshop}>Add Workshop</Button>
        </DialogActions>
      </Dialog>

       {/* Add Task Modal */}
       <Dialog open={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTask.startDate}
            onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTask.endDate}
            onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>VIN</InputLabel>
            <Select
              value={newTask.vin}
              onChange={(e) => setNewTask({ ...newTask, vin: e.target.value })}
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.vin}>
                  {vehicle.vin}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskModal(false)}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* Invoice Modal */}
      <Dialog open={openInvoiceModal} onClose={() => setOpenInvoiceModal(false)}>
        <DialogTitle>Send Invoice</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            fullWidth
            value={invoice.amount}
            onChange={(e) => setInvoice({ ...invoice, amount: e.target.value })}
          />
          <TextField
            label="Date Issued"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={invoice.dateIssued}
            onChange={(e) => setInvoice({ ...invoice, dateIssued: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInvoiceModal(false)}>Cancel</Button>
          <Button onClick={handleSendInvoice}>Send Invoice</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkshopsPage;
