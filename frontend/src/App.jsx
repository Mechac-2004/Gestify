import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Employees from "./pages/Employees";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
};

export default App;
