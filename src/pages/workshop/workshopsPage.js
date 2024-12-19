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
} from "@mui/material";

const WorkshopsPage = () => {
  const API = "http://localhost:8083";
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openWorkshopModal, setOpenWorkshopModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState({ date: "" });
  const [newTask, setNewTask] = useState({
    name: "",
    vehiculeId: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    status: "",
  });

  // Fetch workshops on component mount
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(API + "/api/v1/workshop/");
      setWorkshops(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const handleAddWorkshop = async () => {
    try {
      await axios.post(API + "/api/v1/workshop/", newWorkshop);
      fetchWorkshops();
      setOpenWorkshopModal(false);
      setNewWorkshop({ date: "" });
    } catch (error) {
      console.error("Error adding workshop:", error);
    }
  };

  const handleSelectWorkshop = async (workshopId) => {
    try {
      const response = await axios.get(API + `/api/v1/workshop/${workshopId}/tasks`);
      setSelectedWorkshop(workshopId);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post(API + `/api/v1/workshop/${selectedWorkshop}/tasks`, newTask);
      handleSelectWorkshop(selectedWorkshop);
      setOpenTaskModal(false);
      setNewTask({ name: "", vehiculeId: "", description: "", startDate: "", endDate: "", status: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    try {
      await axios.delete(API + `/api/v1/workshop/${workshopId}`);
      fetchWorkshops();
    } catch (error) {
      console.error("Error deleting workshop:", error);
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
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteWorkshop(workshop.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Tasks Table */}
      {selectedWorkshop && (
        <div>
          <h2>Tasks for Workshop {selectedWorkshop}</h2>
          <Button variant="contained" color="primary" onClick={() => setOpenTaskModal(true)}>
            Add Task
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.vehiculeId}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.startDate}</TableCell>
                  <TableCell>{task.endDate}</TableCell>
                  <TableCell>{task.price}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Workshop Modal */}
      <Dialog open={openWorkshopModal} onClose={() => setOpenWorkshopModal(false)}>
        <DialogTitle>Add New Workshop</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newWorkshop.date}
            onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWorkshopModal(false)}>Cancel</Button>
          <Button onClick={handleAddWorkshop}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Modal */}
      <Dialog open={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <TextField
            label="Vehicle ID"
            fullWidth
            value={newTask.vehiculeId}
            onChange={(e) => setNewTask({ ...newTask, vehiculeId: e.target.value })}
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
          <TextField
            label="Price"
            type="number"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTask.price}
            onChange={(e) => setNewTask({ ...newTask, price: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskModal(false)}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkshopsPage;
