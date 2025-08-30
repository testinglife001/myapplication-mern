import axios from "axios";
// import EditCategory from "../../../components/dashboard/EditCategory";

export const add_category = (data) => async (dispatch) => {
    // console.log(data);
    dispatch({type: 'SET_LOADER'});
    try {
        const response = await axios.post('/rest-api/add-category', data,
            {
                withCredentials: true
            }
        );
        // console.log(response.data);
        dispatch({
            type: 'CATEGORY_ADD_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
    } catch (error) {
        // console.log(error.response.data);
        dispatch({
            type: 'CATEGORY_ADD_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
}

export const get_all_category = (page, searchValue) => async (dispatch) => {
    try {
        // console.log(page);
        const response = await axios.get(`/rest-api/get-category?page=${page}&&searchValue=${searchValue}`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response.data); 
        dispatch({
            type: 'DASHBOARD_CATEGORY_GET_SUCCESS',
            payload: {
                allCategory: response.data.allCategory,
                perPage: response.data.perPage,
                categoryCount: response.data.categoryCount
            }
        });
    } catch (error) {
            console.log(error.response);
    }
}

export const delete_category = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`/rest-api/delete-category/${id}`, 
                {
                    withCredentials: true
                }
            );
        dispatch({
            type: 'CATEGORY_DELETE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        })
    } catch (error) {
        console.log(error.response);
    }
}


export const edit_category = (categorySlug) => async (dispatch) => {
    // console.log(categorySlug);
    try {
        const response = await axios.get(`/rest-api/edit-category/${categorySlug}`, 
                {
                withCredentials: true
                }
            );
        // console.log(response.data);
        dispatch({
            type: 'EDIT_CATEGORY_GET_SUCCESS',
            payload: {
                editCategory: response.data.editCategory
            }
        });
        dispatch({
            type: 'EDIT_REQUEST_SET'
        })

    } catch (error) {
        console.log(error.response);
    }
}


export const update_category = (id, data) => async (dispatch) => {
    // console.log(categorySlug);
    try {
        const response = await axios.patch(`/rest-api/update-category/${id}`,
                data, 
                {
                withCredentials: true
                }
            );
        // console.log(response.data);
        dispatch({
            type: 'CATEGORY_UPDATE_SUCCESS',
            payload: {
                successMessage: response.data.successMessage
            }
        });

    } catch (error) {
        // console.log(error.response);
        dispatch({
            type: 'CATEGORY_UPDATE_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        })
    }
}

