import React, {useState,useEffect }  from 'react'
import axios from 'axios';
import {Container, Table,Button} from 'react-bootstrap';
import {MdSystemUpdateAlt,MdDelete} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductController = () => {

    const [product,setProduct] = useState([]);
    const navigate = useNavigate();

    const getToken =()=>{
      return localStorage.getItem("token");
    }

    const getProduct = () => {
      axios.get("http://localhost:5000/api/product/get",{
        headers: { Authorization: `Bearer ${getToken()}` }
      })       
      .then((res)=>{
        console.log(res.data.products);
        setProduct(res.data.products)
      })    
      .catch((err)=>{
        console.log(err);
      });
    }

    useEffect(()=>{
      getProduct();
    },[])

    
    const handleUpdate = (data) => {
      console.log(data);
      navigate("/product-update" ,{ state: data});
    };

    const handleDelete = (data) => {
      axios.delete(`http://localhost:5000/api/product/delete/${data._id}`,{
        headers: { Authorization: `Bearer ${getToken()}` }
      })       
      .then((res)=>{
        console.log(res.data.products);
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
          setProduct(res.data.updatedProducts);
        
      })    
      .catch((err)=>{
        console.log(err);
      });
    }

  return (
    <Container className='py-5'> 
    <div className='d-flex justify-content-between pb-3 ' >
    <h2>Product Controller</h2>
    <Button size="md" href='/add-product' variant='dark'  >Add Product</Button>
    </div>
    <Table striped bordered hover size="sm" className='pb-7'>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Product Description</th>
          <th>Product Price</th>
          <th>Product Quantity</th>
          <th>Product Category</th>
          <th>Product Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {product.map((data,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{data.productName}</td>
            <td>{data.productDescription}</td>
            <td>{data.productPrice}</td>
            <td>{data.productQuantity}</td>
            <td>{data.productCategory}</td>          
            <td><img src={data.productImage} width={100} alt="" /></td>
            <td className='d-flex gap-3'><MdSystemUpdateAlt onClick={()=>handleUpdate(data)} className='fs-3'/>
            <MdDelete  onClick={()=>handleDelete(data)} className='fs-3'/>              
            </td>
          </tr>
        ))}                
      </tbody>
    </Table> 
    <ToastContainer />
    </Container>
  )
}

export default ProductController