import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is loaded

export default function Tabs({ tabs, setSelected, children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-100 px-1 px-sm-0">
      <ul className="nav nav-tabs border-bottom">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={tab.title}>
            <button
              className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-medium ${
                activeIndex === index ? "active text-primary border-bottom border-primary" : "text-dark"
              }`}
              onClick={() => {
                setSelected(index);
                setActiveIndex(index);
              }}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content w-100 mt-2">{children}</div>
    </div>
  );
}
