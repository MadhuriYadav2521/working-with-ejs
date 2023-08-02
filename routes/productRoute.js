import express from "express"
import { renderAllProducts } from "../conrtollers/productController.js"

const productRouter = express.Router()

productRouter.get('/product/productMaster',renderAllProducts)

export default productRouter

