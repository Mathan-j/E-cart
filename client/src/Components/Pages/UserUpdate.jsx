import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UserUpdate = () => {
  const location = useLocation().state
  const navigate = useNavigate()
  console.log(location);

  const [userName, setUserName] = useState(location.userName);
  const [userEmail, setUserEmail] = useState(location.userEmail);
  const [userImage, setUserImage] = useState(location.userImage);
  const [userRole, setUserRole] = useState(location.userRole);

  const dataToSendBackend = {
    _id: location._id,  // this should be fetched from the url parameters
    userName,
    userEmail,
    userImage,
    userRole
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
    await axios
    .put("http://localhost:5000/api/user/update",dataToSendBackend,{
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
          navigate("/admin/product")
        },5000)
        
    })
    .catch((err)=>{console.log(err);
    });
  }

  console.log(dataToSendBackend);


  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Form onSubmit={handleUpdate} className='shadow-lg p-5 rounded-3'>
        <h4 className='pb-3 text-center'>Update User</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Control type="Text" placeholder="userName" value={userName} 
          onChange={(e) => setUserName(e.target.value)} />
        </Form.Group>        

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="Text" placeholder="userEmail" value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="Text" placeholder="userImage" value={userImage} 
          onChange={(e) => setUserImage(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="Text" placeholder="userRole" value={userRole} 
          onChange={(e) => setUserRole(e.target.value)}/>
        </Form.Group>      
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  )
}


export default UserUpdate