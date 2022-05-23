const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer  = require('multer');
const mongoose = require("mongoose");
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// var upload = multer({ storage: storage })

exports.createProduct = (req, res) =>
 {
  const product = new Product(req.body);

  product.productImagePath = req.file.path;
 
  product.save((err, product) => 
  {
    if (err) 
    {

      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",
          err: err
        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save Product in DBs",
          messgae : err
         
        });
      }
      }

     
    res.json({ product });
  });
};


exports.getAllProducts =
   (req, res) => 
  {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO Product found"
        });
      }
      res.json(product);
    });
  };


exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};


exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
  };
// // delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Product Successfully deleted",
      deletedProduct
    });
  });
};

exports.updateProduct = (req, res) => {
  const product = req.product;
  product.name = req.body.name;


  product.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update pro"
      });
    }
    res.json(updatedCategory);
  });
};


exports.getProductByCategoryId = (req,res,next,id) => {
  var cat_id = mongoose.Types.ObjectId(id);

  Product.find({category:cat_id})
  .populate("category")
  .exec((err,products) =>{
    if(err)
    {
      return res.status(400).json({
        error: "Product not found"
      });
    }
   
    req.products = products;//variable
    next();
  });
};

exports.getCategoryProduct = (req, res) => {
  return res.json(req.products);}

