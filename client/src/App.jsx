import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './pages/Homepage'
import Admin from './admin/Admin'
import AdminDashbord from './admin/AdminDashbord'
import Product from './admin/Product'
import Category from './admin/Category'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './pages/ProductDetails'
import Login from './component/Login'
import ScrollToTop from './component/ScrollToTop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

const App = () => {
  <ToastContainer
    // position="top-right"
    autoClose={5000}
    />

  return (
    <>
      <Router>
        <Navbar/>
        <ToastContainer />
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>

{/* ADMIN */}
          <Route path='/admin' element={<Admin/>}>
            <Route path='' element={<AdminDashbord/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='category' element={<Category/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
