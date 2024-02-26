import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../style/ProductDetails.css';
import RatingStar from '../component/RatingStar';
import { useAuth } from '../context/AuthProvider';
import LoginModel from '../component/LoginModel';

const ProductDetails = () => {
    const params = useParams();
    const [auth, setAuth] = useAuth();
    const [product, setProduct] = useState({});
    const [reletedProduct, setReletedProduct] = useState([]);
    const [bigImage, setBigImage] = useState("")
    const [loginModel, setLoginModel] = useState(false);


    const getProduct = async() => {
        try {
            const {data} = await axios.get(`/api/v1/product/get/${params.id}`);
            setProduct(data.product);
            getReleted(data?.product?.category, params.id);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params.id])

    const getReleted = async(cid, pid) => {
      try {
        const {data} = await axios.get(`/api/v1/product/getreleted/${cid}/${pid}`);
        setReletedProduct(data.product);
      } catch (error) {
        console.log(error);
      }
    }

    const addCart = async(product) => {
      try {
        if(auth?.user){
          const {data} = await axios.post('/api/v1/cart/create', {product, user: auth?.user?._id});
          if(data.new){
            setAuth({ ...auth, cart: auth?.cart+1 })
          }
        }else{
          setLoginModel(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const receiveDataFromChild = (data) => {
      setLoginModel(data);
    };

  return (
    <>
    <div className='product-detail'>
    <div className='product-detail-container'>
      <div className='product-detail-images'>
        <img onMouseEnter={()=> setBigImage(product?.image)} src={product?.image} alt="" />
        <img onMouseEnter={()=> setBigImage(product?.images?.[0])} src={(product?.images?.[0])} alt="" />
        <img onMouseEnter={()=> setBigImage(product?.images?.[1])} src={(product?.images?.[1])} alt="" />
        <img onMouseEnter={()=> setBigImage(product?.images?.[2])} src={(product?.images?.[2])} alt="" />
      </div>
      <div>
        <div className='product-detail-image'>
          <img  src={bigImage ? bigImage : product?.image} alt="" />
        </div>
        {/* <div className='product-detail-images-buttom'>
          <img onMouseEnter={()=> setBigImage(product?.image)} src={product?.image} alt="" />
          <img onMouseEnter={()=> setBigImage(product?.images?.[0])} src={(product?.images?.[0])} alt="" />
          <img onMouseEnter={()=> setBigImage(product?.images?.[1])} src={(product?.images?.[1])} alt="" />
          <img onMouseEnter={()=> setBigImage(product?.images?.[2])} src={(product?.images?.[2])} alt="" />
        </div> */}
        <div className='product-detail-button'>
          <button onClick={()=> addCart(product?._id)} className='product-detail-button-cart'>Add To Cart</button>
          <Link to={`/buy/${product._id}`} className='product-detail-button-buy'>Buy Now</Link>
        </div>
      </div>
      <div className='product-detail-text'>
        <div className='product-detail-title'>{product?.title}</div>
        <div className='product-detail-price'>₹ {product?.price}</div>
        <div className='product-detail-description'>{product?.description}</div>
        <div className='product-detail-gender'><strong>Recommended for </strong>{product?.usergender}</div>
        <div className='product-detail-rating'><RatingStar rating={product.rating}/></div>
        <div className='product-detail-despoint-card'>
          {product?.desPoints?.map((d)=>(
            <ul>
              <li>{d}</li>
            </ul>
          ))}
          </div>
      </div>
    </div>
    <div className="releted-product">
    {reletedProduct && <div className='homepage-item-container'>
          {reletedProduct?.map((p) => (
            <Link key={p?._id} to={`/product/${p._id}`} className="homepage-item-card">
              <img className='homepage-item-image' src={p?.image} alt={p?.image} />
              <div className='homepage-item-title'>{p.title.slice(0,20)}</div>
              <div className='homepage-item-price'>₹ {p.price}</div>
            </Link>
          ))}
        </div>}
    </div>
    </div>
    {loginModel && <LoginModel handleSend={receiveDataFromChild}/>}
    </>
  )
}

export default ProductDetails
