import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategorySlick from '../component/CategorySlick';
import '../style/HomePage.css';
import Mallshop from '../media/shopmall.jpeg';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <>
{/* CATEGORY SLIDER */}
    <CategorySlick/>
{/* Show Product */}
    <div className='homepage-item'>
      <div className='homepage-item-container'>
        {products?.map((p) => (
          <Link key={p?._id} to={`/product/${p._id}`} className="homepage-item-card">
            <img className='homepage-item-image' src={p?.image} alt={p?.image} />
            <div className='homepage-item-title'>{p.title.slice(0,20)}</div>
            <div className='homepage-item-price'>₹ {p.price}</div>
          </Link>
        ))}
      </div>
    </div>
      </>
  )
}

export default Homepage
