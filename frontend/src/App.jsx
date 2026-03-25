import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import DataWorkspacePage from "./pages/DataWorkspacePage";
import HomeDetailPage from "./pages/HomeDetailPage";
import Advisor from "./components/Advisor";

const HomeownerLogPage = lazy(() => import("./pages/HomeownerLogPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
