

import axios from "axios";

// GET ALL CATEGORIES
export const getAllCategoryList = () => async (dispatch) => {
  try {
    const response = await axios.get("/rest-api/category/getcategory", {
      withCredentials: true,
    });

    dispatch({
      type: "DASHBOARD_CATEGORYLIST_GET_SUCCESS",
      payload: response.data.categoryList,
    });
  } catch (error) {
    dispatch({
      type: "DASHBOARD_CATEGORYLIST_GET_FAIL",
      payload: error.response?.data?.errorMessage || "Something went wrong",
    });
  }
};

// ADD CATEGORY
export const addCategoryList = (data) => async (dispatch) => {
  dispatch({ type: "SET_LOADER" });
  try {
    const response = await axios.post("/rest-api/category/create", data, {
      withCredentials: true,
    });

    dispatch({
      type: "DASHBOARD_ADD_CATEGORYLIST_SUCCESS",
      payload: response.data.category,
    });

    dispatch(getAllCategoryList());
  } catch (error) {
    dispatch({
      type: "CATEGORYLIST_ADD_FAIL",
      payload: error.response?.data?.errorMessage || "Something went wrong",
    });
  }
};

// UPDATE CATEGORY
export const updatedCategoryList = (categories) => async (dispatch) => {
  try {
    const response = await axios.post("/rest-api/category/update", categories, {
      withCredentials: true,
    });

    dispatch({
      type: "CATEGORYLIST_UPDATE_SUCCESS",
      payload: response.data.updatedCategories || response.data.updatedCategory,
    });

    dispatch(getAllCategoryList());
  } catch (error) {
    dispatch({
      type: "CATEGORYLIST_UPDATE_FAIL",
      payload: error.response?.data?.errorMessage || "Something went wrong",
    });
  }
};

// DELETE CATEGORY
export const deletedCategoryList = (ids) => async (dispatch) => {
  try {
    const response = await axios.delete("/rest-api/category/delete", {
      data: { payload: { ids } },
      withCredentials: true,
    });

    dispatch({
      type: "CATEGORYLIST_DELETE_SUCCESS",
      payload: response.data.message,
    });

    dispatch(getAllCategoryList());
  } catch (error) {
    dispatch({
      type: "CATEGORYLIST_DELETE_FAIL",
      payload: error.response?.data?.errorMessage || "Something went wrong",
    });
  }
};







/*

export const getAllCategoryList = () => async (dispatch) => {
    try {
        const response = await axios.get("/rest-api/category/getcategory", {
            withCredentials: true
        });
        dispatch({
            type: "DASHBOARD_CATEGORYLIST_GET_SUCCESS",
            payload: {
                categoryList: response.data.categoryList
            }
        });
       // console.log("Category List from backend:", response.data.categoryList);

    } catch (error) {
        dispatch({
            type: "DASHBOARD_CATEGORYLIST_GET_FAIL",
            payload: {
                error: error.response?.data?.errorMessage || "Something went wrong"
            }
        });
    }
}


export const getAllCategoryList = () => async (dispatch) => {
    try {
        const response = await axios.get("/rest-api/category/getcategory", {
            withCredentials: true
        });

        dispatch({
            type: "DASHBOARD_CATEGORYLIST_GET_SUCCESS",
            payload: {
                categoryList: response.data.categoryList
            }
        });
    } catch (error) {
        dispatch({
            type: "DASHBOARD_CATEGORYLIST_GET_FAIL",
            payload: {
                error: error.response?.data?.errorMessage || "Something went wrong"
            }
        });
    }
}
 

export const addCategoryList = (data) => async (dispatch) => {
     console.log(data);
    dispatch({ type: "SET_LOADER" });
    try {
        const response = await axios.post("/rest-api/category/create", data, {
            withCredentials: true
        });

        dispatch({
            type: "CATEGORYLIST_ADD_SUCCESS",
            payload: {
                successMessage: response.data.successMessage,
                categoryList: response.data.categoryList
            }
        });
    } catch (error) {
        dispatch({
            type: "CATEGORYLIST_ADD_FAIL",
            payload: {
                error: error.response?.data?.errorMessage || "Something went wrong"
            }
        });
    }
}

export const updatedCategoryList = (data) => async (dispatch) => {
    // console.log(data.get('name'));
    console.log(data);
    try {
        const response = await axios.post("/rest-api/category/update", { data }, {
            withCredentials: true
        });

        dispatch({
            type: "CATEGORYLIST_UPDATE_SUCCESS",
            payload: {
                successMessage: response.data.successMessage,
                categoryList: response.data.categoryList
            }
        });
    } catch (error) {
        dispatch({
            type: "CATEGORYLIST_UPDATE_FAIL",
            payload: {
                error: error.response?.data?.errorMessage || "Something went wrong"
            }
        });
    }
}

export const deletedCategoryList = (ids) => async (dispatch) => {
    console.log(ids);
    try {
        const response = await axios.post("/rest-api/category/delete", { ids }, {
            withCredentials: true
        });

        dispatch({
            type: "CATEGORYLIST_DELETE_SUCCESS",
            payload: {
                successMessage: response.data.successMessage,
                categoryList: response.data.categoryList
            }
        });
    } catch (error) {
        dispatch({
            type: "CATEGORYLIST_DELETE_FAIL",
            payload: {
                error: error.response?.data?.errorMessage || "Something went wrong"
            }
        });
    }
}
*/   


