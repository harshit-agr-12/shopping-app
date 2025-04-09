import React from "react";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/Login";
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
