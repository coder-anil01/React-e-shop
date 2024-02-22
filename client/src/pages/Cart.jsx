import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useAuth } from '../context/AuthProvider';
import '../style/Cart.css';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [auth] = useAuth();
    const [products, setProducts] = useState([]);
    const [totalItem, setTotalItem] = useState('');

    const getCart = async()=> {
        try {
            const {data} = await axios.post('/api/v1/cart/get', {user: auth?.user?._id});
            setProducts(data.cart);
            setTotalItem(data.total);
        } catch (error) {
            console.log(error);
        }
    }

    const totalPrice = () => {
            let total = 0;
            products?.map((p)=>(
                total = total + (p?.product?.price * p?.quantity)
            ));
            return total;
    }

    useEffect(()=>{
        if(auth?.user){
            getCart();
        }
    },[auth])

    const updateCart = async(quantity, id) => {
        try {
            if(quantity > 0 ){
                const {data} = await axios.post(`/api/v1/cart/update/${id}`, {quantity})
                getCart();
            }else{
                alert('Minimum Quantity 1');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const deleteCartItem = async(id) => {
        try {
            const {data} = await axios.post(`/api/v1/cart/delete/${id}`)
            getCart();
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <>
    <div className="cart">
        <h2 className="cart-heading">{totalItem} Items in your Cart</h2>
        <div className="cart-container">
            <div className="cart-items">
                {products?.map((p)=>(
                    <div key={p._id} className="cart-item-card">
                        <img src={p?.product?.image} alt="" className="cart-item-image" />
                        <div className="cart-card-title">{p?.product?.title?.slice(0, 30)}...</div>
                        <div className="cart-card-price">$ {p?.product?.price}</div>
                        <div className="cart-card-quntity-card">
                            <div onClick={() => updateCart(p?.quantity-1, p._id)}><RiSubtractFill/></div>
                            <span>{p?.quantity}</span>
                            <div onClick={() => updateCart(p?.quantity+1, p._id)}><RiAddFill/></div>
                        </div>
                        <div onClick={()=> deleteCartItem(p._id)} className='cart-card-delete'><MdDelete/></div>
                    </div>
                ))}
            </div>
{/* CHCKOUT */}
            <div className="cart-checkout">
                <h3 className='cart-checkout-heading'>Cart Summary</h3>
                <div className="cart-checkout-container">
                    <div className='cart-checkout-items'>
                        <div>{totalItem} Item</div> <strong>999</strong>
                    </div>
                    <div className='cart-checkout-items'>
                        <div>Shipping Charge</div> <strong>Free</strong>
                    </div>
                    <div className="cart-checkout-line-brak"/>
                    <div className='cart-checkout-items-total'>
                        <strong>TOTAL</strong> <strong>{totalPrice()}</strong>
                    </div>
                    <button className='cart-checkout-button'>Checkout Now</button>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Cart
