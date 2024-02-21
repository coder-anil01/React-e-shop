import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategorySlick from '../component/CategorySlick';
import '../style/HomePage.css';
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoginModel from '../component/LoginModel';

const Homepage = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [loginModel, setLoginModel] = useState(false);

  const getProduct = async() => {
    try {
      const {data} = await axios.get('/api/v1/product/get');
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const receiveDataFromChild = (data) => {
    setLoginModel(data);
  };
  const addCart = async(product) => {
    try {
      if(auth?.user){
        const {data} = await axios.post('/api/v1/cart/create', {product, user: auth?.user?._id});
      }else{
        setLoginModel(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
{/* CATEGORY SLIDER */}
    <CategorySlick/>
{/* Show Product */}
    <div className='homepage-item'>
      <div className='homepage-item-container'>
        {products?.map((p) => (
          <div key={p?._id} className="homepage-item-card">
            <Link to={`/product/${p._id}`}>
              <img className='homepage-item-image' src={p?.image} alt={p?.image} />
            </Link>
            <div className='homepage-item-icons'>
              <div><FaHeart/></div>
              <div onClick={()=> addCart(p._id)}><FaCartPlus/></div>
            </div>
            <div className='homepage-item-title'>{p.title.slice(0,20)}</div>
            <div className='homepage-item-price'>₹ {p.price}</div>
          </div>
        ))}
      </div>
    </div>
    {loginModel && <LoginModel handleSend={receiveDataFromChild}/>}
      </>
  )
}

export default Homepage
