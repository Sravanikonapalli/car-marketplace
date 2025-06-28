import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PurchaseRequests from "./pages/admin/PurchaseRequests";
import CarDetailPage from "./pages/CarDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<PurchaseRequests />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
export default App;
