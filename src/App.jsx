import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Checkout from "./pages/Checkout"
import About from "./pages/About"
import Header from "./components/Header"
import SingleItem from "./pages/SingleItem"


function App() {

  return (
    <BrowserRouter>
    <Header/>
     <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/checkout" Component={Checkout}/>
      <Route path="/about" Component={About}/>
      <Route path="/product/:id" Component={SingleItem}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
