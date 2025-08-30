
const initState = {
    loader: false,
    allArticle: [],
    allCategory: [],
    allTag: [],
    articleCount: 0,
    perPage: 0,
    related_article: [],
    readMore: "",
    read_article: "",
    moreTag: [],
    blogs: [],
    blogsError: '',
    blogsSuccessMessage: '',
};

export const homeReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'HOME_ARTICLE_GET_SUCCESS':
            return {
                ...state,
                allArticle: payload.articles,
                articleCount: payload.articleCount,
                perPage: payload.perPage
            };
        case 'HOME_TAG_CATEGORY_GET_SUCCESS':
            return {
                ...state,
                allCategory: payload.allCategory,
                allTag: payload.allTag
            };
        case 'CATEGORY_ARTICLE_GET_SUCCESS':
            return {
                ...state,
                allArticle: payload.categoryArticle,
                articleCount: payload.categoryArticleCount,
                perPage: payload.perPage
            };
        case 'TAG_ARTICLE_GET_SUCCESS':
            return {
                ...state,
                allArticle: payload.tagArticle,
                articleCount: payload.tagArticleCount,
                perPage: payload.perPage
            };
        case 'READ_ARTICLE_GET_SUCCESS':
            return {
                ...state,
                readMore: payload.readMore,
                read_article: payload.read_article,
                moreTag: payload.moreTag,
                related_article: payload.related_article,
            };
        case 'BLOG_ADD_SUCCESS':
            return {
                ...state,
                loader: false,
                blogsError: '',
                blogsSuccessMessage: payload.successMessage
            };
        case 'BLOG_SUCCESS_MESSAGE_CLEAR':
            return {
                ...state,
                blogsSuccessMessage: ''
            };
        default:
            return state;
    }
}




/*
const initState = {
    loader: false,
    allArticle: [],
    allCategory: [],
    allTag: [],
    articleCount: 0,
    perPage: 0,
    related_article: [],
    readMore: "",
    read_article: "",
    moreTag: [],
    blogs:[],
    blogsError: '',
    blogsSuccessMessage: '',
}

export const homeReducer = (state = initState,action) => {
    const {type, payload} =action;
    if(type === 'HOME_ARTICLE_GET_SUCCESS'){
        // console.log(payload);
        return {
            ...state,
            allArticle: payload.articles,
            articleCount: payload.articleCount,
            perPage: payload.perPage 
        }
    }
    if(type === 'HOME_TAG_CATEGORY_GET_SUCCESS'){
        return {
            ...state,
            allCategory: payload.allCategory,
            allTag: payload.allTag
        }
    }
    if(type === 'CATEGORY_ARTICLE_GET_SUCCESS'){
        return {
            ...state,
            allArticle: payload.categoryArticle,
            articleCount: payload.categoryArticleCount,
            perPage: payload.perPage 
        }
    }
    if(type === 'TAG_ARTICLE_GET_SUCCESS'){
        return {
            ...state,
            allArticle: payload.tagArticle,
            articleCount: payload.tagArticleCount,
            perPage: payload.perPage 
        }
    }
    if(type === 'READ_ARTICLE_GET_SUCCESS'){
        // console.log(action.payload);
        return {
            ...state,
            readMore: payload.readMore,
            read_article: payload.read_article,
            moreTag: payload.moreTag,
            related_article: payload.related_article,
        }
    }
    if(type === 'BLOG_ADD_SUCCESS' ){
        return {
            ...state,
            loader: false,
            blogsError: '',
            blogsSuccessMessage: payload.successMessage
        }
    }
    if(type === 'BLOG_SUCCESS_MESSAGE_CLEAR'){
        return {
            ...state,
            blogsSuccessMessage: ''
        }
    }
    return state;
}
*/


