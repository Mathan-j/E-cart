import React, {useState,useEffect }  from 'react'
import axios from 'axios';
import {Container, Table} from 'react-bootstrap';
import {MdSystemUpdateAlt,MdDelete} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserController = () => {

    const [user,setUser] = useState([]);
    const navigate = useNavigate();

    const getToken =()=>{
      return localStorage.getItem("token");
    }
    const getUser = () => {
      axios.get("http://localhost:5000/api/user/get",{
        headers: { Authorization: `Bearer ${getToken()}` }
      })       
      .then((res)=>{
        console.log(res.data.users);
        setUser(res.data.users)
      })    
      .catch((err)=>{
        console.log(err);
      });
    }

    useEffect(()=>{
      getUser();
    },[])

    const handleUpdate = (data) => {
      console.log(data);
      navigate("/user-update" ,{ state: data});
    };

    const handleDelete = (data) => {
      axios.delete(`http://localhost:5000/api/user/delete/${data._id}`,{
        headers: { Authorization: `Bearer ${getToken()}` }
      })       
      .then((res)=>{
        console.log(res.data.users);
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
          setUser(res.data.updatedUsers);
        
      })    
      .catch((err)=>{
        console.log(err);
      });
    }

  return (
    <Container className='py-5'> 
     <h2>User Controller</h2>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Image</th>
          <th>User Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {user.map((data,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{data.userName}</td>
            <td>{data.userEmail}</td>
            <td><img src={data.userImage} width={100} alt="" className='rounded-circle'/></td>
            <td>{data.userRole}</td>        
            
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

export default UserController