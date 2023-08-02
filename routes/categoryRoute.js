import express from "express"
import { addCategory, allCategories, deleteCategory, renderAddCategory, renderCategoryDetails, renderDeleteCategory, renderUpdateCategory, updateCategory } from "../conrtollers/categoryController.js";
const categoryRouter = express.Router()

categoryRouter.get('/', async (req,res) =>{
    try{
        return res.render('index')
    }catch(err){
        return res.send(err)
    }
})
categoryRouter.get('/category/addCategory',renderAddCategory)
categoryRouter.post('/category/addCategory',addCategory)
categoryRouter.get('/category/categoryMaster',allCategories)
categoryRouter.get('/category/details/:id',renderCategoryDetails)
categoryRouter.get('/category/update/:id',renderUpdateCategory)
categoryRouter.post('/category/update/:id',updateCategory)
categoryRouter.get('/category/delete/:id',renderDeleteCategory)
categoryRouter.post('/category/delete/:id',deleteCategory)















export default categoryRouter;