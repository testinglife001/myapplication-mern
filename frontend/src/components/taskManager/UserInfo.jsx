import React, { useEffect, useRef } from "react";
// import { Popover } from "react-bootstrap";
import { getInitials } from "./utils";
import { Popover } from "bootstrap";


const UserInfo =  ({ user }) => {

    const popoverRef = useRef(null);

    useEffect(() => {
        if (popoverRef.current) {
          new Popover(popoverRef.current, {
            trigger: "click",
            placement: "bottom",
            html: true,
            content: `
              <div class="d-flex align-items-center gap-3 p-3">
                <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; font-size: 1.5rem; font-weight: bold;">
                  
                  ${
                    user?.userName
                   }
                </div>
                <div class="d-flex flex-column">
                  <p class="text-dark fw-bold m-0">${user?.userName}</p>
                  <span class="text-muted">${user?.title ?? "Unknown Title"}</span>
                  <span class="text-primary">${user?.email ?? "email@example.com"}</span>
                </div>
              </div>
            `,
            sanitize: false, // Required to allow HTML inside popover
          });
        }
    }, [user]);

  return (
    <div className="px-4">
      <button
        ref={popoverRef}
        className="btn btn-light border rounded-circle text-dark fw-bold"
        data-bs-toggle="popover"
      >
        { /* getInitials(user?.name) */ }
        {user?.userName}
      </button>
    </div>
  )
}

export default UserInfo