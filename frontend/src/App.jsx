import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import DataExplorerPage from "./pages/DataExplorerPage";
import Maintenance from "./components/Maintenance";
import Advisor from "./components/Advisor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/data" element={<DataExplorerPage />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
