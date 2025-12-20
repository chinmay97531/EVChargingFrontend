import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Auth from "./pages/Auth";
import ChargingStations from "./pages/ChargingStations";
import ChargingStationsCity from "./pages/ChargingStationsCity";
import ChargingStationsState from "./pages/ChargingStationsState";
import StationsPage from "./pages/ChargingStationsafterCityandState";
import Bookings from "./pages/Bookings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import StatsDashboard from "./pages/StatsDashboard";
import CarManagement from "./pages/CarManagement";
import PaymentPage from "./pages/PaymentPage";
import ProfilePageNew from "./pages/ProfilePageNew";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected routes wrapped in Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute>
                <ProfilePageNew />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/vehicles"
          element={
            <Layout>
              <ProtectedRoute>
                <CarManagement />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout>
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/bookings"
          element={
            <Layout>
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/stats"
          element={
            <Layout>
              <ProtectedRoute>
                <StatsDashboard />
              </ProtectedRoute>
            </Layout>
          }
        />
        
        {/* Charging stations routes */}
        <Route path="/ChargingStations/state" element={<ChargingStationsState />} />
        <Route path="/state/:state/cities" element={<ChargingStationsCity />} />
        <Route path="/stations/:state/:city" element={<StationsPage />} />
        <Route path="/ChargingStations" element={<ChargingStations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;