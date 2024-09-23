 const Product = require("../modals/productModel");

const getProduct = async(req,res)=>{
    try{
    const products = await Product.find();
    res.status(200).json({
        message: "Products fetched successfully",
        products: products    
    });
}catch (err){
    res.status(400).send(err);
}
};

const getProductCategory = async(req,res)=>{
    try{
        const {productCategory} = req.body;
    const products = await Product.find({productCategory});
    res.status(200).json({
        message: "Products fetched successfully",
        products: products    
    });
}catch (err){
    res.status(400).send(err);
}
};

const createProduct = async(req,res)=>{
    console.log(req.body);    
    const product = new Product (req.body);
    console.log(product);    
    try{
        const savedProduct = await product.save();
        res.status(201).json({
            message: "Product saved successfully",
            savedProduct: savedProduct
        })
    }catch (err){
        res.status(400).send(err);
    }
};
const updateProduct = async(req,res)=>{
    console.log(req.body);
    const{  
        _id,      
        productName,
        productPrice,
        productDescription,
        productQuantity,
        productCategory,
        productImage
    } = req.body;
     
    const updateProduct = await Product.findByIdAndUpdate(
        _id,
        {
            productName,
            productPrice,
            productDescription,
            productQuantity,
            productCategory,
            productImage
        },
        {new: true}
    );

    if(updateProduct){
        return res.status(200).json({
            message: "Product updated successfully",
            updateProduct: updateProduct
        })
    }
}; 

const deleteProduct = async(req,res)=>{
  try{
    const id = req.params.id;
    console.log("ID TO DELETE",id);

   await Product.findByIdAndDelete(id);
   const updatedProducts =await Product.find() ;

    return res.status(200).json({message:"Delete success",updatedProducts:updatedProducts});
  }
  catch{
    res.status(400).json({message:"Error in server"});
  }
};

module.exports = {
    getProduct,
    getProductCategory,
    createProduct,
    updateProduct,
    deleteProduct
}; 