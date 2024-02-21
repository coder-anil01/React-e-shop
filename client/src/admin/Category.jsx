import React, { useCallback, useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import '../style/Category.css'
import { FiUpload } from "react-icons/fi";
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";


const Category = () => {

  const[newCategory, setNewCategory] = useState('');
  const[newImage, setNewImage] = useState('');
  const[updateCategory, setUpdateCategory] = useState('');
  const[updateImage, setUpdateImage] = useState('');
  const[updatecategoryid, setUpdatecategoryid] = useState('');
  const[submitButton, setSubmitButton] = useState('submit');
  const[categories, setCategories] = useState([]);
  const[updatemodel, setUpdatemodel] = useState(false);
  const[deletemodel, setDeletemodel] = useState(false);

  const getCategory = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get')
      setCategories(data?.category)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCategory();
  },[])

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const render = new FileReader();
    if(file){
      render.readAsDataURL(file);
      render.onload = () => {
        setNewImage(render.result)
      }
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

// ADD
  const createCategory = async(e) => {
    e.preventDefault();
    setSubmitButton('Uploading...')
    try {
      const {data} = await axios.post('/api/v1/category/create', {name:newCategory, image:newImage})
      setSubmitButton('Submit')
      if(data.success){
        toast.success(data.message)
        setNewCategory('');
        setNewImage('');
        getCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      setSubmitButton('Submit');
      console.log(error);
    }
  }

  const updatemodelOpen = (id, name, image) => {
    setUpdatemodel(true);
    setUpdatecategoryid(id);
    setUpdateCategory(name);
    setUpdateImage(image);
  }


  // UPDATE
  const handleUpdateCategory = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/category/update', {id: updatecategoryid, name: updateCategory, image:newImage})
      setNewImage('');
      if(data.success){
        getCategory();
        setUpdatemodel(false)
      }
    } catch (error) {
      console.log(error)
      setNewImage('')
    }
  }
  

  const deletemodelOpen = (id, image) => {
    setDeletemodel(true)
    setUpdateImage(image);
    setUpdatecategoryid(id)
  }

// DELETE
  const deletCategory = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.delete(`/api/v1/category/delete/${updatecategoryid}`)
      toast.success(data.message);
      getCategory();
      setDeletemodel(false);
    } catch (error) {
      console.log(error)
      toast.error("Internal Server Error")
    }
  }

  return (
    <>
    <div className='admin'>
      <div className='admin-container'>
        <AdminMenu/>
        <div className='admin-container-right'>
            <h3 className='admin-heading-h3'>Add Category</h3>
            <form onSubmit={createCategory} className='admin-category-form'>
              <input type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder='New Category'
                className='admin-category-input'
                required/>

              <div {...getRootProps()} className='admin-category-image-upload-area'>
                <input {...getInputProps()} />
                {newImage ?<img className='admin-category-image-upload' src={newImage} alt="" />:
                <><div className='admin-category-upload-icon'><FiUpload/></div> <div className='admin-category-upload-img-text'>Drag and Drop Image</div></>}
              </div>

              <button className='admin-create-submit' type='submit'>{submitButton}</button>
            </form>

{/* SHOW CATEGORIES */}
            <div className="admin-show-category">
                  {categories.map((c)=> (
                  <div key={c._id} className="admin-show-category-card">
                    <img src={c?.image} alt="" className="admin-show-category-image" />
                    <div className="admin-show-category-icon">
                      <div onClick={() => updatemodelOpen(c?._id, c?.name, c?.image)}><FaEdit/></div>
                      <div onClick={() => deletemodelOpen(c?._id, c?.image)}><RiDeleteBinFill/></div>
                    </div>
                    <div className="admin-show-category-name">{c?.name}</div>
                  </div>
                  ))}
            </div>
        </div>
      </div>
    </div>
{/* UPDATE */}
    {updatemodel && <div className='admin-category-update'>
      <form onSubmit={handleUpdateCategory} className='admin-category-form'>
        <div className='admin-category-update-close' onClick={()=> setUpdatemodel(false)}><IoMdCloseCircle/></div>
        <input type="text"
          value={updateCategory}
          onChange={(e) => setUpdateCategory(e.target.value)}
          placeholder='New Category'
          className='admin-category-input'
          required/>

        <div {...getRootProps()} className='admin-category-image-upload-area'>
          <input {...getInputProps()} />
          {updateImage ?<img className='admin-category-image-upload' src={updateImage} alt="" />:
          <><div className='admin-category-upload-icon'><FiUpload/></div> <div className='admin-category-upload-img-text'>Drag and Drop Image</div></>}
        </div>
        <button className='admin-create-submit' type='submit'>{submitButton}</button>
      </form>
    </div>}
    
    {deletemodel && <div className='admin-category-update'>
      <form onSubmit={deletCategory} className='admin-category-form'>
        <div className='admin-category-update-close' onClick={()=> setDeletemodel(false)}><IoMdCloseCircle/></div>
        <div className='admin-category-image-upload-area'>
          <img className='admin-category-image-upload' src={updateImage} alt="" />
        </div>
        <button className='admin-create-submit' type='submit'>{submitButton}</button>
      </form>
    </div>}
    </>
  )
}

export default Category
