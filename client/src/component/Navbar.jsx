import React, { useEffect, useState } from 'react';
import Navlogo from '../media/navlogo.png';
import {NavLink} from 'react-router-dom';
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import '../style/Navbar.css'
import { FaSearch } from "react-icons/fa";
import LoginModel from './LoginModel';
import { MdShoppingCart } from "react-icons/md";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const [menuopen, setMenuopen] = useState(false);
  const [auth] = useAuth();
  const [loginModel, setLoginModel] = useState(false);
  const [cartItem, setCartItem] = useState(0);
  const [wishlistItem, setWishlistItem] = useState(0);

  const navNotification = async() => {
    try {
      const {data} = await axios.post('/api/v1/cart/navbar', {userId: auth?.user?._id});
      setCartItem(data?.cartItem);
      console.log()
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=> {
    if(auth?.user){
      navNotification();
    }
  },[auth])

  const receiveDataFromChild = (data) => {
    setLoginModel(data);
  };
  return (
    <>
    <div className='navbar'>
      <div className="navbar-container">
        <NavLink to='/'><img className="navbar-logo" src={Navlogo} alt="Nav logo" /></NavLink>
        <div className='navbar-search-card'>
            <input className='navbar-search-input' type="text" placeholder='Search Product'/>
            <div className='navbar-search-icon'><FaSearch/></div>
        </div>
        <div className='navbar-item-card'>
            <NavLink to='/cart'><MdShoppingCart/><span className='navbar-item-card-notification'>{cartItem}</span></NavLink>
            <NavLink to='/cart'><FaHeart/><span className='navbar-item-card-notification'>{wishlistItem}</span></NavLink>
            <div onClick={()=>setLoginModel(true)}>Login / Signup</div>
        </div>
        {menuopen ? <>
          <div className='navbar-menu-close' onClick={() => setMenuopen(false)}>
          <span></span>
          <span></span>
        </div></> : <>
        <div className='navbar-menu' onClick={() => setMenuopen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div></>}
      </div>
    </div>
    { menuopen && 
    <div className='navbar-res'>
    <div className="navbar-res-container">
      <NavLink to='/'><img className="navbar-res-logo" src={Navlogo} alt="Nav logo" /></NavLink>
      <div className='navbar-res-item-card'>
          <NavLink onClick={() => setMenuopen(false)} to='/cart'>Cart</NavLink>
          <NavLink onClick={() => setMenuopen(false)} to='/cart'>WishList</NavLink>
      </div>
    </div>
  </div>}
    
    <div className='navbar-buttom'></div>
    {loginModel && <LoginModel handleSend={receiveDataFromChild}/>}
    </>
  )
}

export default Navbar
