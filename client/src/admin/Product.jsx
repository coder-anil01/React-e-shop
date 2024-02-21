import React from 'react'
import AdminMenu from './AdminMenu'
import AddProduct from './AddProduct'

const Product = () => {
  return (
    <div className='admin'>
      <div className='admin-container'>
        <AdminMenu/>
        <div className='admin-container-right'>
          <AddProduct/>
{/* show */}
          <div className="admin-item-show"></div>
        </div>
      </div>
    </div>
  )
}

export default Product
