import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import '../style/AdminDashbord.css'

const Admin = () => {
    const [admin, setAdmin] = useState(true);
  return (
    <div>
      {admin ? <Outlet/> : "Login"}
    </div>
  )
}

export default Admin
