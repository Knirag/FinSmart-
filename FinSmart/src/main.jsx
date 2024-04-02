import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Finsmart2024 from "./components/openingpage/finsmartpage";
import Authentication from "./components/login&signup/userauth";
import Sidebar from "./components/Sidebar";
import Budgets from "./components/Budgets/budgetpage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Finsmart2024 />} />
          <Route index element={<Finsmart2024 />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/budgets" element={<Budgets />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(<App />);