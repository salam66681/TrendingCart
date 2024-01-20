import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const CartIcon = ({state:{isSidebarOpen, setIsSidebar}}) => {

    const state = useSelector((store)=> store.cartSlice.cart)
    return (
        <div onClick={() => setIsSidebar(!isSidebarOpen)} className="relative cursor-pointer">
            <IoCartOutline className="text-4xl hover:text-slate-700 hover:font-semibold"/>
          {state.length>=1 &&  <span className="absolute -top-[7px] left-2.5 text-xs bg-red-500 p-1 px-2 rounded-full text-white ">{state.length}</span>}
        </div>
    )

};


function Header() {
    const [isSidebarOpen, setIsSidebar] = useState(false);

    return (
        <>
        <ToastContainer/>
            <header className="w-full shadow-md">
                <nav className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                    <Link to={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                        <CiShoppingCart className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full m-1"/>
                        <span className="ml-3 text-xl">  Trendingkart</span>
                    </Link>
                    <nav className="md:ml-auto md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
                        <NavLink to={'/'} className={({ isActive }) => isActive ? "text-yellow-600 underline font-bold mr-5" : 
                        "mr-5 hover:text-gray-900"}>Home</NavLink>
                        <NavLink to={'/checkout'} className={({ isActive }) => isActive ? "text-yellow-600 underline font-bold mr-5" : 
                        "mr-5 hover:text-gray-900"}>Checkout</NavLink>
                        <NavLink to={'/about'} className={({ isActive }) => isActive ? "text-yellow-600 underline font-bold mr-5" : 
                        "mr-5 hover:text-gray-900"}>About Us</NavLink>
                        <CartIcon state={{isSidebarOpen, setIsSidebar}} />
                    </nav>
                </nav>
                <Sidebar state={{isSidebarOpen, setIsSidebar}}/>
            </header>
        </>
    )
};

export default Header;