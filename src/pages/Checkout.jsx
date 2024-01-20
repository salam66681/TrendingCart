import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { decrementReducer, incrementReducer } from "../redux/slice/Cart.slice";
import { useEffect, useState } from "react";

function Checkout() {

    const state = useSelector((store) => store.cartSlice.cart);
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch()

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
    return (
        <>
            <div className="bg-gray-100 h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4 text-left">
                                <table className="w-full">
                                    <thead>
                                        <tr >
                                            <th className="text-left  font-semibold">Product</th>
                                            <th className="text-center  font-semibold">Price</th>
                                            <th className="text-center  font-semibold">Quantity</th>
                                            <th className="text-center  font-semibold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        state.map((c,i) => {
                                            return <tr key={i}>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <img className="h-16 w-16 mr-4" src={c.image} alt="Product image" />
                                                    <span className="font-semibold">{c.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 text-center">&#8377;{c.price*83}</td>
                                            <td className="py-4">
                                                <div className="flex items-center justify-center">
                                                    <button onClick={()=> decrement(c.id) } className="border rounded-md py-2 px-4 mr-2">-</button>
                                                    <span className="text-center w-8">{c.qty}</span>
                                                    <button onClick={()=> increment(c.id) } className="border rounded-md py-2 px-4 ml-2">+</button>
                                                </div>
                                            </td>
                                            <td className="py-4 text-center">&#8377;{(c.price*c.qty)*83}</td>
                                        </tr>
                                        })
                                       }
                                        
                                        {/* More product rows */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>&#8377;{price*83}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>&#8377;0</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>&#8377;0</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">&#8377;{price*83}</span>
                                </div>
                                <button className="bg-yellow-700 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout;