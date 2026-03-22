import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import DataWorkspacePage from "./pages/DataWorkspacePage";
import HomeDetailPage from "./pages/HomeDetailPage";
import Advisor from "./components/Advisor";

const HomeownerLogPage = lazy(() => import("./pages/HomeownerLogPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-canvas text-muted">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/my-home" element={<HomeownerLogPage />} />
          <Route path="/data" element={<DataWorkspacePage />} />
          <Route path="/data/home/:id" element={<HomeDetailPage />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
