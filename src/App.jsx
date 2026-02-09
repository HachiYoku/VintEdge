import React, { useEffect } from "react";
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
import VerifyEmailSuccess from "./pages/auth/VerifyEmailSuccess";
import VerifyEmailFailed from "./pages/auth/VerifyEmailFailed";
import VerifyEmail from "./pages/auth/VerifyEmail";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage";
import ResetpswPage from "./pages/ResetpswPage";
import ForgotpswPage from "./pages/ForgotpswPage";

// Context
import { ItemProvider } from "./context/ItemContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

/* =====================
   Private Route
===================== */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 50 }}>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

/* =====================
   Public Route
   (only for auth pages)
===================== */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 50 }}>Loading...</div>;
  }

  return !user ? children : <Navigate to="/" replace />;
};

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <ItemProvider>
          <BrowserRouter>
            <Routes>
              {/*Auth pages*/}
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
              <Route
                path="/forgot_password"
                element={
                  <PublicRoute>
                    <ForgotpswPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/reset-password/:token"
                element={
                  <PublicRoute>
                    <ResetpswPage />
                  </PublicRoute>
                }
              />

              {/*home page */}
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />

                {/* search page*/}
                <Route path="/search" element={<SearchPage />} />

                <Route path="/product/:id" element={<ProductDetailPage />} />

                {/* Protected pages */}
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
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
              </Route>

              {/*404 */}
              <Route path="*" element={<NotFoundPage />} />

              <Route path="/verify-success" element={<VerifyEmailSuccess />} />
              <Route path="/verify-failed" element={<VerifyEmailFailed />} />
              <Route path="/verify-email" element={<VerifyEmail />} />

              <Route
                path="/order-success"
                element={<OrderConfirmationPage />}
              />
            </Routes>
          </BrowserRouter>
        </ItemProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
