import React from 'react'
import Helmet from 'react-helmet'

const AllUser = () => {
  return (
    <div>
        <Helmet>
            <title>All User</title>
        </Helmet>
        AllUser
        <div>
        <div className="Task mb-4 ">
                            
            <div className="Task-header border-bottom-0">
                
                <form className="d-flex align-items-center ">
                    <span className="position-absolute ps-3 search-icon">
                    <i className="fe fe-search"></i>
                    </span>
                    <input type="search" className="form-control ps-6" placeholder="Search Category" />
                </form>
            </div>
                            
            <div className="table-responsive border-0 overflow-y-hidden">
                <table className="table mb-0 text-nowrap">
                    <thead className="table-light">
                        <tr>
                            <th className="border-0 font-size-inherit">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="checkAll" />
                                    <label className="form-check-label" for="checkAll"></label>
                                </div>
                            </th>
                            <th className="border-0">CATEGORY</th>
                            <th className="border-0">SLUG</th>
                            <th className="border-0">POSTS</th>
                            <th className="border-0"> DATE CREATED</th>
                            <th className="border-0">
                                DATE UPDATED
                            </th>
                            <th className="border-0">
                                STATUS
                            </th>
                            <th className="border-0"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="accordion-toggle collapsed" id="accordion1" data-bs-toggle="collapse" data-bs-parent="#accordion1" data-bs-target="#collapseOne" >
                            <td className="align-middle border-top-0">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="categoryCheck1" />
                                    <label class="form-check-label" for="categoryCheck1"></label>
                                </div>
                            </td>
                            <td className="align-middle border-top-0">
                                <a href="#" className="text-inherit position-relative">
                                    <h5 className="mb-0 text-primary-hover"><i className="fe fe-chevron-down fs-4 me-2 text-muted position-absolute ms-n4 mt-1"></i> Courses
                                    </h5>
                                </a>
                            </td>
                            <td className="align-middle border-top-0">
                                desgincourse
                            </td>
                            <td className="align-middle border-top-0">
                                1
                            </td>
                            <td className="align-middle border-top-0">
                                16 Oct, 2020
                            </td>
                            <td className="align-middle border-top-0">16 Nov, 2020</td>
                            <td className="align-middle border-top-0">
                                <span className="badge-dot bg-success"></span>
                            </td>
                            <td className="text-muted align-middle border-top-0">
                                <span className="dropdown dropstart">
                                <a className="btn-icon btn btn-ghost btn-sm rounded-circle" href="#" role="button" id="courseDropdown1"
                                    data-bs-toggle="dropdown" data-bs-offset="-20,20" aria-expanded="false">
                                    <i className="fe fe-more-vertical"></i>
                                </a>
                                    <span className="dropdown-menu" aria-labelledby="courseDropdown1">
                                    <span className="dropdown-header">Action</span>
                                        <a className="dropdown-item" href="#">
                                        <i className="fe fe-send dropdown-item-icon"></i>Publish</a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fe fe-inbox dropdown-item-icon"></i>Moved
                                            Draft
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fe fe-trash dropdown-item-icon"></i>Delete</a>
                                    </span>
                                    </span>
                            </td>
                        </tr>
                        <tr id="collapseOne">
                            <td className=" align-middle ">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="categoryCheck2" />
                                    <label className="form-check-label" for="categoryCheck2"></label>
                                </div>
                            </td>
                            <td className="align-middle ">
                                <a href="#" className="text-inherit">
                                    <h5 className="mb-0 text-primary-hover ms-3">Child Category</h5>
                                </a>
                            </td>
                            <td className="align-middle ">
                                childcategory
                            </td>
                            <td className="align-middle ">
                                4
                            </td>
                            <td className="align-middle ">
                                16 Oct, 2020
                            </td>
                            <td className="align-middle ">16 Nov, 2020</td>
                            <td className="align-middle ">
                                <span className="badge-dot bg-warning"></span>
                            </td>
                            <td className="text-muted align-middle ">
                                <span className="dropdown dropstart">
                                <a className="btn-icon btn btn-ghost btn-sm rounded-circle" href="#" role="button" id="courseDropdown2"
                                    data-bs-toggle="dropdown" data-bs-offset="-20,20" aria-expanded="false">
                                    <i className="fe fe-more-vertical"></i>
                                </a>
                                <span className="dropdown-menu" aria-labelledby="courseDropdown2">
                                <span className="dropdown-header">Action</span>
                                <a className="dropdown-item" href="#">
                                    <i className="fe fe-send dropdown-item-icon"></i>Publish
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fe fe-inbox dropdown-item-icon"></i>Moved
                                    Draft
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fe fe-trash dropdown-item-icon"></i>Delete</a>
                                </span>
                                </span>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AllUser