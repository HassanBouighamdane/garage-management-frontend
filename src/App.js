import './App.css';
import Navbar from './components/NavBar';
import ClientPage from './pages/clients/ClientPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoices from './pages/invoices/InvoicesPage';
import Header from './components/Header';
import VehiclesPage from './pages/vehicules/VehiclesPage';

function App() {
  return (

      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<h2>Welcome to Garage Management</h2>} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </Router> 

  );
}

export default App;
