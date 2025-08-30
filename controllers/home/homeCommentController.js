const articleModel = require("../../models/articleModel");
const commentModel = require("../../models/commentModel");
const notificationModel = require("../../models/notificationModel");


module.exports.user_comment = async (req,res) => {
    // console.log(req);

    const {
        articleId,
        articleSlug,
        commentText,
        userName,
        userImage
    } = req.body;

    try {
        //const userComment = 
        await commentModel.create({
            articleId,
            commentText,
            userName,
            userImage
        });
        const {adminId} = await articleModel.findById(articleId);
        await notificationModel.create({
            subject: `${userName} comment your article`,
            slug: articleSlug,
            adminId
        });
        res.status(201).json({
            successMessage: 'comment you'
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        })
    }

}

module.exports.get_user_comment = async (req,res) => {
    // console.log(req);

    const {articleId} = req.params;

    try {
        const getComment = await commentModel.find({articleId});
        // console.log(getComment);
        res.status(200).json({
            comment: getComment
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        })        
    }

}


module.exports.comment_reply = async (req,res) => {
    // console.log(req.body);

    
    const {
        commentId, replyText, replyName, replyImage
    } = req.body;

    const {role} = req;

    try {
        //const userComment = 
        await commentModel.updateOne({
                _id: commentId
            },{
                $push: {
                    replyComment: {
                        replyText,
                        replyImage,
                        replyName: role === 'admin' ? 'Admin' : replyName,
                        replyTime: new Date()
                    }
                }
            }
        );
        res.status(201).json({
            successMessage: 'reply success'
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        })
    }
    

}

