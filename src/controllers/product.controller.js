import path from'path';
import ProductModel from '../models/product.model.js';
import { error } from 'console';

export default class ProductController{
    getproducts(req,res){
        let prods = ProductModel.get();
        //console.log(prods);
        //console.log(path.resolve());// return execution directory hence we ran the methodfrom index.js 
        // return res.sendFile(path.join(path.resolve(),"src","views","products.html"));
        res.render("products",{prods:prods});
    }

    getAddForm(req,res){
        res.render("new-product",{errorMessage:null});
    }

    addNewProduct(req,res){
        ProductModel.append(req.body); // req . body gets the prod data in obj form 
        let prod = ProductModel.get();
        return res.render("products",{prods:prod}); // make sure the key is prods as its used in product ejs better to use an enum and save it as prods 
    }

    getUpdateProductView(req,res,next){
        // if prod exist return view
        const id = req.params.id;
        
        // const {id} = req.body;
        const prodFound = ProductModel.getByID(id);
        if(prodFound){
            res.render("update-product",{product:prodFound,errorMessage:null});
        }
        else{
            res.status(401).send("product not found");
        }
    }

    postUpdateProduct(req,res){
        console.log(req.body);
        ProductModel.update(req.body); // req . body gets the prod data in obj form 
        let prod = ProductModel.get();
        return res.render("products",{prods:prod});
    }

    deleteProduct(req,res){
        const id = req.params.id;
        const prodFound = ProductModel.getByID(id);
        if(prodFound){
            ProductModel.delete(id);
            let prod = ProductModel.get();
            return res.render("products",{prods:prod});
        }
        else{
            res.status(401).send("product not found");
        }

        
        
    }
} 