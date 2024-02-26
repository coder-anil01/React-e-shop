import React, { useState } from 'react'
import Address from './Address'
import '../style/Checkout.css'
import { useAuth } from '../context/AuthProvider'

const Checkout = () => {

  const [auth] = useAuth();
  const address = auth?.user?.deliverat;
  const [addressModel, setAddressModel] = useState(true);

  
  return (
    <div className='checkout'>
      <div className='checkout-container'>
        <div>
        { !auth?.user?.deliverat && <Address/>}
        <div className="checkout-payment">
            <div className='checkout-payment-address-heading'>DELIVERY ADDRESS</div>
          <div className="checkout-payment-address">
            <div className="checkout-payment-address-card">
              <div>
                <span>{auth.user?.name}</span>
                <span>{address?.phone}, {address?.phonesec}</span>
                <span>{address?.firstat}, {address?.secndat}, {address?.city}, {address?.state}, {address?.pin}</span>
                <span></span>
              </div>
              <div className='checkout-payment-address-change'>Change</div>
            </div>
          </div>
          <div className="checkout-payment-container">
            <img src="" alt="" />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
