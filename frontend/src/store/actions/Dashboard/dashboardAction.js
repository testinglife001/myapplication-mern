import axios from 'axios';


export const dashboard_index_data_get = () => async (dispatch) => {
    // console.log('ok');
    try {
        const {data:{userView,articleCount,categoryCount,tagCount,subAdminCount}} 
                        = await axios.get('/rest-api/get-dashboard-index-data', 
            // data,
                {
                    withCredentials: true
                }
            );
            //console.log(response);
            dispatch({
                type: 'DASHBOARD_INDEX_DATA_GET',
                payload: {
                    userView,
                    articleCount,
                    categoryCount,
                    tagCount,
                    subAdminCount
                }
            })
    } catch (error) {
        console.log(error);
    }
}


export const get_notification = (id) => async (dispatch) => {
    try {
        // console.log(id);
        const { data: { notification } } = await axios.get(`/rest-api/get-notification/${id}`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response); 
        dispatch({
             type: 'NOTIFICATION_GET_SUCCESS',
             payload: notification
        });
    } catch (error) {
            console.log(error.response);
    }
}


export const seen_notification = (id) => async (dispatch) => {
    try {
        // console.log(id);
        const { data: { notification } } = await axios.get(`/rest-api/seen-notification/${id}`, 
            // data,
                {
                    withCredentials: true
                }
            );
            // console.log(response); 
        // dispatch({
        //     type: 'NOTIFICATION__SUCCESS',
        //     payload: notification
        // });
    } catch (error) {
            console.log(error.response.data);
    }
}


