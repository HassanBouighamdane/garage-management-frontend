import './App.css';
import Navbar from './components/NavBar';
import ClientPage from './pages/clients/ClientPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoices from './pages/invoices/InvoicesPage';
import VehiclesPage from './pages/vehicules/VehiclesPage';
import WorkshopsPage from './pages/workshop/workshopsPage';

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
          <Route path="/workshops" element={<WorkshopsPage />} />
        </Routes>
      </Router> 

  );
}

export default App;
