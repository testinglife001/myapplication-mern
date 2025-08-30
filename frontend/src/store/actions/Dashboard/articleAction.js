import axios from "axios";

export const get_tag_category = () => async (dispatch) => {
    try {
        // console.log('okko');
        const response = await axios.get(`/rest-api/get-tag-category`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data);
        dispatch({
            type: 'DASHBOARD_CATEGORY_TAG_GET_SUCCESS',
            payload: {
                allTag: response.data.allTag,
                allCategory: response.data.allCategory
            }
        });

    } catch (error) {
            console.log(error.response);
    }
}


export const add_article = (data) => async (dispatch) => {

    dispatch({
        type: 'ARTICLE_SET_LOADER',
    })

    try {
        const response = await axios.post('/rest-api/add-article', 
            data,
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'ARTICLE_ADD_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
        
    } catch (error) {
        // console.log(error.response);
        dispatch({
            type: 'ARTICLE_ADD_FAIL',
            payload: {
                errorMessage: error.response.data.errorMessage
            }
        })
    }

}

export const get_all_article = (currentPage, searchValue) => async (dispatch) => {
    // console.log(currentPage);

    try {
        const response = await axios.get(`/rest-api/get-article?currentPage=${currentPage}&&searchValue=${searchValue}`, 
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'DASHBOARD_ARTICLE_GET_SUCCESS',
            payload: {
                allArticle: response.data.allArticle,
                perPage: response.data.perPage,
                articleCount: response.data.articleCount
            }
        });
    } catch (error) {
        console.log(error.response);
    }

}


export const edit_article = (articleSlug) => async (dispatch) => {
    // console.log(currentPage);
    // console.log(articleSlug);

    try {
        const response = await axios.get(`/rest-api/edit-article/${articleSlug}`, 
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'EDIT_ARTICLE_GET_SUCCESS',
            payload: {
                editArticle: response.data.editArticle
            }
        });
        dispatch({
            type: 'EDIT_ARTICLE_REQUEST_SET'
        })
        
    } catch (error) {
        console.log(error.response);
    }

}


export const update_article = (data) => async (dispatch) => {

    dispatch({
        type: 'ARTICLE_SET_LOADER',
    })

    // console.log(data);
    
    try {
        
        const response = await axios.post('/rest-api/update-article', 
            data,
            {
                withCredentials: true
            }
        );
        
        // console.log(response.data);
        
        dispatch({
            type: 'ARTICLE_UPDATE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
        
        
    } catch (error) {
        // console.log(error.response);
        dispatch({
            type: 'ARTICLE_UPDATE_FAIL',
            payload: {
                errorMessage: error.response.data.errorMessage
            }
        })
    }

}
