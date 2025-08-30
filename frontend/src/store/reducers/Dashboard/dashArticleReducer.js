const initState = {
    loader: false,
    articleError: '',
    allArticle: [],
    perPage: 0,
    articleCount: 0,
    editArticle: '',
    articleSuccessMessage: '',
    editRequest: false,
    allTag: [],
    allCategory: []
}

export const dashArticleReducer = (state=initState, action) => {
    const {payload, type} = action;
    if(type === 'DASHBOARD_CATEGORY_TAG_GET_SUCCESS'){
        return {
            ...state,
            allTag: payload.allTag,
            allCategory: payload.allCategory
        }
    }
    if(type === 'ARTICLE_SET_LOADER'){
        return {
            ...state,
            loader: true
        }
    }
    if(type === 'ARTICLE_ADD_SUCCESS' || type === 'ARTICLE_UPDATE_SUCCESS'){
        return {
            ...state,
            loader: false,
            articleError: '',
            articleSuccessMessage: payload.successMessage
        }
    }
    if(type === 'ARTICLE_ADD_FAIL' || type === 'ARTICLE_UPDATE_FAIL'){
        // console.log(payload.errorMessage);
        return {
            ...state,
            loader: false,
            articleError: payload.errorMessage,
            articleSuccessMessage: ''
        }
    }
    if(type === 'ARTICLE_SUCCESS_MESSAGE_CLEAR'){
        return {
            ...state,
            articleSuccessMessage: ''
        }
    }
    if(type === 'DASHBOARD_ARTICLE_GET_SUCCESS'){
        return {
            ...state,
            allArticle: payload.allArticle,
            perPage: payload.perPage,
            articleCount: payload.articleCount
        }
    }
    if(type === 'EDIT_ARTICLE_GET_SUCCESS'){
        return {
            ...state,
            editArticle: payload.editArticle
        }
    }
    if(type === 'EDIT_ARTICLE_REQUEST_SET'){
        return {
            ...state,
            editRequest: true
        }
    }
    return state;
}




