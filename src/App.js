import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Layouts
import BaseLayout from "./components/client/BaseLayout";
import DashboardLayout from "./components/admin/DashboardLayout";
import NotificationListener from "./components/NotificationListener";

// Public Pages
import HomePage from "./pages/client/HomePage";
import LoginPage from "./pages/client/LoginPage";
import RegisterPage from "./pages/client/RegisterClientPage";
import RegisterPageAdmin from "./pages/client/RegisterAdminPage";
import Menu from "./pages/client/Menu";
import SearchResult from "./pages/client/SearcingResult";
import CartView from "./pages/client/CartView";
import CheckoutPayment from "./pages/client/CheckoutPayment";
import CheckoutSuccess from "./pages/client/CheckoutSuccess";
import About from "./pages/client/About";
import MenuDetail from "./pages/client/MenuDetail";

// Admin Pages
import DashboardHome from "./pages/admin/Dashboard";
import CreateMenu from "./pages/admin/CreateMenu";
import DataTransaksi from "./pages/admin/DataTransaksi";
import EditMenuForm from "./pages/admin/EditMenuForm";
import DataUser from "./pages/admin/DataUser";

import NotFound from "./components/NotFound"


export default function App() {

  const user_id = localStorage.getItem("user_id");
  return (
    <Router>
      <NotificationListener user_id={user_id} />
      <Routes>
        {/* Public Routes with BaseLayout */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/register-admin" element={<RegisterPageAdmin />} />
          <Route path="/menu/:category?" element={<Menu />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/cart/view" element={<CartView/>} />
          <Route path="/cart/checkout" element={<CheckoutSuccess/>} />
          <Route path="/cart/checkout-payment" element={<CheckoutPayment/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/menu/detail/:id" element={<MenuDetail />} />
        </Route>

        {/* Admin Routes with Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="create-menu" element={<CreateMenu />} />
          <Route path="transactions" element={<DataTransaksi/>} />
          <Route path="edit-menu/:menuId" element={<EditMenuForm/>} />
          <Route path="users" element={<DataUser/>} />
          {/* <Route path="transactions" element={<Transactions />} />
          <Route path="users" element={<Users />} /> */}
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
