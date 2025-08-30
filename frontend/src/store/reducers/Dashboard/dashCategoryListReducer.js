
const categoryListState = {
    loader: false,
    categoryListError: '',
    categoryListSuccessMessage: '',
    categories: [],
    categoryList: [],
    categoriesList: [], 
    allCategoryList: [],
    perPage: 0,
    categoryListCount: 0,
    editCategoryList: '',
    editRequest: false
}

const buildNewCategories = (parentId, categoryList, category) => {
    let myCategories = [];

    if(parentId === undefined || parentId === null){
        return [
            ...categoryList,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for(let cat of categoryList){
        if(cat._id === parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }

    return myCategories;
}

export const dashCategoryListReducer = (state = categoryListState, action) => {
    const { payload, type } = action;

    switch(type){

        case 'SET_LOADER':
            return { ...state, loader: true };

        case 'DASHBOARD_CATEGORYLIST_GET_SUCCESS':
            return {
                ...state,
                loader: false,
                categoryList: payload, // matches backend
                categoriesList: payload
            };

        case 'DASHBOARD_CATEGORYLIST_GET_FAIL':
            return {
                ...state,
                loader: false,
                categoryListError: payload
            };

        case 'DASHBOARD_ADD_CATEGORYLIST_SUCCESS':
            const updatedCategories = buildNewCategories(payload.parentId, state.categoryList, payload);
            return {
                ...state,
                loader: false,
                categories: updatedCategories,
                categoryList: updatedCategories,
                categoryListSuccessMessage: "Category added successfully"
            };

        case 'CATEGORYLIST_UPDATE_SUCCESS':
            return {
                ...state,
                loader: false,
                categoryListSuccessMessage: "Category updated successfully"
            };

        case 'CATEGORYLIST_DELETE_SUCCESS':
            return {
                ...state,
                loader: false,
                categoryListSuccessMessage: "Category deleted successfully"
            };

        case 'CATEGORYLIST_ADD_FAIL':
        case 'CATEGORYLIST_UPDATE_FAIL':
        case 'CATEGORYLIST_DELETE_FAIL':
            return {
                ...state,
                loader: false,
                categoryListError: payload
            };

        default:
            return state;
    }
}



/*
const categoryListState = {
    loader: false,
    categoryListError: '',
    categoryListSuccessMessage: '',
    categories: [],
    categoryList: [],
    categoriesList: [], 
    allCategoryList: [],
    perPage: 0,
    categoryListCount: 0,
    editCategoryList: '',
    editRequest: false
}

const buildNewCategories = (parentId, categoryList, category) => {
    let myCategories = [];

    
    if(parentId == undefined){
        return [
            ...categoryList,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                // type: category.type,
                children: []
            }
        ];
    }
    
    
    
    for(let cat of categoryList){

        // if(cat.parentId && cat.parentId == id){
        if(cat._id == parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                // type: task.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }

        
    }


    return myCategories;
}

export const dashCategoryListReducer = (state=categoryListState, action) => {
    const {payload, type} = action;
    if(type === 'SET_LOADER'){
        return {
            ...state,
            loader: true
        }
    }
    if(type === 'DASHBOARD_CATEGORYLIST_GET_SUCCESS'){
        
        return {
            ...state,
            loader: false,
            categoryList: action.payload.categoryList, // ✅ match backend
            categoriesList: action.payload.categoryList
        }
    }

    if(type === 'DASHBOARD_ADD_CATEGORYLIST_SUCCESS'){
        const category = action.payload; // ✅ now payload itself is category
        const updatedCategories = buildNewCategories(
            category.parentId,
            state.categoryList,
            category
        );
        return {
            ...state,
            loader: false,
            categories: updatedCategories,
            categoryList: updatedCategories
        }
    }

    if(type === 'DASHBOARD_ADD_CATEGORYLIST_GET_FAIL'){
        // console.log(action.payload);
        return {
            ...state,
            loader: false,
            categoryListError: payload.error,
        }
    }
    return state;
}
*/

    
