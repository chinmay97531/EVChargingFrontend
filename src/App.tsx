import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ChargingStations from "./pages/ChargingStations";
import ChargingStationsCity from "./pages/ChargingStationsCity";
import ChargingStationsState from "./pages/ChargingStationsState";
import StationsPage from "./pages/ChargingStationsafterCityandState";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/ChargingStations/state" element={<ChargingStationsState />} />
        <Route path="/state/:state/cities" element={<ChargingStationsCity />} />
        <Route path="/stations/:state/:city" element={<StationsPage />} />
        <Route path="/ChargingStations" element={<ChargingStations />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;