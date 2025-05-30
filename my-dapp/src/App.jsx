import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Deposite from "./pages/Deposite";
import Voting from "./pages/Voting";
import Results from "./pages/Results";
import Withdraw from "./pages/Withdraw";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposite" element={<Deposite />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/results" element={<Results />} />
          <Route path="withdraw" element={<Withdraw />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
