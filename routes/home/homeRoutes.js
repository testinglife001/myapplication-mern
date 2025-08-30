const router = require('express').Router();

const { getArticleDetails, like_dislike_get, like_article, dislike_article } = require('../../controllers/home/articleReadController');
const { home_article_get, home_tag_category_get, category_article_get, tag_article_get, setBlog } = require('../../controllers/home/homeController');
const { user_get_all,  add_task_manager, duplicate_task_manager, post_task_manager_activity, task_manager_get_all, task_manager_get, add_subtask_manager } = require('../../controllers/home/taskManagerController');
const { getTeamList } = require('../../controllers/home/userController');
// const { createTask, user_get_all } = require('../../controllers/home/taskManagerController');
const { userViewController } = require('../../controllers/home/userViewController');
const { user, auth_user } = require('../../middleware/authMiddleware');



router.get('/home-article-get', home_article_get );
router.get('/home/get-tag-category', home_tag_category_get );
router.get('/category-article-get', category_article_get );
router.get('/tag-article-get', tag_article_get );

router.get('/home/article-detail/:articleSlug', getArticleDetails );
router.get('/home/like-dislike-get/:articleSlug', user, like_dislike_get );

router.put('/user-like-article', auth_user, like_article );
router.put('/user-dislike-article', auth_user, dislike_article );

router.get('/user-view', userViewController );



// router.put('/user-like-article', auth_user, like_article );
// router.get('/user-get-all', user_get_all );
// router.get('/get-all-user', auth_user, user_get_all );
router.get("/get-team", auth_user, getTeamList );

router.get('/get-all-user', auth_user, user_get_all);
// router.post("/create-task",  auth_user, createTask );add-subtask-manager 
router.post("/add-task-manager", auth_user, add_task_manager );
router.post("/duplicate-task-manager/:id", auth_user, duplicate_task_manager );
router.post("/task-manager-activity/:id", auth_user, post_task_manager_activity );
router.get('/get-all-task-manager', auth_user, task_manager_get_all );
router.get('/get-task-manager/:id', task_manager_get );
router.put("/add-subtask-manager/:id", auth_user, add_subtask_manager );


// router.post('/create-blog', auth_user, setBlog )


module.exports = router;

