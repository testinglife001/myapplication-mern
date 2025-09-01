import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsChevronExpand } from "react-icons/bs";
import { summary } from "./data";
import clsx from "clsx";

import { getInitials } from "./utils";
import { MdCheck } from "react-icons/md";

const UserList = ({ setTeam, team }) => {
  const data = summary.users;
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (user) => {
    let updatedUsers;
    if (selectedUsers.some((u) => u._id === user._id)) {
      updatedUsers = selectedUsers.filter((u) => u._id !== user._id);
    } else {
      updatedUsers = [...selectedUsers, user];
    }

    setSelectedUsers(updatedUsers);
    setTeam(updatedUsers.map((u) => u._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
    }
  }, []);

  return (
    <div>
      <p className="text-secondary">Assign Task To:</p>
      <Dropdown className="w-100">
        <Dropdown.Toggle
          variant="light"
          className="w-100 text-start border border-secondary px-3 py-2 d-flex align-items-center justify-content-between"
        >
          <span className="text-truncate">
            {selectedUsers?.map((user) => user.name).join(", ") || "Select users"}
          </span>
          <BsChevronExpand className="ms-2 text-muted" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100 shadow">
          {data?.map((user, index) => (
            <Dropdown.Item
              key={index}
              className="d-flex align-items-center gap-2"
              onClick={() => handleChange(user)}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                style={{ width: "24px", height: "24px" }}
              >
                <span className="text-center small">{getInitials(user.name)}</span>
              </div>
              <span className="flex-grow-1">{user.name}</span>
              {selectedUsers.some((u) => u._id === user._id) && (
                <MdCheck className="text-primary" />
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserList;
