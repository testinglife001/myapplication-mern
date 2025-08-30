const articleModel = require("../../models/articleModel");
const blogModel = require("../../models/blogModel");
const userModel = require("../../models/userModel");
// const blogModel = require("../../models/blogModel");
// const userModel = require("../../models/userModel");
// const articleModel = require("../../models/articleModel");
// const blogModel = require("../../models/blogModel");
// const userModel = require("../../models/userModel");

// GET HOME ARTICLES
module.exports.home_article_get = async (req, res) => {
  let { currentPage, searchValue } = req.query;
  currentPage = parseInt(currentPage) || 1;
  const perPage = 6;
  const skipPage = (currentPage - 1) * perPage;

  try {
    let query = {};
    if (searchValue) {
      query = {
        $or: [
          { title: { $regex: searchValue, $options: "i" } },
          { articleText: { $regex: searchValue, $options: "i" } },
        ],
      };
    }

    const [articleCount, articles] = await Promise.all([
      articleModel.countDocuments(query),
      articleModel
        .find(query)
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      articles,
      perPage,
      articleCount,
    });
  } catch (error) {
    console.error("home_article_get error:", error);
    res.status(500).json({ errorMessage: { error: "Internal server error" } });
  }
};

// GET TAGS AND CATEGORIES
module.exports.home_tag_category_get = async (req, res) => {
  try {
    const getCategory = await articleModel.aggregate([
      { $unwind: "$category" },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const getTag = await articleModel.aggregate([
      { $unwind: "$tag" },
      { $group: { _id: "$tag", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      allCategory: getCategory,
      allTag: getTag,
    });
  } catch (error) {
    console.error("home_tag_category_get error:", error);
    res.status(500).json({ errorMessage: { error: "Internal server error" } });
  }
};

// GET CATEGORY ARTICLES
module.exports.category_article_get = async (req, res) => {
  let { currentPage, categorySlug } = req.query;
  currentPage = parseInt(currentPage) || 1;
  const perPage = 6;
  const skipPage = (currentPage - 1) * perPage;

  try {
    const articleCount = await articleModel.countDocuments({
      category_slug: categorySlug,
    });

    const articles = await articleModel
      .find({ category_slug: categorySlug })
      .skip(skipPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({
      categoryArticle: articles,
      perPage,
      categoryArticleCount: articleCount,
    });
  } catch (error) {
    console.error("category_article_get error:", error);
    res.status(500).json({ errorMessage: { error: "Internal server error" } });
  }
};

// GET TAG ARTICLES
module.exports.tag_article_get = async (req, res) => {
  let { currentPage, tagSlug } = req.query;
  currentPage = parseInt(currentPage) || 1;
  const perPage = 6;
  const skipPage = (currentPage - 1) * perPage;

  try {
    const articleCount = await articleModel.countDocuments({ tag_slug: tagSlug });

    const articles = await articleModel
      .find({ tag_slug: tagSlug })
      .skip(skipPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({
      tagArticle: articles,
      perPage,
      tagArticleCount: articleCount,
    });
  } catch (error) {
    console.error("tag_article_get error:", error);
    res.status(500).json({ errorMessage: { error: "Internal server error" } });
  }
};






/*
module.exports.home_article_get = async (req,res) => {
    // console.log(req.query);
    let {currentPage,searchValue} = req.query;
    currentPage = parseInt(currentPage);
    const perPage = 6;
    const skipPage = parseInt(currentPage - 1) * perPage;

    let articles = [];

    try {
        const articleCount = await articleModel.find({}).countDocuments();
        // console.log(articleCount);

        if(searchValue){

        }else{
            articles = await articleModel.find({}).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
        }
        res.status(200).json({
            articles,
            perPage,
            articleCount
        });

    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }

} 

module.exports.home_tag_category_get = async (req,res) => {
    
    try {
        
        const getCategory = await articleModel.aggregate([
            {
                $match: {
                    category: {
                        $not: {
                            $size: 0
                        }
                    }
                }
            },
            
            {
                $unwind: "$category"
            },
            {
                $group: {
                    _id: "$category",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);
        const getTag = await articleModel.distinct('tag');
         console.log(getTag);
         console.log(getCategory);
        return res.status(200).json({
            allCategory: getCategory,
            allTag: getTag
        });

    } catch (error) {
        console.error("home_article_get error:", error);
        res.status(500).json({
            errorMessage: { error: 'Internal server error' }
        }); 
    }

}


module.exports.category_article_get = async (req,res) => {
    // console.log(req.query);

    let {currentPage,categorySlug} = req.query;
    currentPage = parseInt(currentPage);
    const perPage = 6;
    const skipPage = parseInt(currentPage - 1) * perPage;

    try {
        const articleCount = await articleModel.find({category_slug: categorySlug}).countDocuments();
        // console.log(articleCount);

        
        const articles = await articleModel.find({category_slug: categorySlug}).skip(skipPage).limit(perPage).sort({ createAt: -1 });
        // console.log(articles);
        
        res.status(200).json({
            categoryArticle : articles,
            perPage,
            categoryArticleCount: articleCount 
        });
        

    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }

}


module.exports.tag_article_get = async (req,res) => {

    let {currentPage,tagSlug} = req.query;
    currentPage = parseInt(currentPage);
    const perPage = 6;
    const skipPage = parseInt(currentPage - 1) * perPage;

    try {
        const articleCount = await articleModel.find({tag_slug: tagSlug}).countDocuments();
        // console.log(articleCount);

        
        const articles = await articleModel.find({tag_slug: tagSlug}).skip(skipPage).limit(perPage).sort({ createAt: -1 });
        // console.log(articles);
        
        res.status(200).json({
            tagArticle : articles,
            perPage,
            tagArticleCount: articleCount 
        });
        

    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }

}



module.exports.setBlog = async (req, res) => {
    // console.log(req.body);
    const { title, description,cover,userId } = req.body;
    const error = {};

    if (!title) {
        error.title = 'Please provide blog title';
    }
    if (!description) {
        error.description = 'Please provide blog description';
    }

    const user = await userModel.findById(userId);

    if (Object.keys(error).length == 0) {
        const blogSlug = title.trim().split(' ').join('-');
        try {
            const checkBlog = await blogModel.findOne({ blogSlug });
            if(checkBlog){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added blog'
                    }
                })
            } else {
                await blogModel.create({
                    title: title.trim(),
                    blogSlug,
                    description,
                    creator:user,
                     cover,
                    // avatar:{
                    //    public_id: avatar,
                    //    url: avatar
                    // },
                })
                res.status(201).json({
                    successMessage: 'Blog add successfull'
                })
            }
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }
    }else{
        res.status(400).json({ errorMessage: error });
    }
    
    try {
        
        const user = await userModel.findById(userId);
 
        const exsistingBlog = await blogModel.findOne({ title });
        if (exsistingBlog) {
            return res.status(400).json({
              message: "Blog Already Exsist",
            });
        
        }
        // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        //     folder: "blogs",
        // });
        const blog = new blogModel({
            title,
            description,
            avatar,
            cover,
            creator:user             
        });
        const savedBlog = await blog.save();
        res.status(200).json({
        message: "Blog Created",
        data: savedBlog,
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


