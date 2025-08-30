
// src/components/AllCategoryList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  addCategoryList,
  deletedCategoryList,
  getAllCategoryList,
  updatedCategoryList,
} from "../../store/actions/Dashboard/categoryListAction";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";

import { Modal, Button, Form } from "react-bootstrap";

const AllCategoryList = () => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector(
    (state) => state.dashboardCategoryList
  );

  // console.log(categoryList)

  // States
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  // Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    dispatch(getAllCategoryList());
  }, [dispatch]);

  /** Helpers **/
  const renderCategoryList = (categoryList = []) => {
    return categoryList.map((cat) => (
        <li key={cat._id}>
        {cat.name}
        {cat.children && cat.children.length > 0 && (
            <ul className="list-unstyled px-5">
            {renderCategoryList(cat.children)}
            </ul>
        )}
        </li>
    ));
    };

  const renderCategories = (categoryList = []) => {
    return categoryList.map((cat) => ({
        label: cat.name,
        value: cat._id,
        children: cat.children?.length > 0 ? renderCategories(cat.children) : [],
    }));
  };

 // const createCategoryList = (categoryList, options = []) => {
  const createCategoryList = (categoryList = [], options = []) => {
    for (let category of categoryList) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const prepareUpdateDelete = () => {
    const categories = createCategoryList(categoryList);
    const checkedArr = [];
    const expandedArr = [];

    checked.forEach((id) => {
      const cat = categories.find((c) => c.value === id);
      if (cat) checkedArr.push(cat);
    });
    expanded.forEach((id) => {
      const cat = categories.find((c) => c.value === id);
      if (cat) expandedArr.push(cat);
    });

    setCheckedArray(checkedArr);
    setExpandedArray(expandedArr);
  };

  /** Handlers **/
  const handleAddCategory = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    const form = { name, parentId };
    dispatch(addCategoryList(form));
    setName("");
    setParentId("");
    setShowAdd(false);
  };

  // UPDATE HANDLER
  const handleUpdateCategory = () => {
    const updates = [...expandedArray, ...checkedArray].map((item) => ({
        _id: item.value,
        name: item.name,
        parentId: item.parentId || null,
        type: "none",
    }));

    if (updates.length === 0) {
        toast.error("No categories selected for update");
        return;
    }

    dispatch(updatedCategoryList(updates));
    setShowUpdate(false);
  };

// DELETE HANDLER
  const handleDeleteCategory = () => {
    const ids = [...expandedArray, ...checkedArray].map((item) => item.value);

    if (ids.length === 0) {
        toast.error("No categories selected for deletion");
        return;
    }

    dispatch(deletedCategoryList(ids));
    toast.success("Deleted categories");
    setShowDelete(false);
  };


  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { fontSize: "15px" } }}
      />
      <Helmet>
        <title>All Category List</title>
      </Helmet>


      <div className="Task mt-3 mb-4">
        <div className="Task-header border-bottom-0">
          <form className="d-flex align-items-center ">
            <span className="position-absolute ps-3 search-icon">
              <i className="fe fe-search"></i>
            </span>
            <input
              className="form-control ps-6"
              placeholder="Search Category"
              type="text"
            />
          </form>

          <div className=" mt-3 ">
            <Button variant="primary" onClick={() => setShowAdd(true)}>
            + Add Category
          </Button>
          &nbsp;
          <Button
            variant="info"
            onClick={() => {
              prepareUpdateDelete();
              setShowUpdate(true);
            }}
          >
            Edit / Update
          </Button>
          &nbsp;
          <Button
            variant="danger"
            onClick={() => {
              prepareUpdateDelete();
              setShowDelete(true);
            }}
          >
            Delete
          </Button>
          </div>

        </div>

        <div className="table-responsive mt-4">
        <ul className="list-unstyled px-5">
            {categoryList && categoryList.length > 0
            ? renderCategoryList(categoryList)
            : <li>No categories found</li>}
        </ul>
        </div>

        <CheckboxTree
          nodes={renderCategories(categoryList)}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <IoIosCheckbox />,
            uncheck: <IoIosCheckboxOutline />,
            halfCheck: <IoIosCheckboxOutline />,
            expandClose: <IoIosArrowForward />,
            expandOpen: <IoIosArrowDown />,
          }}
        />
      </div>

      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Parent Category</Form.Label>
              <Form.Select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="">Select Parent</option>
                {createCategoryList(categoryList).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdate} onHide={() => setShowUpdate(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {expandedArray.map((item, idx) => (
            <Form.Group className="mb-3" key={idx}>
              <Form.Label>Expanded: {item.name}</Form.Label>
              <Form.Control
                type="text"
                value={item.name}
                onChange={(e) => {
                  const arr = [...expandedArray];
                  arr[idx].name = e.target.value;
                  setExpandedArray(arr);
                }}
              />
            </Form.Group>
          ))}

          {checkedArray.map((item, idx) => (
            <Form.Group className="mb-3" key={idx}>
              <Form.Label>Checked: {item.name}</Form.Label>
              <Form.Control
                type="text"
                value={item.name}
                onChange={(e) => {
                  const arr = [...checkedArray];
                  arr[idx].name = e.target.value;
                  setCheckedArray(arr);
                }}
              />
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdate(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete these categories?</p>
          {checkedArray.map((item, idx) => (
            <div key={idx}>{item.name}</div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllCategoryList;






/*
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import { addCategoryList, getAllCategoryList, updatedCategoryList } from '../../store/actions/Dashboard/categoryListAction';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload
} from 'react-icons/io';

const AllCategoryList = () => {

  const dispatch = useDispatch();
   const category = useSelector(state => state.dashboardCategoryList);
   const { loader, categories, categoryList, categoriesList, allCategoryList, categoryListError, categoryListSuccessMessage } = useSelector(state=>state.dashboardCategoryList); 
  
   const [show, setShow] = useState(false);
  const [categoryListName,setCategoryListName] = useState('');
  const [name,setName] = useState('');
  const [parentId,setParentId] = useState('');
  const [checked,setChecked] = useState([]);
  const [expanded,setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryListModal,setUpdateCategoryListModal] = useState(false);
  const [deleteCategoryListModal,setDeleteCategoryListModal] = useState(false);


  const handleClose = () => {
    const cat = {
      name,
      parentId
    }
    // console.log(cat);
    // console.log(state);
    // const form = new FormData();
    // form.append('name',categoryListName);
    // form.append('parentId',parentId);
    // dispatch(addCategoryList(form));
    // dispatch(addCategoryList(cat));
     setName('');
     setParentId('');
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const renderCategoryList = (categoryList) => {
    let myCategories = [];
    for (let category of categoryList) {
        myCategories.push(
          <li  key={category._id} 
            >
          {category.name}
          {
            category.children.length > 0 ? (
              <ul className="list-unstyled px-5" >
                {
                  renderCategoryList(category.children)
                }
              </ul>  
            )
            :
            null
          }
          </li>
        );
    }
    return myCategories;
}
  const renderCategories = (categoryList) => {
      let myCategories = [];
      for (let category of categoryList) {
          myCategories.push(
            {
              label: category.name,
              value: category._id,
              children: category.children.length > 0 && renderCategories(category.children)
            }
          );
      }
      return myCategories;
  }

  const createCategoryList = (categoryList,options=[]) => {
    for (let category of categoryList) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId
      });
      if(category.children.length > 0){
        createCategoryList(category.children,options)
      }
    }
    return options;
  }

  const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryListModal(true);
    }
  
  const updateCategoryList = () => {
    setUpdateCategoryListModal(true);
    const categories = createCategoryList(categoryList);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId,index) => {
      const category = categories.find((category,_index) => categoryId == category.value);
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId,index) => {
      const category = categories.find((category,_index) => categoryId == category.value);
      category && expandedArray.push(category);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({checked,expanded,categories,checkedArray,expandedArray});
  }

  const handleCategoryListInput = (key, value, index, type) => {
    console.log(value);
    if (type == "checked") {
        const updatedCheckedArray = checkedArray.map((item, _index) =>
            index == _index ? { ...item, [key]: value } : item);
        setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
        const updatedExpandedArray = expandedArray.map((item, _index) =>
            index == _index ? { ...item, [key]: value } : item);
        setExpandedArray(updatedExpandedArray);
    }
  }

  const deleteCategoryList = () => {
    setDeleteCategoryListModal(true);
    const categories = createCategoryList(categoryList);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId,index) => {
      const category = categories.find((category,_index) => categoryId == category.value);
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId,index) => {
      const category = categories.find((category,_index) => categoryId == category.value);
      category && expandedArray.push(category);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({checked,expanded,categories,checkedArray,expandedArray});
  }

  useEffect(() => {
    // console.log(taskList);
    // console.log(categories);
    // console.log(categoriesList);
    // console.log(categoryList);
    dispatch(getAllCategoryList());
  },[]);

  // console.log(categoryList);
  // console.log({categoryList});
  // console.log(categoryList.categories);
  // console.log(categories);

  const renderDeleteCategoryListModal = () => {
    <div className="modal fade" id="exampleModal" tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true" 
        show={show}  
          handleClose={handleClose} 
        // onHide={handleClose}
        // handleClose={() => setShow(false)}  
        >

      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Category List</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div className="modal-body" >
          
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                  variant="secondary"  >No</button>
              <button type="button" className="btn btn-primary"
                  variant="danger" 
                    
                  >
                    Yes
              </button>
              </div>
          
          <h5>Expanded</h5>
          { expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
          <h5>Checked</h5>
          { checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
          
          </div>

        </div>
      </div>

    </div>
  }

  const renderAddCategoryListModal = () => {
    <div className="modal fade" id="exampleModal" tabindex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true" 
        show={show}  
          handleClose={handleClose} 
        // onHide={handleClose}
        // handleClose={() => setShow(false)}  
        >

      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Category List</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div className="modal-body" >
          <form  onSubmit={handleClose} 
            >

            <div className="mb-3 col-md-11">
              <label for="categoryListTitle" className="form-label"> Category List Title</label>
              <input type="text" id="categoryListName" className="form-control text-dark" 
                  placeholder=" Category List Title" 
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />
              <small>Keep your post titles under 60 characters. Write
                  heading that describe the topic content.
                  Contextualize for Your Audience.</small>
            </div>
              <p className="p-2 text-danger"  >
                  Error
              </p>
            
            <div className="mb-3 col-md-9">
              <label className="form-label">Select Category List </label>
              <select className="selectpicker form-control" data-width="100%"
                  name='parentId'
                  value={parentId}
                  onChange={(e)=>setParentId(e.target.value)}
                    >

                  <option value="">Choose Category List</option>
                  {
                    createCategoryList(categoryList).map((option) => 
                      <option key={option.value} value={option.value} >
                        {option.name}
                      </option>
                    )
                  }
                  

              </select>
            </div>
              <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                >
                Error
              </p>
          
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                  variant="secondary" onClick={handleClose}  >Close</button>
              <button type="button" className="btn btn-primary"
                  variant="primary" 
                    onClick={handleClose}  
                  >
                    Save changes
              </button>
              </div>
          </form>
          
          
          
          
          </div>

        </div>
      </div>

    </div>
  }

  const renderUpdateCategoryListModal = () => {
    return (
      <div className="modal fade" id="exampleUpdateModal" tabindex="-1" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true" 
          // show={updateTaskModal} // handleClose={updateTask} 
          // handleClose={() => setUpdateTaskModal(false)}  
          show={updateCategoryListModal}
           handleClose={()=>setUpdateCategoryListModal(false)}
          // handleClose={updateCategoryListForm} 
            >

        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Edit Category List</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div className="modal-body" >
            <form  onSubmit={updateCategoryListForm} 
              >

                                
              <div className="row" >
              <div className="mb-3 col-md-11">
                <h6>Expanded Tasks</h6>
              </div>
              </div>

              {
                
                expandedArray.length > 0 && 
                expandedArray.map((item,index) => 
                
                <div className="row" key={index} >

                  <div className="mb-3 col-md-4">
                    <label for="categoryListTitle" className="form-label"> Category List Title</label>
                    <input type="text" id="categoryListName" className="form-control text-dark" 
                        placeholder=" Category List Title" 
                        name="name"
                        value={item.name}
                        // onChange={(e)=>setTaskName(e.target.value)}
                          onChange={(e) => handleCategoryListInput('name', e.target.value, index, 'expanded')}
                        />
                    <small>Keep your post titles under 60 characters. Write
                        heading that describe the topic content.
                        Contextualize for Your Audience.</small>
                    <p className="p-2 text-danger"  >
                      Error
                    </p>
                  </div>
                                      
                  <div className="mb-3 col-md-5">
                    <label className="form-label">Category List </label>
                    <select className="selectpicker form-control" data-width="100%"
                        name="parentId" 
                        value={item.parentId} 
                        //onChange={(e)=>setParentId(e.target.value)}  
                          onChange={(e) => handleCategoryListInput('parentId', e.target.value, index, 'expanded')}
                        >

                        <option value="">Choose Category List</option>

                        {
                          createCategoryList(categoryList).map((option) => 
                            <option key={option.value} value={option.value} >
                              {option.name}
                            </option>
                          )
                        }

                    </select>

                    <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                    >
                      Error
                    </p>
                  </div>
                  
                  <div className="mb-3 col-md-3">
                    <label className="form-label">Category List Type </label>
                    <select className="selectpicker form-control" data-width="100%"
                        name="type" 
                        // value={item.parentId} 
                        //onChange={(e)=>setParentId(e.target.value)}  
                        // onChange={(e) => handleTaskInput('parentId', e.target.value, index, 'expanded')}
                        >

                        <option value="">Choose Category List Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                        

                    </select>

                    <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                    >
                      Error
                    </p>
                        
                  </div>
                                    
                  <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                      variant="secondary" onClick={handleClose}  >Close</button>
                  <button type="button" className="btn btn-primary"
                      variant="primary" 
                      onClick={handleClose}  
                      >
                        Save changes
                  </button>
                  </div>

                </div>            
                                  
                )
              }

              <br/>
              <hr/>
              <br/>

              <div className="row" >
              <div className="mb-3 col-md-11">
                <h6>Checked Tasks</h6>
              </div>
              </div>


              {
                
                checkedArray.length > 0 && 
                checkedArray.map((item,index) =>
                
                <div className="row" key={index} >

                  <div className="mb-3 col-md-11">
                    <label for="categoryListTitle" className="form-label"> category List Title</label>
                    <input type="text" id="categoryListName" className="form-control text-dark" 
                        placeholder=" category List Title" 
                        name="name"
                        value={item.name}
                        // onChange={(e)=>setTaskName(e.target.value)}
                        onChange={(e) => handleCategoryListInput('name', e.target.value, index, 'checked')}
                        />
                    <small>Keep your post titles under 60 characters. Write
                        heading that describe the topic content.
                        Contextualize for Your Audience.</small>
                  </div>
                  <p className="p-2 text-danger"  >
                    Error
                  </p>
                
                  <div className="mb-3 col-md-9">
                    <label className="form-label">category List </label>
                    <select className="selectpicker form-control" data-width="100%"
                        name="parentId" 
                        value={item.parentId} 
                        //onChange={(e)=>setParentId(e.target.value)}  
                        onChange={(e) => handleCategoryListInput('parentId', e.target.value, index, 'checked')}
                        >

                        <option value="">Choose categoryList</option>

                        {
                          createCategoryList(categoryList).map((option) => 
                            <option key={option.value} value={option.value} >
                              {option.name}
                            </option>
                          )
                        }

                    </select>
                  </div>
                  <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                    >
                    Error
                  </p>


                  <div className="mb-3 col-md-9">
                    <label className="form-label">Category List Type </label>
                    <select className="selectpicker form-control" data-width="100%"
                        name="type" value={item.parentId} 
                        //onChange={(e)=>setParentId(e.target.value)}  
                        // onChange={(e) => handleTaskInput('parentId', e.target.value, index, 'expanded')}
                        >

                        <option value="">Choose category List</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                        

                    </select>
                  </div>
                  <p className="p-2 text-danger" // style={{marginLeft:'20px'}}  
                    >
                    Error
                  </p>
              
                  <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                      variant="secondary" onClick={handleClose}  >Close</button>
                  <button type="button" className="btn btn-primary"
                      variant="primary" 
                      onClick={handleClose}  
                      >
                        Save changes
                  </button>
                  </div>

                </div>
                
                )
              }

              <br/>
              <hr/>
              <br/>


            </form>                 
            
            </div>

          </div>
        </div>

      </div>
    );
  }

  const updateCategoryListForm = () => {
    const form = new FormData();
    expandedArray.forEach((item,index) => {
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ? item.parentId:"");
      form.append('type',item.type);
    });
    checkedArray.forEach((item,index) => {
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ? item.parentId:"");
      form.append('type',item.type);
    });
    console.log(form);
     dispatch(updatedCategoryList(form));
    setUpdateCategoryListModal(false);
  }



  return (
    <div>
      <Toaster position={'bottom-center'} 
            reverseOrder={false}
            toastOptions={
                {
                    style: {
                        fontSize: '15px'
                    }
                }
            }
        />
        
        <Helmet>
            <title>All CategoryList AllCategoryList</title>
        </Helmet>        
        <br/>  

        AllCategoryList

        <div>
        <div className="Task mb-4 ">
                            
            <div className="Task-header border-bottom-0">
                
                <form className="d-flex align-items-center ">
                    <span className="position-absolute ps-3 search-icon">
                    <i className="fe fe-search"></i>
                    </span>
                    <input  className="form-control ps-6" 
                            placeholder="Search Task" 
                            type="text"  />
                </form>

                

                <button className="btn btn-secondary "  id="dropdownMenuButton1">
                    Notification
                </button>
                &nbsp;
           
                <button type="button" className="btn btn-primary"   
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    variant="primary" onClick={handleShow}    >
                  Add Create Category List
                </button>
                
                &nbsp;
            
                <button type="button" className="btn btn-primary"   
                    data-bs-toggle="modal" data-bs-target="#exampleUpdateModal"
                    variant="primary" onClick={updateCategoryList}    >
                  Edit Update Category List
                </button>

                &nbsp;
              
                <button type="button" className="btn btn-primary"   
                    data-bs-toggle="modal" data-bs-target="#exampleUpdateModal"
                    variant="primary" onClick={deleteCategoryList}    >
                  Delete Category List
                </button>
                
                &nbsp;
                <button className="btn btn-danger"  id="dropdownMenuButton1">
                <Link to="/dashboard/all-category-list" className="dropdown-item">
                    All Category List
                </Link>
                </button>
                &nbsp;
                <button className="btn btn-success"  id="dropdownMenuButton1">
                <Link to="/dashboard/add-subtask" className="dropdown-item">
                    Add Sub Task
                </Link>
                </button>

            </div>

            <br/><br/>
                            
            <div className="table-responsive border-0 overflow-y-hidden">
               <ul className="list-unstyled px-5" >
                  {
                     renderCategoryList(categoryList)
                  }
                  <br/>
                  <br/>
                  {
                    // JSON.stringify(createCategoryList(categoryList))
                  }
                  what
                  {           
                     categoryList.length > 0 ?
                    // categoryList && // > 0 ?
                    // categoryList.categories.map((cat,index) => {
                      categoryList.map((cat,index) => {
                        return (
                            <ul  >
                                {cat.name} - {cat.slug} <br/>
                                {cat._id}
                            </ul>
                        )
                    })
                     :
                     '' 
                  }
                </ul>
                <br/>
                <br/>

              {
              <ul className="list-unstyled px-5" >
                { renderTaskList(taskList) }
                {
                  // JSON.stringify(createTaskList(taskList))
                }
              </ul>
              }

              <br/><br/>
              <hr/>
              <br/><br/>

            </div>

            <div className='row'> 
            <div className='col-md-12'> 
              
              <CheckboxTree 
                nodes={renderCategories(categoryList)}
                checked={checked}
                expanded={expanded}
                // onCheck={checked => setChecked({ checked })}
                // onExpand={expanded => setExpanded({ expanded })}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                  icons={{
                    check: <IoIosCheckbox/> ,
                    uncheck: <IoIosCheckboxOutline/>,
                    halfCheck: <IoIosCheckboxOutline/>,
                    expandClose: <IoIosArrowForward/>,
                    expandOpen: <IoIosArrowDown/>,
                  }}
                />

            </div>
            </div>

            <div className='row'> 
            <div className='col'> 
                <button  onClick={updateCategory}  className='btn btn-info'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
            </div>
            </div>

            <br/><br/>
            <hr/>
            <br/><br/>
            <br/><br/>
            
 
            {
              renderAddCategoryListModal()
            }
            

     
            {
              renderUpdateCategoryListModal()
            }

            {
            renderDeleteCategoryListModal()
            }
            

        </div>
        </div>

    </div>
  )
}

export default AllCategoryList
*/