const categoryModel = require("../../models/categoryModel");
const tagModel = require("../../models/tagModel");
// import formidable from 'formidable';
// const { formidable } = require("formidable");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
 const { article_validator } = require("../../validator/validator");
// const fs = require('fs');
const articleModel = require("../../models/articleModel");
const { error } = require("console");


module.exports.get_tag_category = async (req,res) => {
    // console.log('llokkoll');

    try {
        const allTag = await tagModel.find({});
        const allCategory = await categoryModel.find({});
        res.status(200).json({
            allTag,
            allCategory
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }

}




module.exports.add_article = (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    const { adminId, adminName } = req;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ errorMessage: { error: "Form parse error" } });
        }

        const { title, category, slug, tag, text } = fields;

        const validate = article_validator(fields, files);
        if (!validate.validated) {
            return res.status(400).json({ errorMessage: validate.error });
        }

        try {
            const categoryName = category.toString().split("-").join(" ");
            const tagName = tag.toString().split("-").join(" ");

            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
            if (!imageFile) {
                return res.status(400).json({ errorMessage: { image: "No image uploaded" } });
            }

            const fileName = Date.now() + "-" + imageFile.originalFilename;
            const uploadPath = path.join(__dirname, "../../../../myapplication superapp deploy/myapplication/frontend/public/articalImage", fileName);
            console.log(uploadPath)

            await fs.promises.copyFile(imageFile.filepath, uploadPath);

            await articleModel.create({
                adminId,
                adminName,
                title: title.toString(),
                slug: slug.toString(),
                category: categoryName,
                category_slug: category.toString(),
                tag: tagName,
                tag_slug: tag.toString(),
                articleText: text.toString(),
                image: fileName
            });

            res.status(201).json({ successMessage: "Article add successful" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: { error: "Internal server error" } });
        }
    });
};


/*
module.exports.add_article =  (req,res) => {
    

    const form = new formidable.IncomingForm({ multiples: true })

    const {adminId, adminName} = req;


    form.parse(req, function (err, fields, files) {

        if(!err){

            const { title, category, slug, tag, text } = fields;


            const validate = article_validator(fields, files);


             if(validate.validated){

                // console.log(category);
                const categoryName = category.toString().split('-').join(' ');
                const tagName = tag.toString().split('-').join(' ');
                // console.log(files);

                 files.image[0].originalFilename = Date.now() + files.image[0].originalFilename;

                
                const uploadPath = __dirname + `../../../../frontend/public/articalImage/${files.image[0].originalFilename}`;
                
                
                fs.copyFile(files.image[0].filepath, uploadPath,  
                    async (error) => {
                        if(error){
                            // console.log(error);
                            res.status(400).json({
                                errorMessage: {
                                    imageUpload: 'Image upload fail'
                                }
                            });
                        }else{
                            // console.log('image upload success');
                            try {
                                await articleModel.create({
                                    adminId,
                                    adminName,
                                    title: title.toString(),
                                    slug: slug.toString(),
                                    category: categoryName,
                                    category_slug: category.toString(),
                                    tag: tagName,
                                    tag_slug: tag.toString(),
                                    articleText: text.toString(),
                                    image: files.image[0].originalFilename
                                });
                                res.status(201).json({
                                    successMessage: 'Article add successful'
                                });
                            } catch (error) {
                                console.log(error.message);
                                res.status(500).json({ 
                                    errorMessage: {
                                        error: 'Internal server error'
                                    } 
                                });
                            }
                            
                        }
                    }
                )
                


            }else{
                res.status(400).json({ errorMessage: validate.error });
            }
       

        } 

    })
    
    
    
    
}
*/

module.exports.get_article = async (req,res) => {
    // console.log(req.query);

    const { role, adminId } = req;
    const { currentPage, searchValue } = req.query;

    const perPage = 8;

    const skipPage = parseInt(currentPage - 1) * perPage;

    let articles = [];

    try {
        let articleCount = 0;

        if(searchValue){
            if(role === 'admin'){
                articleCount = await articleModel.find({}).countDocuments();
                articles = await articleModel.find({}).skip(skipPage).limit(perPage).sort({ createAt: -1 });
                articles = articles.filter(ar => ar.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
            } else {
                articleCount = await articleModel.find({adminId}).countDocuments();
                articles = await articleModel.find({adminId}).skip(skipPage).limit(perPage).sort({ createAt: -1 });
                articles = articles.filter(ar => ar.title.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
            }
        } else {
            if(role === 'admin'){
                articleCount = await articleModel.find({}).countDocuments();
                articles = await articleModel.find({}).skip(skipPage).limit(perPage).sort({ createAt: -1 });
            } else {
                articleCount = await articleModel.find({adminId}).countDocuments();
                articles = await articleModel.find({adminId}).skip(skipPage).limit(perPage).sort({ createAt: -1 });
            }
        }

        res.status(200).json({
            allArticle: articles,
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


module.exports.edit_article = async (req,res) => {
    // console.log(req);

    const {articleSlug} = req.params;

    const {adminId, role} = req;
    // console.log(adminId);
    // console.log(role);

    try {
        const getArticle = await articleModel.findOne({slug: articleSlug});
        if(getArticle && getArticle.adminId === adminId || getArticle.role ===role ){
            res.status(200).json({editArticle: getArticle});
        } else {
            res.status(404).json({
                errorMessage: {
                    error: 'You can not edit this article'
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }

}


module.exports.update_article = async (req,res) => {
    // console.log("ok");
    // console.log(req.body);

    const { title, category, slug, tag, text, articleId } = req.body;
    const { adminId, role } = req;
    const validate = article_validator(req.body, '');

    if(validate.validated){

        try {
            const getArticle = await articleModel.findById(articleId);
            if(getArticle && getArticle.adminId===adminId || getArticle.role===role){
                const categoryName = category.toString().split('-').join(' ');
                const tagName = tag.toString().split('-').join(' ');
                await articleModel.findByIdAndUpdate(articleId, {
                    title: title.toString(),
                    slug: slug.toString(),
                    category: categoryName,
                    category_slug: category.toString(),
                    tag: tagName,
                    tag_slug: tag.toString(),
                    articleText: text.toString()
                })
                res.status(201).json({
                    successMessage: 'Article edit successfull'
                })
            } else{
                res.status(404).json({ 
                    errorMessage: {
                        error: 'You can not edit this article'
                    } 
                });
            }
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }

    } else {
        res.status(400).json({ errorMessage: validate.error });
    }

}

