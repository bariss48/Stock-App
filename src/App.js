import { Routes, Route, useParams, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ErrorPage from "./components/ErrorPage";
import { useAuth } from "./context/AuthProvider";
import AllProducts from "./components/AllProducts";
import AddProductScreen from "./components/AddProductScreen";
import EditProductScreen from "./components/EditProductScreen";
import Results from "./components/Results";
import MalzemeHarca from "./components/MalzemeHarca";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      {/* 
      {user === true && <Route path="dashboard" element={<Dashboard />} />}
      {user === true && (
        <Route path="dashboard/products" element={<AllProducts />} />
      )}   
      
      */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="product/add" element={<AddProductScreen />} />
      <Route path="dashboard/products" element={<AllProducts />} />
      <Route path="dashboard/product/:id" element={<EditProductScreen />} />
      <Route path="dashboard/search/:name" element={<Results />} />
      <Route path="product/spend" element={<MalzemeHarca />} />
    </Routes>
  );
}

export default App;
