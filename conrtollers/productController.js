import Products from "../modals/productModal.js"

export const renderAllProducts = async (req,res) =>{
    try{
        return res.render('productMaster')
    }catch(err){
        return res.send(err)
    }
}