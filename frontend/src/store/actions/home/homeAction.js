// import axios from "axios"

import axios from "axios";

// Get all articles for home page
export const get_all_article = (currentPage = 1, searchValue = "") => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/rest-api/home-article-get?currentPage=${currentPage}&searchValue=${searchValue}`,
            { withCredentials: true }
        );

        dispatch({
            type: 'HOME_ARTICLE_GET_SUCCESS',
            payload: {
                articles: response.data.articles,
                perPage: response.data.perPage,
                articleCount: response.data.articleCount
            }
        });

    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}

// Get all categories and tags
export const get_home_tag_category = () => async (dispatch) => {
    try {
        const response = await axios.get('/rest-api/home/get-tag-category', { withCredentials: true });

        dispatch({
            type: 'HOME_TAG_CATEGORY_GET_SUCCESS',
            payload: response.data
        });

    } catch (error) {
        console.error(error);
    }
}

// Category-wise articles
export const get_category_article = (categorySlug, currentPage = 1) => async (dispatch) => {
    try {
        const response = await axios.get(
            `/rest-api/category-article-get?categorySlug=${categorySlug}&currentPage=${currentPage}`,
            { withCredentials: true }
        );

        dispatch({
            type: 'CATEGORY_ARTICLE_GET_SUCCESS',
            payload: {
                categoryArticle: response.data.categoryArticle,
                perPage: response.data.perPage,
                categoryArticleCount: response.data.categoryArticleCount
            }
        });

    } catch (error) {
        console.error(error);
    }
}

// Tag-wise articles
export const get_tag_article = (tagSlug, currentPage = 1) => async (dispatch) => {
    try {
        const response = await axios.get(
            `/rest-api/tag-article-get?tagSlug=${tagSlug}&currentPage=${currentPage}`,
            { withCredentials: true }
        );

        dispatch({
            type: 'TAG_ARTICLE_GET_SUCCESS',
            payload: {
                tagArticle: response.data.tagArticle,
                perPage: response.data.perPage,
                tagArticleCount: response.data.tagArticleCount
            }
        });

    } catch (error) {
        console.error(error);
    }
}








/*
export const get_all_article = (currentPage, searchValue) => async (dispatch) => {

    // console.log(currentPage);

    try {
        // const response = await axios.get('')
        // const response = await axios.get(`/rest-api/home-article-get?currentPage=${currentPage}&searchValue=${searchValue}`, 
        //    {
        //        withCredentials: true
        //    }
        // );
        const response = 
            await axios.get(
            `http://localhost:5000/rest-api/home-article-get?currentPage=${currentPage}&searchValue=${searchValue}`,
            { withCredentials: true }
        );
         console.log(response);
         console.log("Axios raw:", response);
        console.log("Data type:", typeof response.data);
        
        dispatch({
            type: 'HOME_ARTICLE_GET_SUCCESS',
            payload: {
                articles: response.data.articles,
                perPage: response.data.perPage,
                articleCount: response.data.articleCount
            }
        })
    } catch (error) {
        console.log(error.message);
        console.log(error.response);
        console.log(error.response?.data || error.message);
    }

}


export const get_home_tag_category = () => async (dispatch) => {
    //console.log("ok");

    try {
        const response = await axios.get('/rest-api/home/get-tag-category', 
            {
                withCredentials: true
            }
        );
         console.log(response);
        dispatch({
            type: 'HOME_TAG_CATEGORY_GET_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }

}


export const get_category_article = (categorySlug,currentPage) => async (dispatch) => {
    // console.log(currentPage);
    // console.log(categorySlug);
    
    try {
        const response = await axios.get(`/rest-api/category-article-get?categorySlug=${categorySlug}&&currentPage=${currentPage}`, 
            {
                withCredentials: true
            }
        );
        // console.log(response);
        dispatch({
            type: 'CATEGORY_ARTICLE_GET_SUCCESS',
            payload: {
                categoryArticle: response.data.categoryArticle,
                perPage: response.data.perPage,
                categoryArticleCount: response.data.categoryArticleCount
            }
        })
    } catch (error) {
        console.log(error)
    }
    

}

export const get_tag_article = (tagSlug, currentPage) => async (dispatch) => {

    try {
        const response = await axios.get(`/rest-api/tag-article-get?tagSlug=${tagSlug}&&currentPage=${currentPage}`, 
            {
                withCredentials: true
            }
        );
        // console.log(response);
        dispatch({
            type: 'TAG_ARTICLE_GET_SUCCESS',
            payload: {
                tagArticle: response.data.tagArticle,
                perPage: response.data.perPage,
                tagArticleCount: response.data.tagArticleCount
            }
        })
    } catch (error) {
        console.log(error)
    }

}


export const userView = () => async (dispatch)  => {
    try {
        const response = await axios.get('/rest-api/user-view', 
            {
                withCredentials: true
            }
        );
    } catch (error) {
        console.log(error)
    }
}



export const add_blog = (data) => async (dispatch) => {
    // console.log(data);
    // dispatch({
    //    type: 'ARTICLE_SET_LOADER',
    // })
    
    try {
        const response = await axios.post('/rest-api/create-blog', 
            data,
            {
                withCredentials: true
            }
        );
         console.log(response.data);
         dispatch({
            type: 'BLOG_ADD_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
         })
        
    } catch (error) {
         console.log(error.response);
        // dispatch({
        //    type: 'ARTICLE_ADD_FAIL',
        //    payload: {
        //        errorMessage: error.response.data.errorMessage
        //    }
        // })
    }
    

}
*/


