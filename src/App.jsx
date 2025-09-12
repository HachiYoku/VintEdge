import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import "@ant-design/v5-patch-for-react-19";

// Pages
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import History from "./pages/History";
import Setting from "./pages/Setting";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckOutPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import ProductDetailPage from "./pages/ProductDetail";

// Context
import { ItemProvider } from "./context/ItemContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// ✅ PrivateRoute here
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  return !user ? children : <Navigate to="/" replace />;
};
const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);
  return (
    <AuthProvider>
      <CartProvider>
        <ItemProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />
              {/* Protected routes with AppLayout */}
              <Route element={<AppLayout />}>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-item"
                  element={
                    <PrivateRoute>
                      <CreateItem />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <PrivateRoute>
                      <History />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/setting"
                  element={
                    <PrivateRoute>
                      <Setting />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <PrivateRoute>
                      <SearchPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <PrivateRoute>
                      <ProductDetailPage />
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* 404 page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ItemProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
