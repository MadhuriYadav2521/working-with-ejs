import Categories from "../modals/categoryModal.js"

export const renderAddCategory = async (req, res) => {
    try {
        return res.render('addCategory', { error: null })
    } catch (err) {
        return res.send(err)
    }
}

export const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        if (!categoryName) return res.render('addCategory', { error: "Category is required!" }) 
        const isCategoryAvailable = await Categories.findOne({ categoryName }).exec();
        if (isCategoryAvailable)  return res.render('addCategory', { error: "Category already exist!" }) 
        const category = new Categories({
            categoryName
        })
        await category.save();
        return res.redirect('/category/categoryMaster')
    } catch (err) {
        return res.send(err)
    }
}


export const allCategories = async (req, res) => {
    try {
        const category = await Categories.find({}).exec();
        return res.render('categoryMaster', { category})
    } catch (err) {
        return res.send(err)
    }
}
