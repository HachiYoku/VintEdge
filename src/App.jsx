import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import "@ant-design/v5-patch-for-react-19";

// Pages (all use index.jsx inside their folder)
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import History from "./pages/History";
import Setting from "./pages/Setting";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

// Context
import { ItemProvider } from "./context/ItemContext";

const App = () => {
  return (
    <ItemProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/history" element={<History />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ItemProvider>
  );
};

export default App;
