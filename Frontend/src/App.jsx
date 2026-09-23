import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import Shop from './Pages/Shop';
import Mens from './Pages/Mens';
import Kids from './Pages/Kids';
import Womens from './Pages/Womens';
import Login from './Pages/Login';
import Singup from './Pages/Signup';
import Footer from './Components/Footer/Footer';
import ShopCategory from './Pages/ShopCategory';

import KidsBanner from "./assets/Kids_banner.avif";
import MensBanner from "./assets/Men_banner.avif";
import WomensBanner from "./assets/Women_banner.jpeg";
import LoginSignup from './Pages/Signup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <BrowserRouter>
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <Routes>
      <Route path='/' element={<Shop searchTerm={searchTerm} />} />
      <Route path='/men' element={<ShopCategory banner={MensBanner} category="Men" searchTerm={searchTerm} />} />
      <Route path='/women' element={<ShopCategory banner={WomensBanner} category="Women" searchTerm={searchTerm} />} />
      <Route path='/kid' element={<ShopCategory banner={KidsBanner} category="Kid" searchTerm={searchTerm} />} />

      <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product/>} />
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Singup />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    <Footer />
    </BrowserRouter>
      
    </>
  )
}

export default App
