import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoices from './pages/invoices/InvoicesPage';
import Header from './components/Header';
import VehiclesPage from './pages/vehicules/VehiclesPage';
import WorkshopManagement from './pages/workshops/workshopManagement';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/invoices" element={<Invoices />} />

          <Route path="/workshop" element={<WorkshopManagement />} />        
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
