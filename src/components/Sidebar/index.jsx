import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import { decrementReducer, deleteItemReducer, incrementReducer } from "../../redux/slice/Cart.slice";
import { Link } from "react-router-dom";



function Sidebar({ state: { isSidebarOpen, setIsSidebar } }) {

    const [price, setPrice]= useState(0)

    const state = useSelector((store) => store.cartSlice.cart)


    const CartCard = ({ c }) => {

        const dispatch = useDispatch()

        const increment = (id) => {
            try {

                dispatch(incrementReducer(id));
                toast.success('Item Quantity increased')
            } catch (error) {
                toast.error(error.message)
            }

        }

        const decrement = (id) => {
            try {
                dispatch(decrementReducer(id));
                toast.success('Item Quantity decreased')
            } catch (error) {
                toast.error(error.message)
            }

        }

        const deleteHandler = (id) => {
            try {
                dispatch(deleteItemReducer(id));
                toast.success('Item Removed')

            } catch (error) {
                toast.error(error.message)
            }

        }

        



        return <div className="w-full px-4 border border-white flex justify-between gap-x-2 py-3 items-center">
            <img src={c.image} alt="" className="w-20 rounded-full" />
            <div className="items">
                <h1 className="text-xl text-white font-semibold">{c.title}</h1>
                <div className="flex text-2xl items-center gap-x-3 mx-auto text-white cursor-pointer">
                    <FaMinus onClick={() => decrement(c.id)} className="hover:text-slate-200" />
                    <h1>{c.qty}</h1>
                    <FaPlus onClick={() => increment(c.id)} className="hover:text-slate-200" />
                </div>
            </div>
            <div className="icon">
                <IoTrashOutline onClick={() => deleteHandler(c.id)} className="text-2xl text-white hover:text-slate-200 cursor-pointer" />
            </div>
        </div>
    }

    useEffect(()=> {
        if(state.length>0){
            let totalPrice = 0;
            state.forEach((cur) => {
                totalPrice += cur.price*cur.qty

            })
            setPrice(totalPrice)
        } else{
            setPrice(0)
        }
    }, [state])

    return (
        <>
            <div className={`${isSidebarOpen ? `-translate-x-0` : `translate-x-[100%]`} transition-all duration-500 
        fixed h-screen md:w-1/3 w-full bg-yellow-300 top-0 right-0 z-10`}>
                <div className="py-4 mx-10 flex justify-between item-center">
                    <h1 className="font-semifold text-white text-2xl">My Cart</h1>
                    <IoCloseCircleOutline onClick={() => setIsSidebar(!isSidebarOpen)} className="text-4xl text-white hover:text-slate-200 cursor-pointer" />
                </div>
                {
                   state.length<1 &&  <div className="text-white w-full flex justify-center flex-col py-7">
                    <BsCart3 className="text-9xl mx-auto"/>
                    <h1 className="mx-auto text-2xl font-semibold">Empty Cart!!</h1>
                   </div>
                }
                <div id="sidebar-data-box" className="h-[65%] overflow-y-auto w-full">
                    {
                        state && state.length >= 1 && state.map((c, i) => {
                            return <CartCard key={i} c={c} />
                        })
                    }
                </div>

                {state.length>0 && <div className="my-3 py-3 mx-5 gap-y-5 flex flex-col">
                    <h1 className="text-3xl text-white">Total Price: &#8377; {price*83}/-</h1>
                    <Link to={'/checkout'} onClick={() => setIsSidebar(!isSidebarOpen)} className="w-full text-center py-3 bg-yellow-700 hover:bg-yellow-600 text-white rounded">Checkout</Link>

                </div>}
            </div>
        </>
    )
};

export default Sidebar;