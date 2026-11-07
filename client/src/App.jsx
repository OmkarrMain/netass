import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EnquiryModal from "./components/EnquiryModal";
import ToastHost from "./components/ToastHost";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import PlansPage from "./pages/PlansPage";
import AuthPage from "./pages/AuthPage";
import StaticPage from "./pages/StaticPage";
import Placeholder from "./pages/Placeholder";

function AppLayout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<StaticPage page="about" />} />
        <Route path="/contact" element={<StaticPage page="contact" />} />
        <Route path="/documents" element={<StaticPage page="documents" />} />
        <Route path="/terms" element={<StaticPage page="terms" />} />
        <Route path="/privacy" element={<StaticPage page="privacy" />} />
        <Route path="/refund" element={<StaticPage page="refund" />} />
        <Route
          path="/vouchers"
          element={<Placeholder title="Wi-Fi Vouchers" />}
        />
        <Route path="/book" element={<Placeholder title="Online Booking" />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Placeholder title="Customer Dashboard" />}
          />
          <Route
            path="/bookings"
            element={<Placeholder title="My Bookings" />}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<Placeholder title="Admin Dashboard" />}
          />
        </Route>

        <Route path="*" element={<Placeholder title="Page Not Found" />} />
      </Routes>

      <Footer />
      <EnquiryModal />
      <ToastHost />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
