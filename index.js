import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadfile } from './src/middlewares/fileUpload.middleware.js';

const server = express();
// for body parsing as post req are mostly text not readable format 
server.use(express.urlencoded({extended:true}));

const productController = new ProductController(); // couldve used singleton pattern 


// setup a view engine 
server.set("view engine","ejs");
// where the ejs would find the views

//server.set("views","./src/views")
server.set("views",path.join(path.resolve(),"src","views"));

// use ejs layouts to edit header foother and views separately
server.use(ejsLayouts);

server.use(express.static('src/views'));
server.use(express.static("./public"));

server.get("/",productController.getproducts);
server.get("/new",productController.getAddForm);
server.post("/",[uploadfile.single("imageUrl"),validationMiddleware],productController.addNewProduct);

server.get("/update-product/:id",productController.getUpdateProductView);
server.post("/update-product",productController.postUpdateProduct);

server.get("/delete-product/:id",productController.deleteProduct);
// server.route("/api/users/:id").get((req,res) =>{
//     const id = Number(req.params.id);
//     const user = users.find((myuser)=>myuser.id === id);
//     return res.json(user);

//  }).put((req,res)=>{
    
//     return res.json({status:"pending"});

//  }).delete((req,res)=>{

//     return res.json({status:"pending"});

//  })
//server.put("/",[validationMiddleware],productController.addNewProduct);

server.listen(8080,()=>{
    console.log("server started at 8080");
})