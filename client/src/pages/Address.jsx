import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

const Address = () => {

    const [auth, setAuth] = useAuth();
    const [firstat, setFirstat] = useState('');
    const [secndat, setSecndat] = useState('');
    const [city, setCity] = useState('');
    const [pin, setPin] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [phonesec, setPhonesec] = useState('');

    const addAddress = async(e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post('/api/v1/user/address', {userId: auth?.user?._id, firstat, secndat, city, pin, state, phone, phonesec})
        console.log(data)
        if(data.success){
          localStorage.setItem('auth', JSON.stringify(data))
          setAuth({...auth, user: data?.user, token: data?.token});
          handleSend();
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
      <div className="checkout-address">
          <form className="checkout-address-form" onSubmit={addAddress}>

          <div className="checkout-address-card">
              <div className="checkout-address-lable">Phone Number <span>*</span></div>
              <input type="Number"
                onChange={(e)=> setPhone(e.target.value)}
                placeholder='Phone Number'
                className="checkout-address-input" />
            </div>
            
            <div className="checkout-address-card">
              <div className="checkout-address-lable">2nd Phone Number (Optional)</div>
              <input type="Number"
                onChange={(e)=> setPhonesec(e.target.value)}
                placeholder='Phone Number'
                className="checkout-address-input" />
            </div>

            <div className="checkout-address-card">
              <div className="checkout-address-lable">Locality <span>*</span></div>
              <input type="text"
                onChange={(e)=> setFirstat(e.target.value)}
                placeholder='Locality'
                className="checkout-address-input" />
            </div>
            
            <div className="checkout-address-card">
              <div className="checkout-address-lable">Locality <span>*</span> </div>
              <input type="text"
                onChange={(e)=> setSecndat(e.target.value)}
                placeholder='Locality'
                className="checkout-address-input" />
            </div>
            
            <div className="checkout-address-card">
              <div className="checkout-address-lable">City / District <span>*</span></div>
              <input type="text"
                onChange={(e)=> setCity(e.target.value)}
                placeholder='City / District'
                className="checkout-address-input" />
            </div>

            <div className="checkout-address-card">
              <div className="checkout-address-lable">Pin Code <span>*</span></div>
              <input type="Number"
                onChange={(e)=> setPin(e.target.value)}
                placeholder='Pin Code'
                className="checkout-address-input" />
            </div>
            
            <div className="checkout-address-card">
              <div className="checkout-address-lable">State <span>*</span></div>
              <input type="text"
                onChange={(e)=> setState(e.target.value)}
                placeholder='State'
                className="checkout-address-input" />
            </div>
            
            
            <button type='submit'>Go to Payment</button>
          </form>
        </div>
    </>
  )
}

export default Address
