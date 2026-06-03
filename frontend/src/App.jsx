import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CentralDashboard from "./views/CentralDashboard";
import CropDoctor from "./views/CropDoctor";
import WeatherAI from "./views/WeatherAI";
import MarketSchemes from "./views/MarketSchemes";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<CentralDashboard />} />
            <Route path="/crop-doctor" element={<CropDoctor />} />
            <Route path="/weather-ai" element={<WeatherAI />} />
            <Route path="/market-schemes" element={<MarketSchemes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
