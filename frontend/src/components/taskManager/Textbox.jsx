import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className="w-100 d-flex flex-column gap-1">
        {label && (
          <label htmlFor={name} className="text-dark">
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            // {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "form-control border-secondary placeholder-secondary text-dark",
              "focus-ring focus-ring-primary",
              className
            )}
          />
        </div>

        {error && <span className="text-danger small mt-1">{error}</span>}
      </div>
    );
  }
);

export default Textbox;
