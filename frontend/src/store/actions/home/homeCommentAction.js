import axios from "axios";


export const user_comment = (data) => async (dispatch) => {
    // console.log(data);
    dispatch({type:'COMMENT_LOADER_TRUE'});
    try {
        const response = await axios.post('/rest-api/home/user-comment',
            data, 
            {
                withCredentials: true
            }
        );
        // console.log(response); 
         dispatch({
            type: 'COMMENT_SUCCESS',
            payload: response.data
         })
    } catch (error) {
        console.log(error.response);
    }

}

export const get_comment = (articleId) => async (dispatch) => {
    try {
        const response = await axios.get(`/rest-api/get-home-comment/${articleId}`,
            {
                withCredentials: true
            }   
        );
        // console.log(response);
        dispatch({
            type: 'COMMENT_GET_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error.response);
    }
}


export const reply_comment = (data) => async (dispatch) => {
    // console.log(data);
    // dispatch({type:'COMMENT_LOADER_TRUE'});
    try {
         const response = await axios.post('/rest-api/reply-comment',
            data, 
            {
                withCredentials: true
            }
         );
        // console.log(response); 
         dispatch({
            type: 'REPLY_SUCCESS',
            payload: response.data
          })
    } catch (error) {
        console.log(error);
    }

}

