
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import EcartNavbar from "./Components/Common/EcartNavbar";
import ProductController from "./Components/Pages/ProductController";
import UserController from "./Components/Pages/UserController";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import ProductUpdate from "./Components/Pages/ProductUpdate";
import UserUpdate from "./Components/Pages/UserUpdate";
import Signin from "./Components/Pages/Signin";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import AddProduct from "./Components/Pages/AddProduct";
import Laptop from "./Components/Pages/Products/Electronics/Laptop";
import Mobile from "./Components/Pages/Products/Electronics/Mobile";

 

const App = () => {
  return (
    <Router>
      <div> 
        <EcartNavbar/>       
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/admin/product" element={<ProductController />} />
          <Route path="/admin/user" element={<UserController />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product-update" element={<ProductUpdate />} /> 
          <Route path="/user-update" element={<UserUpdate />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/mobile" element={< Mobile/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
