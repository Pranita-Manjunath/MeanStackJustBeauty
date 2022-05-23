const express = require('express')

const router = express.Router();

const {createCategory,getallproduct, getAllCategory,getProductByCategoryId,getCategory,getCategoryById,removeCategory,updateCategory} = require("../controllers/category");


router.post("/category/create/",createCategory);//create
router.get("/categories", getAllCategory);//read

router.param("categoryId", getCategoryById);//When ever you find colon we have to write param which
                                            //acts as a constructor
router.get("/category/:categoryId", getCategory);//:here categoryId is a variable
router.delete("/category/:categoryId",removeCategory);//delete
router.put("/category/:categoryId",updateCategory);//update
module.exports = router;



// CODE:
// const express = require('express')

// const router = express.Router();

// const {getCategoryById,
//   createCategory,
//   getCategory,
//   getAllCategory,
//   updateCategory,
//   removeCategory} = require("../controller/category");

// router.param("categoryId", getCategoryById);

// router.post(
//   "/category/create/",
  
//   createCategory
// );

// router.get("/category/:categoryId", getCategory);
// router.get("/categories", getAllCategory);

// //update
// router.put(
//   "/category/:categoryId",
 
//   updateCategory
// );

// //delete

// router.delete(
//   "/category/:categoryId",

//   removeCategory
// );


// module.exports = router;

