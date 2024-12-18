import './App.css';
import Navbar from './components/NavBar';
import ClientPage from './pages/ClientPage';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Navbar />
    <div className="container mt-4">
        <Routes>
          
            <Route path="/clients" element={<ClientPage />} />
           
             <Route path="/" element={<h2>Welcome to Garage Management</h2>} />
             <Route path="/vehicles" element={<h2>Vehicles Page</h2>} />
            <Route path="/workshops" element={<h2>Workshops Page</h2>} />
            <Route path="/tasks" element={<h2>Tasks Page</h2>} />
            <Route path="/invoices" element={<h2>Invoices Page</h2>} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
