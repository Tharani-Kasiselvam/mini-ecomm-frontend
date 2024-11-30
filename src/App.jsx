import Footer from "./components/Footer"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetail from "./pages/ProductDetail"
import { useState } from "react"
import {ToastContainer} from 'react-toastify'



const App = () => {

  
  const [cartItems,setCartItems] = useState([])

  return(
    <div className="App">
        <Router>
        <div>
        <ToastContainer theme="colored" position="top-center" autoClose="2000"/>
        <Header cartItems = {cartItems}/>
        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/search" element = {<HomePage />} />
          <Route path="/product/:id" element = {<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>} />
          <Route path="/cart" element = {<CartPage cartItems={cartItems} setCartItems={setCartItems}/>} />
        </Routes>
        </div>
        </Router>
        <Footer />
    </div>
  )
}

export default App