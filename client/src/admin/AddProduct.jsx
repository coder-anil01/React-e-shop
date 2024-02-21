import React, { useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from "react-icons/fi";
import { BsSignStopFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import '../style/Product.css';
import axios from 'axios';
import { FaPlusCircle } from "react-icons/fa";
import {toast} from 'react-toastify';

const AddProduct = () => {
  const [allCategories, setAllCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [usergender, setUsergender] = useState('');
  const [description, setDescription] = useState('');
  const [desPoints, setDesPoints] = useState([]);
  const [images, setImages] = useState([]);
  const [submitButton, setSubmitButton] = useState('Submit');
  const [desPointscount, setDesPointscount] = useState(['1']);

  const getCategories = async() => {
    try {
      const {data} = await axios.get('/api/v1/category/get')
      setAllCategories(data.category);
      console.log(data.category);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const render = new FileReader();
    if(file){
      render.readAsDataURL(file);
      render.onload = () => {
        setImages((prev) => [...prev, render.result])
      }
    }
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const desPointsChange = (index, e) => {
    const chageData = e.target.value;
    const prevData = [...desPoints];
    prevData[index] = chageData;
    setDesPoints(prevData);
  }
  
  const handleCreateitem = async(e) => {
    setSubmitButton('Uploading...')
    e.preventDefault();
    console.log(title, price, rating, category, usergender, description, desPoints)
    try {
      const {data} = await axios.post('/api/v1/product/create',
      {title, price, rating, category,images, usergender, description, desPoints})
      if(data.success){
        setTitle(''); setPrice(''); setRating(''); setDescription(''); setDesPoints([]); setImages([]); setDesPointscount(['1']); setSubmitButton('Submit');
      }
    } catch (error) {
      setSubmitButton('Submit')
      console.log(error);
      toast.error('Internal Server Error');
    }
  }

  return (
    <div className='admin-add-item'>
      <form onSubmit={handleCreateitem} className="admin-add-item-form">
        <div className="admin-add-item-wrap-container">
          <div className="admin-add-item-card">
            <div className='admin-add-item-lable'>Title *</div>
            <input type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className='admin-add-item-input'
              placeholder='Title' />
          </div>

          <div className="admin-add-item-card">
            <div className='admin-add-item-lable'>Price *</div>
            <input type="Number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='admin-add-item-input'
              placeholder='Price' />
          </div>

          <div className="admin-add-item-card">
            <div className='admin-add-item-lable'>Rating *</div>
            <input type="text"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              className='admin-add-item-input'
              placeholder='Rating By Owner' />
          </div>

          <div className="admin-add-item-card">
            <div className='admin-add-item-lable'>Category *</div>
            <select defaultValue={category} onChange={(e)=> {setCategory(e.target.value)}} className='admin-add-item-select'>
              {allCategories.map((c)=>(
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="admin-add-item-card">
            <div className='admin-add-item-lable'>User Gender *</div>
            <select onChange={(e)=> setUsergender(e.target.value)} className='admin-add-item-select'>
              <option value="Male And Female">Male And Female</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="admin-add-item-card">
          <div className='admin-add-item-lable'>Description *</div>
          <textarea type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='admin-add-item-input w-100'
            placeholder='Description' />
        </div>
        <div className="admin-add-item-card">
          <div className='admin-add-item-lable'>Bulet Points Description (optional)</div>
          {desPointscount.map((p, index)=> (
              <textarea key={index} type="text"
                value={desPoints[index]}
                onChange={(e) => desPointsChange(index, e)}
                className='admin-add-item-input w-100'
                placeholder={`${index+1} Bulet Points Description`} />
          )) 
        }
        <div className='admin-add-item-bullet-icon' onClick={()=> setDesPointscount((prev) => [...prev, '1'])}><FaPlusCircle/></div>
        {desPoints}
        </div>
        
        <div {...getRootProps()} className='admin-add-item-image-post'>
          <input {...getInputProps()} />
          { isDragActive ?
            <div className='admin-add-item-image-text'>Drop Image</div> :
            <div>
              {images[3] ? <BsSignStopFill className='admin-add-item-image-stop-icon'/> :
              <div><FiUpload className='admin-add-item-image-icon'/>
              <p className='admin-add-item-image-text'>Drag, Drop and click to Upload Image</p> </div>}
            </div>}
        </div>
        {images.length >=1 && <div className="admin-add-item-prev-img">
          <img src={images[0]} alt="" className="admin-add-item-prev-img-card" />
          <img src={images[1]} alt="" className="admin-add-item-prev-img-card" />
          <img src={images[2]} alt="" className="admin-add-item-prev-img-card" />
          <img src={images[3]} alt="" className="admin-add-item-prev-img-card" />
          <div className="admin-add-item-prev-img-delete" onClick={()=> setImages([])}><MdDelete/></div>
        </div>}
        <button className='admin-create-submit' onClick={handleCreateitem} type='submit'>{submitButton}</button>
      </form>
    </div>
  )
}

export default AddProduct
