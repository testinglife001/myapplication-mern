import { Modal } from "react-bootstrap";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import Button from "./Button";

// import Button from "./Button";

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={closeDialog} centered>
      <Modal.Body className="text-center py-4">
        <h3>
          <p
            className={clsx(
              "p-3 rounded-circle d-inline-block",
              type === "restore" || type === "restoreAll"
                ? "text-warning bg-warning bg-opacity-25"
                : "text-danger bg-danger bg-opacity-25"
            )}
          >
            <FaQuestion size={60} />
          </p>
        </h3>

        <p className="text-muted">
          {msg ?? "Are you sure you want to delete the selected record?"}
        </p>

        <div className="bg-light py-3 d-flex justify-content-end gap-3">
          <Button
            type="button"
            className={clsx(
              "px-4 text-white fw-semibold",
              type === "restore" || type === "restoreAll"
                ? "btn btn-warning"
                : "btn btn-danger"
            )}
            onClick={onClick}
            label={type === "restore" ? "Restore" : "Delete"}
          />

          <Button
            type="button"
            className="btn btn-light border"
            onClick={closeDialog}
            label="Cancel"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={closeDialog} centered>
      <Modal.Body className="text-center py-4">
        <h3>
          <p className="p-3 rounded-circle d-inline-block text-danger bg-danger bg-opacity-25">
            <FaQuestion size={60} />
          </p>
        </h3>

        <p className="text-muted">
          Are you sure you want to activate or deactivate this account?
        </p>

        <div className="bg-light py-3 d-flex justify-content-end gap-3">
          <Button
            type="button"
            className="btn btn-danger text-white px-4 fw-semibold"
            onClick={onClick}
            label="Yes"
          />

          <Button
            type="button"
            className="btn btn-light border"
            onClick={closeDialog}
            label="No"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
