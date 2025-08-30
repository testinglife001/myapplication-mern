import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BsFillPeopleFill} from 'react-icons/bs';
import { FaRegCaretSquareRight, FaRegUser, FaTag } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { dashboard_index_data_get } from '../../store/actions/Dashboard/dashboardAction';


const DashboardIndex = () => {

    const dispatch = useDispatch();

    const {dashboard_data,articleCount,categoryCount,tagCount,subAdminCount} 
                = useSelector(state=>state.dashboardIndex);

    let graphData = [];
    if(dashboard_data.monthArray?.length > 0){
        for(let i=0; i<12; i++){
            graphData.push(dashboard_data.monthArray[i].viewer)
        }
    }


    const chartOptions = {
        series: [
            {
                name: "Visitor",
                data: graphData
            }
        ],
        options: {
            color:['#181ee8','#181ee8'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: 'false'
            }
        }
    }

    useEffect(() => {
        dispatch(dashboard_index_data_get());
    },[])

  return (
    <div className="ml-sm-auto px-md-4 py-4" >
        <div>Dashboard Index</div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">Overview</li>
            </ol>
        </nav>
        <h1 className="h2">Dashboard</h1>
        <p>This is the homepage of a simple admin interface which is part of a tutorial written on Themesberg</p>

        <div className="card-chart" >
            <Chart 
                options={chartOptions.options}
                series={chartOptions.series}
                type='bar'
                height='100%'
                width='100%'
            />
        </div>
        
        <div className="row my-4">
            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <div className="Task">
                    <BsFillPeopleFill />
                    <h5 className="Task-header">Visitors</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">{dashboard_data.viewer}</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">18.2% increase since last month</p>
                    </div>
                    </div>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <BsFillPeopleFill />
                    
                    <h5 className="Task-header">Articles</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">{articleCount}</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">4.6% increase since last month</p>
                    </div>
                    </div>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <BsFillPeopleFill />
                    <h5 className="Task-header">Users</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">64k</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">2.5% increase since last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-4">
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <FaRegCaretSquareRight />
                    <h5 className="Task-header">Categories</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">{categoryCount}</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-danger">2.6% decrease since last month</p>
                    </div>
                    </div>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <FaTag />
                    <h5 className="Task-header">Tags</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">{tagCount}</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">2.5% increase since last month</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <BsFillPeopleFill />
                    <h5 className="Task-header">Users</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">64k</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">2.5% increase since last month</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-4">
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                <BsFillPeopleFill />
                    <h5 className="Task-header">Sub Admins</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">{subAdminCount}</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-danger">2.6% decrease since last month</p>
                    </div>
                    </div>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <BsFillPeopleFill />
                    <h5 className="Task-header">Users</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">64k</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">2.5% increase since last month</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                <div className="Task">
                    <BsFillPeopleFill />
                    <h5 className="Task-header">Users</h5>
                    <div className="Task-body">
                        <h5 className="Task-title">64k</h5>
                        <p className="Task-text">Feb 1 - Apr 1, United States</p>
                        <p className="Task-text text-success">2.5% increase since last month</p>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default DashboardIndex