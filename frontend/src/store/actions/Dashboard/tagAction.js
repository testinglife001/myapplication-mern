import axios from "axios";


export const add_tag = (data) => async (dispatch) => {
    // console.log(data);
    dispatch({type: 'SET_LOADER'});
    
    try {
        const response = await axios.post('/rest-api/add-tag', data,
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'TAG_ADD_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
    } catch (error) {
        // console.log(error.response.data);
        dispatch({
            type: 'TAG_ADD_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
    
   // console.log(data);
   
}


export const get_all_tag = (page, searchValue) => async (dispatch) => {
    try {
        // console.log(page);
        const response = await axios.get(`/rest-api/get-tag?page=${page}&&searchValue=${searchValue}`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data); 
        dispatch({
            type: 'DASHBOARD_TAG_GET_SUCCESS',
            payload: {
                allTag: response.data.allTag,
                perPage: response.data.perPage,
                tagCount: response.data.tagCount
            }
        });
    } catch (error) {
            console.log(error.response);
    }
}


export const delete_tag = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`/rest-api/delete-tag/${id}`, 
                {
                    withCredentials: true
                }
            );
        dispatch({
            type: 'TAG_DELETE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
    } catch (error) {
        console.log(error.response);
    }
}


export const edit_tag = (tagSlug) => async (dispatch) => {
    // console.log(tagSlug);
    try {
        const response = await axios.get(`/rest-api/edit-tag/${tagSlug}`, 
                {
                withCredentials: true
                }
            );
        // console.log(response.data);
        dispatch({
            type: 'EDIT_TAG_GET_SUCCESS',
            payload: {
                editTag: response.data.editTag
            }
        });
        dispatch({
            type: 'EDIT_REQUEST_SET'
        })

    } catch (error) {
        console.log(error.response);
    }
}


export const update_tag = (id, data) => async (dispatch) => {
    // console.log(tagSlug);
    try {
        const response = await axios.patch(`/rest-api/update-tag/${id}`,
                data, 
                {
                withCredentials: true
                }
            );
        // console.log(response.data);
        dispatch({
            type: 'TAG_UPDATE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        });

    } catch (error) {
        // console.log(error.response);
        dispatch({
            type: 'TAG_UPDATE_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
}

