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
        if (isCategoryAvailable) return res.render('addCategory', { error: "Category already exist!" })
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
        return res.render('categoryMaster', { category })
    } catch (err) {
        return res.send(err)
    }
}

export const renderCategoryDetails = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Categories.findById({ _id: id }).exec();
        return res.render('categoryDetails', { category })
    } catch (err) {
        return res.send(err)
    }
}

export const renderUpdateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Categories.findById({ _id: id }).exec();
        console.log(category);
        return res.render('updateCategory', { category, error: null })

    } catch (err) {
        return res.send(err)
    }
}

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const { categoryName } = req.body
        if (!categoryName) return res.send(error = "Category name is manadatory!")
        const isCategoryAvailable = await Categories.findOne({ categoryName }).exec();
        if (isCategoryAvailable) return res.send(error = "Category already exist!")
        const category = await Categories.findByIdAndUpdate({ _id: id }, { categoryName }).exec();
        await category.save();
        return res.redirect('/category/categoryMaster')

    } catch (err) {
        return res.send(err)
    }
}


export const renderDeleteCategory = async (req, res) => {
    try {
        const id= req.params.id
        const category = await Categories.findById({_id: id}).exec();
        return res.render('deleteCategory', {category})
    } catch (err) {
        return res.send(err)
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id= req.params.id
        const category = await Categories.findByIdAndDelete({_id:id}).exec();
        await category.save();
        return res.redirect('/categoryMaster')
    } catch (err) {
        return res.send(err)
    }
}
