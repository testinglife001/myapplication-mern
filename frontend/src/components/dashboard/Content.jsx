import React from 'react'

const Content = () => {
  return (
    <div className="ml-sm-auto px-md-4 py-4" >
        <div>Content Index</div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Overview</li>
            </ol>
        </nav>
        <h1 className="h2">Content</h1>
        <p>This is the homepage of a simple admin interface which is part of a tutorial written on Themesberg</p>
        
    </div>
  )
}

export default Content