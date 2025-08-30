const router = require('express').Router();
const { get_tag_category, add_article, get_article, edit_article, update_article } = require('../../controllers/Dashboard/articleController');
const { category_add, category_get, category_delete, category_edit, category_update } = require('../../controllers/Dashboard/categoryController');
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../../controllers/Dashboard/categoryListController');
const { get_dashboard_index_data, notification_get, notification_seen } = require('../../controllers/Dashboard/indexController');
const { addJob, getJobs } = require('../../controllers/Dashboard/jobController');
const { tag_add, tag_get, tag_delete, tag_edit, tag_update } = require('../../controllers/Dashboard/tagController');
const { task_add, task_get, task_get_all, subtask_add, getTasks, addTask, updateTasks } = require('../../controllers/Dashboard/taskListController');
const { getAllJobs, todo_get_all, addToDoList, getToDoLists } = require('../../controllers/Dashboard/todoListController');
const { admin_middleware, auth_sub_admin } = require('../../middleware/authMiddleware');




// category route
router.post('/add-category', admin_middleware, category_add );
router.get('/get-category', admin_middleware, category_get );
router.delete('/delete-category/:categoryId', admin_middleware, category_delete );
router.get('/edit-category/:categorySlug', admin_middleware, category_edit );
router.patch('/update-category/:categoryId', admin_middleware, category_update );


// tag route
router.post('/add-tag', admin_middleware, tag_add );
router.get('/get-tag', admin_middleware, tag_get );
router.delete('/delete-tag/:tagId', admin_middleware, tag_delete );
router.get('/edit-tag/:tagSlug', admin_middleware, tag_edit );
router.patch('/update-tag/:tagId', admin_middleware, tag_update );


// article route
router.get('/get-tag-category', admin_middleware, get_tag_category );
router.post('/add-article', admin_middleware, add_article );
router.get('/get-article', admin_middleware, get_article );
router.get('/edit-article/:articleSlug', admin_middleware, edit_article );
router.post('/update-article', admin_middleware, update_article );


// task route
 router.post('/add-task', admin_middleware, task_add );
// router.post('/add-task', admin_middleware, addTaskList );
router.get('/get-task', admin_middleware, task_get );
router.get('/get-all-task', admin_middleware, task_get_all );

// sub task route
router.post('/add-subtask', admin_middleware, subtask_add );
router.get('/gettask',  getTasks );
// router.get('/get-task', admin_middleware,  );
// router.get('/get-all-task', admin_middleware,  );

// task sub task route from flipkart clone
 router.post('/task/create', admin_middleware, addTask );
// router.post('/add-task', admin_middleware, addTask );
// getTasks
router.post('/task/update', admin_middleware, updateTasks );

// mern ... _ ecommerce website _ Flipkart Clone
router.post('/category/create', admin_middleware, addCategory );
router.get('/category/getcategory',  getCategories );
router.post('/category/update', admin_middleware, updateCategories );
router.delete('/category/delete', admin_middleware, deleteCategories );

// job route
router.post('/add-job', admin_middleware, addJob );
router.get('/get-job', admin_middleware, getJobs );

// todo list route
router.get('/get-jobs', admin_middleware, getAllJobs );
router.get('/get-todos', admin_middleware, todo_get_all );
router.post('/add-todo', admin_middleware, addToDoList );
 router.get('/get-todolist', admin_middleware, getToDoLists );
// router.get('/get-todolist',  getToDoLists );


// dashboard index data
router.get('/get-dashboard-index-data', auth_sub_admin, get_dashboard_index_data  );

// notification route
router.get('/get-notification/:id', auth_sub_admin, notification_get  );
router.get('/seen-notification/:id', auth_sub_admin, notification_seen  );

module.exports = router;


