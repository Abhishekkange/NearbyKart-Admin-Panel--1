const express = require('express');
const Router = express.Router();
const Category = require('../Models/Categories'); 
const Subcategory = require('../Models/Subcategories');
const brand = require('../Models/Brands');
const Size = require('../Models/Size');
const buildProduct = require('../Models/buildProduct');
const { default: mongoose } = require('mongoose');
const catgeory = require('../Models/Categories');
const size = require('../Models/Size');
const addToStore = require('../Models/addToStore');

//fetch all categories
Router.get('/api/getAllCategories', async (req, res) => {
    try {
        const allCategoryList = await Category.find(); 
        res.json(allCategoryList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//fetch all Brands

Router.get('/api/getAllBrands', async (req, res) => {
    try {
        const allBrandList = await brand.find();
        res.json(allBrandList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//fetch all subcategiries

Router.get('/api/getAllSubCategories', async (req, res) => {
    try {
        const allSubategoryList = await  Subcategory.find(); 
        res.json(allSubategoryList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//fetch all sizes

Router.get('/api/getAllSizes', async (req, res) => {

    try {
        const allSizeList = await  Size.find(); 
        res.json(allSizeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//create new catgory
Router.post('/api/createCategory', (req, res) => {

    try {
        const name  = req.body.name;
        const newCategory = new Category({ "categoryName": name }); 
        newCategory.save({categoryName:name});
        res.json("categroy created successfully");

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create subcategories
Router.post('/api/createSubcategory', (req, res) => {
    try {
        const name  = req.body.name;


        const newSubcategory = new Subcategory({ "SubcategoryName": name }); // Corrected field name

        newSubcategory.save({SubcategoryName:name});

        res.json("Subcategroy created successfully");

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create brand
Router.post('/api/createBrand', (req, res) => {
    try {
        const name  = req.body.name;


        const newBrand = new brand({ "brandName": name }); // Corrected field name

        newBrand.save({brandName:name});

        res.json("brand created successfully");

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create subcategories
Router.post('/api/createSubcategory', (req, res) => {
    try {
        const name  = req.body.name;


        const newSubcategory = new Subcategory({ "SubcategoryName": name }); // Corrected field name

        newSubcategory.save({SubcategoryName:name});

        res.json("Subcategroy created successfully");

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create size
Router.post('/api/createSize', (req, res) => {
    try {
        const name  = req.body.name;


        const newSize = new Size({ "size": name }); // Corrected field name

        newSize.save({size:name});

        res.json("size created successfully");

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Route to delete a category from database
Router.post('/api/deleteCategory',async(req,res)=>{

    const id = req.body._id;

    const deleteCategory = await Category.findByIdAndRemove(id);

    if(!deleteCategory)
    {
        res.json({"message":"Category Not found"});
    }
    else{

        res.json({"Message":"category Deleted"});
    }
  
});

//Route to delete a subcategory from database
Router.post('/api/deleteSubcategory',async(req,res)=>{

    const id = req.body._id;

    const deleteSubcategory = await Subcategory.findByIdAndRemove(id);

    if(!deleteSubcategory)
    {
        res.json({"message":"subcategory Not found"});
    }
    else{

        res.json({"Message":"subcategory Deleted"});
    }
  
});


Router.post('/api/deleteBrand',async(req,res)=>{

    const id = req.body._id;

    const deleteBrand = await brand.findByIdAndRemove(id);

    if(!deleteBrand)
    {
        res.json({"message":"brand Not found"});
    }
    else{

        res.json({"Message":"brand Deleted"});
    }
  
});

//delete sizes

Router.post('/api/deleteSize',async(req,res)=>{

    const id = req.body._id;

    const deleteSize = await Size.findByIdAndRemove(id);

    if(!deleteSize)
    {
        res.json({"message":"size Not found"});
    }
    else{

        res.json({"Message":"size Deleted"});
    }
  
});

//remove product from BUild product after product added to store
Router.delete('/api/deleteProduct', async (req, res) => {
    const productId = req.body._id;

    try {
        const deletedProduct = await buildProduct.findByIdAndDelete(productId);

        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//uploading Image to server 

//buildProduct API

Router.post('/api/buildProduct',async(req,res)=>{

    const categorys = req.body.categoryName;
    const subcategory = req.body.subcategoryName;
    const shortDescription = req.body.shortProductDescription
    const description = req.body.Description;
    const designNumber = req.body.designNumber;
    const price = req.body.productPrice;
    const discount = req.body.productDiscount;
    const productImage = req.body.image;
    const name = req.body.name;


    const product = new buildProduct( {

        name: name,
        categories: [
            {
                categoryName: categorys,
                categoryImage: "demo"
            }
        ],
        subcategories: [
            {
                subcategoryName: subcategory,
                subcategoryImage: "demo"
            }
        ],
        price: price,
     
        shopName: "kange collection",
        shortDescription: shortDescription,     
      
        description: description,    
        designNumber: designNumber,
   
        sizes: [{
            
            size:"XL"
        }],
    
        colors:[{
    
            colorName: "white",
            colorCode: "#ffff"
           
        }],
    
        discount: discount,

        image: productImage

        
     
        
    });

    product.save()
    .then(savedUser => {
        console.log('product created', savedUser);
    })
    .catch(err => {
        res.send(err);
    });

    



});

//Router to send product to store
Router.post('/api/addToStore',async(req,res)=>{

    const categorys = req.body.categoryName;
    const subcategory = req.body.subcategoryName;
    const shortDescription = req.body.shortProductDescription
    const description = req.body.Description;
    const designNumber = req.body.designNumber;
    const price = req.body.productPrice;
    const discount = req.body.productDiscount;

    const product = new addToStore( {

        name: "Shirt",
        categories: [
            {
                categoryName: categorys,
                categoryImage: "demo"
            }
        ],
        subcategories: [
            {
                subcategoryName: subcategory,
                subcategoryImage: "demo"
            }
        ],
        price: price,
     
        shopName: "kange collection",
        shortDescription: shortDescription,     
      
        description: description,    
        designNumber: designNumber,
   
        sizes: [{
            
            size:"XL"
        }],
    
        colors:[{
    
            colorName: "white",
            colorCode: "#ffff"
           
        }],
    
        discount: discount,
     
        
    });

    product.save()
    .then(savedUser => {
        console.log('product added to store', savedUser);
    })
    .catch(err => {
        res.send(err);
    });

    



});


// Router to fetch the products that are builded and stage of adding to store
Router.get('/api/products', async (req, res) => {
    try {
        const products = await buildProduct.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Router to fetch a specific product by _id from the request body
Router.post('/api/productById', async (req, res) => {
    try {
        const productId = req.body._id; // Assuming the _id is passed in the request body

        const product = await buildProduct.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});






module.exports = Router;

