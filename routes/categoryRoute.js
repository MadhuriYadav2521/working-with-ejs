import express from "express"
import { addCategory, allCategories, renderAddCategory } from "../conrtollers/categoryController.js";
const categoryRouter = express.Router()

categoryRouter.get('/category/addCategory',renderAddCategory)
categoryRouter.post('/category/addCategory',addCategory)
categoryRouter.get('/category/categoryMaster',allCategories)















export default categoryRouter;