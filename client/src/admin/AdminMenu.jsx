import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div className='admin-menu'>
      <NavLink to='/admin/'>DashBord</NavLink>
      <NavLink to='/admin/category'>Categories</NavLink>
      <NavLink to='/admin/product'>Products</NavLink>
      <NavLink to='/admin/'>All Orders</NavLink>
      <NavLink to='/admin/'>All Users</NavLink>
    </div>
  )
}

export default AdminMenu
