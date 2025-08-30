
const slugify = require("slugify");
const categoryListModel = require("../../models/categoryListModel");

// ======================= ADD CATEGORY =======================
module.exports.addCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                errorMessage: { name: "Please provide a category name" }
            });
        }

        const newCategory = new categoryListModel({
            name: name.trim(),
            slug: slugify(name) + "-" + Date.now(), // unique slug
            parentId: parentId || null
        });

        await newCategory.save();

        // Return updated category list
        const categoryList = await categoryListModel.find({}).sort({ createdAt: -1 });

        return res.status(201).json({
            successMessage: "Category added successfully",
            category: newCategory,
            categoryList
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errorMessage: { error: "Internal server error" }
        });
    }
};

// ======================= GET CATEGORIES =======================
function createCategories(categories, parentId = null) {
    const categoryList = [];
    let filteredCategories;

    if (parentId == null) {
        filteredCategories = categories.filter(cat => !cat.parentId);
    } else {
        filteredCategories = categories.filter(cat => String(cat.parentId) === String(parentId));
    }

    for (let cate of filteredCategories) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;
}

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryListModel.find({});
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
    } catch (error) {
        res.status(500).json({
            errorMessage: { error: "Internal server error" }
        });
    }
};

// ======================= UPDATE CATEGORIES =======================
module.exports.updateCategories = async (req, res) => {
    try {
        const { _id, name, parentId, type } = req.body;

        const updatedCategories = [];

        // Handle multiple updates
        if (Array.isArray(_id)) {
            for (let i = 0; i < _id.length; i++) {
                const category = { name: name[i], type: type[i] };
                if (parentId[i] !== "") category.parentId = parentId[i];

                const updatedCategory = await categoryListModel.findByIdAndUpdate(
                    _id[i],
                    category,
                    { new: true }
                );
                updatedCategories.push(updatedCategory);
            }
            return res.status(201).json({ updatedCategories });
        } else {
            // Single update
            const category = { name, type };
            if (parentId !== "") category.parentId = parentId;

            const updatedCategory = await categoryListModel.findByIdAndUpdate(
                _id,
                category,
                { new: true }
            );
            return res.status(201).json({ updatedCategory });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: { error: "Internal server error" } });
    }
};

// ======================= DELETE CATEGORIES =======================
module.exports.deleteCategories = async (req, res) => {
    try {
        const { ids } = req.body.payload; // expecting array of _id strings

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "No category IDs provided" });
        }

        const deletedCategories = [];

        for (let i = 0; i < ids.length; i++) {
            const deletedCategory = await categoryListModel.findByIdAndDelete(ids[i]);
            deletedCategories.push(deletedCategory);
        }

        if (deletedCategories.every(c => c !== null)) {
            res.status(201).json({ message: "Categories removed" });
        } else {
            res.status(400).json({ message: "Some categories could not be deleted" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: { error: "Internal server error" } });
    }
};


/*

module.exports.addCategory = async (req, res) => {
    console.log(req.body); 
    try {
        const { name, parentId } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                errorMessage: { name: "Please provide a category name" }
            });
        }

        // create new category list entry
        const cat = new categoryListModel({
            name: name.trim(),
            slug: slugify(name) + "-" + Date.now(), // unique slug
            parentId: parentId || null
        });

        await cat.save();

        // get updated list
        const categoryList = await categoryListModel.find({}).sort({ createdAt: -1 });

        return res.status(201).json({
            successMessage: "Category added successfully",
            category: cat,
            categoryList
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errorMessage: { error: "Internal server error" }
        });
    }
};


module.exports.addCategory = async (req, res) => {
    // console.log('calladd');
     console.log(req); 
     const { name, parentId } = req.body;
     console.log(req.body);
    // console.log(name);
    // console.log(parentId);
    // console.log(req);
    
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };  
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    
    
    try {
        const cat = new categoryListModel(
            // categoryObj
            
            {
            name: req.body.name,
            slug: slugify(req.body.name),
            parentId: req.body.parentId || null
            }
            
         )
         await cat.save();
        // await cat.save((error,category) => {
        //    if(error) return res.status(400).json({error});
        //    if(category){
        //        return res.status(201).json({category});
        //    }
        // })
        // res.status(201).json({
        //    cat,
        //    successMessage: 'Category add successfull'
        //    }
        //)
        // res.status(201).json(cat);
        
        res.status(201).json({ category: cat });


    } catch (error) {
         res.status(400).json({ error: error.message });
    }
    
    
}
*/

/*
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
module.exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryListModel.find({});
        const categoryList = createCategories(categories);
        res.status(200).json({
            // categories,
            categoryList
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
}
*/

/*
module.exports.updateCategories = async (req, res) => {
     
    // console.log(req); 
    // console.log(req.body); 
    
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];

    if(name instanceof Array){
        for (let i = 0; i < name.length; i++) {
            const category = {
              name: name[i],
              type: type[i],
            };
            if (parentId[i] !== "") {
              category.parentId = parentId[i];
            }
      
            const updatedCategory = await categoryListModel.findOneAndUpdate(
              { _id: _id[i] },
                category,
              { new: true }
            );
            updatedCategories.push(updatedCategory);
            return res.status(201).json({ updateCategories : updatedCategories });
        }
    }
    if (Array.isArray(name)) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i],
            };
            if (parentId[i] !== "") category.parentId = parentId[i];

            const updatedCategory = await categoryListModel.findByIdAndUpdate(
                _id[i],  // safer than findOneAndUpdate
                category,
                { new: true }
            );
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updatedCategories });
    } else{
        const category = {
            name,
            type,
          };
          if (parentId !== "") {
            category.parentId = parentId;
          }
          const updatedCategory = await categoryListModel.findOneAndUpdate(
            { _id }, 
            category, 
            {new: true}
          );
        return res.status(201).json({ updatedCategory });
    }
    

    res.status(200).json({
        body: req.body
    });
    
   
}


module.exports.deleteCategories = async (req, res) => {
  console.log(req.body);
  // console.log(req); 
  
  const { ids } = req.body.payload;
  console.log(ids); 
  
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
      // createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }

    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deletedCategory = await categoryListModel.findByIdAndDelete(ids[i]);
        deletedCategories.push(deletedCategory);
    }

    if (deletedCategories.every(c => c !== null)) {
        res.status(201).json({ message: "Categories removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
}

};
*/


