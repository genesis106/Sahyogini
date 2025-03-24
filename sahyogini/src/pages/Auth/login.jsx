import { useState } from "react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter phone, Step 2: Enter OTP

  const handlePhoneSubmit = () => {
    if (phone) setStep(2);
  };

  const handleOtpSubmit = () => {
    if (otp) alert("Login Successful!"); // Replace with actual authentication logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        {step === 1 ? (
          <>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={handlePhoneSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Verify OTP & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
