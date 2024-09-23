import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

const AddProduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '',
        productCategory: 'laptop',
        productImage: '' // This will store the Cloudinary URL
    });
    const [filePreview, setFilePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Cloudinary configuration
    const cloudName = 'dhr2jhkqs'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'E-cart'; // Replace with your unsigned upload preset

    // Handling file drop via react-dropzone
    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            console.log('No files selected or file type not accepted.');
            return;
        }

        const file = acceptedFiles[0];
        setFilePreview(URL.createObjectURL(file)); // Preview the image
        setUploading(true); // Set uploading to true to show the upload state

        // Create FormData object for Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            // Upload image to Cloudinary
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );
            const imageUrl = response.data.secure_url;
            setProduct({ ...product, productImage: imageUrl });
            setUploading(false); // Set uploading to false once done
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    });

    // Handle form input changes
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    
  
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();        

        try {
            const getToken =()=>{
                return localStorage.getItem("token");
              }
            await axios.post('http://localhost:5000/api/product/post', product,{
                headers: { Authorization: `Bearer ${getToken()}` }
              });
            alert('Product added successfully');
             // Clear form inputs after successful submission
             setProduct({
                productName: '',
                productDescription: '',
                productPrice: '',
                productQuantity: '',
                productCategory: 'laptop',
                productImage: ''
             });
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
            alert('Error adding product. Check the console for details.');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2 className="text-center">Add Product</h2>
                    <Form onSubmit={handleSubmit}>
                  <Form.Group className='d-flex justify-content-between'>                  
                        <Form.Group controlId="productName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="productPrice"
                                value={product.productPrice}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                  </Form.Group>

                  <Form.Group controlId="productDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="productDescription"
                                rows={3}
                                value={product.productDescription}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                       <Form.Group className='d-flex justify-content-between'>
                       <Form.Group controlId="productQuantity">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="productQuantity"
                                value={product.productQuantity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="productCategory">
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="productCategory"
                                value={product.productCategory}
                                onChange={handleChange}
                                required
                            >
                                <option value="laptop">Laptop</option>
                                <option value="mobile">Mobile</option>
                                <option value="desktop">Desktop</option>
                                <option value="tablet">Tablet</option>
                            </Form.Control>
                        </Form.Group>
                       </Form.Group>

                        <Form.Group>
                            <Form.Label>Product Image</Form.Label>
                            <div
                                {...getRootProps({ className: 'dropzone' })}
                                className="border p-4 text-center"
                                style={{ cursor: 'pointer', borderRadius: '5px' }}
                            >
                                <input {...getInputProps()} />
                                <p>Drag & drop an image here, or click to select one</p>
                                {filePreview && (
                                    <img
                                        src={filePreview}
                                        alt="Product Preview"
                                        className="img-fluid mt-2"
                                        style={{ maxHeight: '200px' }}
                                    />
                                )}
                                {uploading && <p>Uploading to Cloudinary...</p>}
                            </div>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3" disabled={uploading}>
                            Add Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;
