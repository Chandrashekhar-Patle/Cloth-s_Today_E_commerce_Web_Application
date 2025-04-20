import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import Shop from './Pages/Shop';
import Mens from './Pages/Mens';
import Kids from './Pages/Kids';
import Womens from './Pages/Womens';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import ShopCategory from './Pages/ShopCategory';

import KidsBanner from "./assets/Kids_banner.avif";
import MensBanner from "./assets/Men_banner.avif";
import WomensBanner from "./assets/Women_banner.jpeg";
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Shop/>} />
      <Route path='/men' element={<ShopCategory banner={MensBanner} category="Men"/>} />
      <Route path='/women' element={<ShopCategory banner={WomensBanner} category= "Women"/>} />
      <Route path='/kid' element={<ShopCategory banner={KidsBanner} category="Kid"/>} />

      <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product/>} />
      </Route>

      <Route path='/login' element={<LoginSignup />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    <Footer />
    </BrowserRouter>
      
    </>
  )
}

export default App
