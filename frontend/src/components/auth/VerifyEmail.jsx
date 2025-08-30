import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { verify_email } from "../../store/actions/authAction";

const VerifyEmail = ({ history }) => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.adminReducer
  );

  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const inputsRef = useRef([]);

  // Handle typing
  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, ""); // allow only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    // Move focus to next input
    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter full 6-digit OTP");
      return;
    }
    dispatch(verify_email({ otp: otpValue }, history));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "LOGIN_SUCCESS_MESSAGE_CLEAR" });
      history.push('/');
    }
    if (errorMessage?.error) {
      toast.error(errorMessage.error);
      dispatch({ type: "ERROR_CLEAR" });
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <>
    <div className="container-fluid mb-4">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{ style: { fontSize: "15px" } }}
      />

      <div className="container">
        <div className="col-12 text-center mt-5">
          <h3 className="py-2">Verify Your Email</h3>
          <p className="text-muted">Enter the 6-digit OTP sent to your email.</p>
        </div>

        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-4">
            <form onSubmit={handleSubmit} className="text-center">
              <div className="d-flex justify-content-between mb-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control text-center mx-1"
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "20px",
                      border: "2px solid #ccc",
                      borderRadius: "8px",
                    }}
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                  />
                ))}
              </div>

              <div className="col-12 py-3">
                {loader ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  <button className="btn btn-success w-100" type="submit">
                    Verify Email
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default VerifyEmail;
