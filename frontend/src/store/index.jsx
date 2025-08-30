import { createStore, compose, applyMiddleware, combineReducers } from "redux";

// import ThunkMiddleware from "redux-thunk";
import {thunk} from 'redux-thunk';

import { adminReducer } from "./reducers/adminReducer";
import { dashCategoryReducer } from "./reducers/Dashboard/dashCategoryReducer";
import { dashCategoryListReducer } from "./reducers/Dashboard/dashCategoryListReducer";
import { dashTagReducer } from "./reducers/Dashboard/dashTagReducer";
import { dashArticleReducer } from "./reducers/Dashboard/dashArticleReducer";
import { dashboardReducer } from "./reducers/Dashboard/dashboardReducer";
import { dashTaskReducer } from "./reducers/Dashboard/dashTaskReducer";
import { dashJobReducer } from "./reducers/Dashboard/dashJobReducer";
import { dashToDoReducer } from "./reducers/Dashboard/dashToDoReducer";

import { homeReducer } from "./reducers/home/homeReducer";
import { likeDislikeReducer } from "./reducers/home/likeDislikeReducer";
import { homeCommentReducer } from "./reducers/home/homeCommentReducer";
import { taskManagerReducer } from "./reducers/home/taskManagerReducer";


const rootReducer = combineReducers({
   adminReducer,    
   dashboardCategory: dashCategoryReducer,
   dashboardCategoryList: dashCategoryListReducer,
   dashboardTag: dashTagReducer,
   dashboardArticle: dashArticleReducer,
   dashboardIndex: dashboardReducer,
   dashboardTask: dashTaskReducer,
   dashboardJob: dashJobReducer,
   dashboardToDo: dashToDoReducer,

   homeReducer,
   likeDislike: likeDislikeReducer,
   userComment: homeCommentReducer,
   // dashboardIndex: dashboardReducer,
   // taskReducer
   taskManagerReducer,
});

const middleware = [thunk];

// const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(rootReducer,compose(applyMiddleware(...middleware)));
// const store = createStore(rootReducer, applyMiddleware(thunk),);

// + /* eslint-disable no-underscore-dangle */
/* const store = createStore(
   // reducer, /* preloadedState, */
   // rootReducer, applyMiddleware(thunk),
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  );
// + /* eslint-enable */
// const composedEnhancer = compose(applyMiddleware(...middleware));

const store = createStore(rootReducer, compose(applyMiddleware(...middleware),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())    
// )
);


export default store; 