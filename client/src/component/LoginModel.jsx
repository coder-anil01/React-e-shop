import React, { useState } from 'react';
import '../style/Login.css';
import {FaUser, FaLock} from 'react-icons/fa';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import { useAuth } from '../context/AuthProvider';
import { IoIosMail } from "react-icons/io";

const LoginModel = (props) => {

  const [auth, setAuth] = useAuth();
  const [selectedOption, setSelectedOption] = useState('option1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = false;
  const handleSend = () => {
    props.handleSend(data);
  };

// HANDELE LOGIN
    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        if(selectedOption === 'option1'){
          const {data} = await axios.post('/api/v1/user/create', {name, email, password})
          if(data.success){
            localStorage.setItem('auth', JSON.stringify(data))
            setAuth({...auth, user: data?.user, token: data?.token});
            handleSend();
          }
        }else{
          const {data} = await axios.post('/api/v1/user/login', {name, email, password})
          if(data.success){
            localStorage.setItem('auth', JSON.stringify(data))
            setAuth({...auth, user:data?.user, token:data?.token});
            handleSend();
          }
        }
      } catch (error) {
        
      }
    }
  return (
    <div className='login'>
      <div className='login-liner'>
      <div className='login-fomrm-cross' onClick={handleSend}><ImCross/></div>
      <div className="login-container">
        <div className="radioButtonGroup">
          <button className={`radioButton ${selectedOption === 'option1' ? 'selected' : ''}`}
            onClick={(e) => setSelectedOption('option1')}>Create
          </button>

          <button className={`radioButton ${selectedOption === 'option2' ? 'selected' : ''}`}
            onClick={(e) => setSelectedOption('option2')}>Login
          </button>
        </div>

{/* input */}
        <form className='login-form' onSubmit={handleLogin}>
          <h2 className='login-form-heading'>{selectedOption === "option1" ? "Create" : "Login"} Account</h2>

          <div className='login-form-items'>
            <div className='login-form-icon'><FaUser/></div>
            <input type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              placeholder='Enter Your Name'
              className='login-form-input'
              required/>
          </div>

          <div className='login-form-items'>
            <div className='login-form-icon'><IoIosMail/></div>
            <input type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='login-form-input'
              required/>
          </div>

          <div className='login-form-items'>
            <div className='login-form-icon'><FaLock/></div>
            <input type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='login-form-input'
              required/>
          </div>
          <button type='submit' className='login-form-submit'>{selectedOption === "option1" ? "Create" : "Login"}</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default LoginModel
