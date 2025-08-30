const categoryModel = require("../../models/categoryModel");


module.exports.category_add = async (req, res) => {
    // console.log('call');

    const { categoryName, categoryBody } = req.body;

    const error = {};

    if (!categoryName) {
        error.categoryName = 'Please provide category name';
    }
    if (!categoryBody) {
        error.categoryBody = 'Please provide category description';
    }

    if (Object.keys(error).length == 0) {
        const categorySlug = categoryName.trim().split(' ').join('-');
        try {
            const checkCategory = await categoryModel.findOne({ categorySlug });
            if(checkCategory){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added category'
                    }
                })
            } else {
                await categoryModel.create({
                    categoryName: categoryName.trim(),
                    categorySlug,
                    categoryBody
                })
                res.status(201).json({
                    successMessage: 'Category add successfull'
                })
            }
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }
    } else {
        res.status(400).json({ errorMessage: error });
    }

}


module.exports.category_get = async (req, res) => {
    // console.log(req);
    const { page, searchValue } = req.query;
    const perPage = 8;
    const skipPage = parseInt(page - 1) * perPage;
    if (searchValue === 'undefined' || !searchValue) {
        try {
            const categoryCount = await categoryModel.find({}).countDocuments();
            // console.log(categoryCount);
            const getCategory = await categoryModel.find({}).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
            // console.log(getCategory);
            res.status(200).json({
                allCategory: getCategory,
                perPage,
                categoryCount
            });
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            });            
        }
    } else {
        try {
            const categoryCount = await categoryModel.find({}).countDocuments();
            let getCategory = await categoryModel.find({});
            getCategory = getCategory.filter(c => c.categoryName.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
            res.status(200).json({
                allCategory: getCategory,
                perPage,
                categoryCount
            });
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            }); 
        }
    }
}


module.exports.category_delete = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        await categoryModel.findByIdAndDelete(categoryId);
        res.status(200).json({
            successMessage: 'Category delete success'
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        })
    }
}



module.exports.category_edit = async (req, res) => {
    const {categorySlug} = req.params;
    try {
        const editCategory = await categoryModel.findOne({categorySlug});
        res.status(200).json({
            editCategory
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        })
    }
}


module.exports.category_update = async (req, res) => {
    const {categoryId} = req.params;
    const { categoryName, categoryBody } = req.body;

    const error = {};

    if (!categoryName) {
        error.categoryName = 'Please provide category name';
    }
    if (!categoryBody) {
        error.categoryBody = 'Please provide category description';
    }

    if (Object.keys(error).length == 0) {
        const categorySlug = categoryName.trim().split(' ').join('-');
        try {
             
                await categoryModel.findByIdAndUpdate( categoryId, {
                    categoryName: categoryName.trim(),
                    categorySlug,
                    categoryBody
                })
                res.status(200).json({
                    successMessage: 'Category update successfull'
                })
             
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }
    } else {
        res.status(400).json({ errorMessage: error });
    }
}


