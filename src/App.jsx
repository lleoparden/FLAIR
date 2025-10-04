import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShoppingCart from "./pages/cart";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brandWhite text-brandBlack">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
