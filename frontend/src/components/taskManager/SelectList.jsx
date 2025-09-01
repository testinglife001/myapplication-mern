import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const SelectList = ({ lists, selected, setSelected, label }) => {
  return (
    <div className="w-100">
      {label && <p className="text-dark">{label}</p>}

      <Dropdown className="w-100">
        <Dropdown.Toggle
          variant="light"
          className="w-100 text-start border border-secondary px-3 py-2 d-flex align-items-center justify-content-between"
        >
          <span className="text-truncate">{selected || "Select an option"}</span>
          <BsChevronExpand className="ms-2 text-muted" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100 shadow">
          {lists.map((list, index) => (
            <Dropdown.Item
              key={index}
              className="d-flex align-items-center justify-content-between"
              onClick={() => setSelected(list)}
            >
              <span className="text-truncate">{list}</span>
              {selected === list && <MdCheck className="text-primary" />}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SelectList;
