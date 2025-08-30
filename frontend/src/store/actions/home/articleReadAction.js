// articleReadAction.js
import axios from "axios";

export const get_article_details = (articleSlug) => async (dispatch) => {
    // console.log(articleSlug);

    try {
        const response = await axios.get(`/rest-api/home/article-detail/${articleSlug}`, 
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
         dispatch({
            type: 'READ_ARTICLE_GET_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error.response);
    }
}

export const like_dislike_get = (articleSlug) => async (dispatch) => {
    // console.log(articleSlug);
    try {
        const response = await axios.get(`/rest-api/home/like-dislike-get/${articleSlug}`, 
            {
                withCredentials: true
            }
        );
        // console.log(response);
        dispatch({
            type: 'LIKE_DISLIKE_GET_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error.response);
    }
}

export const user_article_like = (data) => async (dispatch) => {
    // console.log(data);
    try {
        const response = await axios.put('/rest-api/user-like-article',
            data, 
            {
                withCredentials: true
            }
        );
        // console.log(response); 
        dispatch({
            type: 'USER_LIKE_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error.response);
    }
}


export const user_article_dislike = (data) => async (dispatch) => {
    // console.log(data);
    try {
        const response = await axios.put('/rest-api/user-dislike-article',
            data, 
            {
                withCredentials: true
            }
        );
        // console.log(response); 
        dispatch({
            type: 'USER_DISLIKE_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error.response);
    }
}





