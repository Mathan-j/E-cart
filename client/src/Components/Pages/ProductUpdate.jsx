import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ProductUpdate = () => {
  const location = useLocation().state
  const navigate = useNavigate()
  console.log(location);

  const [productName, setProductName] = useState(location.productName);
  const [productDescription, setProductDescription] = useState(location.productDescription);
  const [productPrice, setProductPrice] = useState(location.productPrice);
  const [productQuantity, setProductQuantity] = useState(location.productQuantity);
  const [productCategory, setProductCategory] = useState(location.productCategory);
  const [productImage, setProductImage] = useState(location.productImage);

  const dataToSendBackend = {
    _id: location._id,  // this should be fetched from the url parameters
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productCategory,
    productImage
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    const getToken =()=>{
      return localStorage.getItem("token");
    }
    await axios
    .put("http://localhost:5000/api/product/update",dataToSendBackend,{
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((res)=>{console.log(res.data.message);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",         
        });
        setTimeout(()=>{

        },5000)
        navigate("/")
    })
    .catch((err)=>{console.log(err);
    });
  }

  console.log(dataToSendBackend);


  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Form onSubmit={handleUpdate} className='shadow-lg p-5 rounded-3'>
        <h4 className='pb-3 text-center'>Update Product</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Control type="Text" placeholder="Enter Product Name" value={productName} 
          onChange={(e) => setProductName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="Text"
            as="textarea"
            rows={3}
            placeholder="Enter Product Description"
            value={productDescription} 
            onChange={(e) => setProductDescription(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="number" placeholder="Product Price" value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="number" placeholder="Product Quantity" value={productQuantity} 
          onChange={(e) => setProductQuantity(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="Text" placeholder="Enter Product Category" value={productCategory} 
          onChange={(e) => setProductCategory(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <img src={productImage} width={100} className='pb-3' alt="" />
          <Form.Control type="Text"
            as="textarea"
            rows={3}
            placeholder="Enter Product Image"
            value={productImage} 
            onChange={(e) => setProductImage(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  )
}


export default ProductUpdate