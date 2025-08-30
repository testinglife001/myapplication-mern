import axios from "axios";


export const admin_login = (data) => async (dispatch) => {
    console.log("Sending login request:", data); // ✅ Add this
    dispatch({
        type: 'LOADER_RUN',
    })
    try {
        const response = await axios.post('/rest-api/admin-login', data, {
            withCredentials: true
        });
        console.log("Login response:", response.data); // ✅ Add this
        localStorage.setItem('blog_token', response.data.token);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
                successMessage: response.data.successMessage,
                token: response.data.token
            }
        });
    } catch (error) {
        console.log("Login error:", error.response?.data); // ✅ Add this
        dispatch({
            type: 'LOGIN_FAIL',
            payload: {
                error: error.response.data.errorMessage
            }
        });
    }
};



export const register = (data) => async (dispatch) => {
    // console.log(data);
    dispatch({
        type: 'LOADER_RUN',
    })
    try {
        const response = await axios.post('/rest-api/userRregister', 
            data, 
            {
                withCredentials: true
            }
        );
        // console.log(response);
        dispatch({
            type: 'OTP_SEND_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        console.log(error.response);
    }

}

export const user_register = (data) => async (dispatch) => {
    dispatch({ type: 'LOADER_RUN' });

    try {
        const response = await axios.post('/rest-api/user-register', data, {
            withCredentials: true
        });

        dispatch({
            type: 'OTP_SEND_SUCCESS',
            payload: {
                successMessage: response.data.successMessage || "OTP sent successfully"
            }
        });
    } catch (error) {
        dispatch({
            type: 'REGISTER_ERROR',
            payload: error.response?.data?.errorMessage || "Registration failed"
        });
    }
};


export const verify_email = (data, history) => async (dispatch) => {
    dispatch({ type: "LOADER_RUN" });
    console.log(data)
    console.log(history)
;
    try {
        const response = await axios.post("/rest-api/verify-email", data, { withCredentials: true })


        localStorage.setItem("blog_token", response.data.token);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: {
                successMessage: response.data.successMessage,
                token: response.data.token,
            },
        });

        // redirect after success
        history.push("/");
    } catch (error) {
        dispatch({
            type: "REGISTER_ERROR",
            payload: error.response?.data?.errorMessage || "OTP verification failed",
        });
    }
};


export const user_login = (data) => async (dispatch) => {
    // console.log(data);
    dispatch({
        type: 'LOADER_RUN',
    })
    try {
         const response = await axios.post('/rest-api/user-login', 
             data, 
            {
                withCredentials: true
            }
         );
        // console.log(response);
        localStorage.setItem('blog_token', response.data.token);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: 'LOGIN_ERROR',
            payload: error.response.data.errorMessage    
        })
    }

}

export const user_logout = ({role,history}) => async (dispatch) => {
    // console.log(data);
    // dispatch({
    //    type: 'LOADER_RUN',
    // })
    try {
            await axios.get('/rest-api/user-logout', 
            // data, 
            {
                withCredentials: true
            }
         );
        // console.log(response);
        // dispatch({
        //    type: 'LOGIN_SUCCESS',
        //    payload: response.data
        // })
        localStorage.removeItem('blog_token');
         dispatch({
            type: 'LOGOUT_SUCCESS',
            // payload: response.data
         })
        if(role === 'admin'){
            history.push('/admin/login');
        }
        else {
            history.push('/login');
        }

    } catch (error) {
        console.log(error.response.data);
        /*
        dispatch({
            type: 'LOGIN_ERROR',
            payload: error.response.data.errorMessage    
        })
        */
    }

}



