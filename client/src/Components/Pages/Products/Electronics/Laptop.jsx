import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, {useState,useEffect }  from 'react'
import axios from 'axios';

const Laptop = () => {
  const [product,setProduct] = useState([]);



  const dataToSendBackend =   {
    productCategory:"laptop"
  }

  
  const getProduct = () => {
    const getToken =()=>{
      return localStorage.getItem("token");
    }
    
    axios.post("http://localhost:5000/api/product/get-product-category",dataToSendBackend,{
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
  return (
    <div className='d-flex flex-wrap gap-4 p-5 justify-content-center'>
  {product.map((data) => (
   <Card style={{ width: '18rem'  }}>
   <div>
   <Card.Img
     variant="top"
     src={data.productImage}
      
   />
   </div>
   <Card.Body  >
     <div className='d-flex justify-content-between'>
       <Card.Title>{data.productName}</Card.Title>
       <Card.Text className='text-danger'>Stock: {data.productQuantity}</Card.Text>
     </div>
     <Card.Text style={{ flex: '1' }}>{data.productDescription}</Card.Text>
     <div className='d-flex justify-content-between align-items-end'>
       <Button variant="primary">Add to Cart</Button>
       <Card.Text>₹{data.productPrice}</Card.Text>
     </div>
   </Card.Body>
 </Card>
 
  ))}
</div>

  )
}

export default Laptop