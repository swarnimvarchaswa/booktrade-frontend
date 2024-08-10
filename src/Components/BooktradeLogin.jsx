import React, { useState } from "react"; //, useContext
import { Link, useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
// import { LoginContext } from "../context/loginContext";

function Login() {
  // const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [invalidEmail, setinvalidEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [overallError, setOverallError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/; // old regex

  const postData = () => {
    setinvalidEmail("");
    setEmailError("");
    setPasswordError("");
    setOverallError("");
    setIsLoading(true);

    //checking email
    if (!emailRegex.test(email)) {
      // notifyA("Invalid email");
      setinvalidEmail("Enter Valid Email");
      setIsLoading(false);
      return;
    }

    //sending data to server
    fetch("https://booktrade-backend.vercel.app//login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          if (data.error === "EmailError") {
            setEmailError("Email don't match");
            setIsLoading(false);
          } else if (data.error === "OverallError") {
            setOverallError("Please enter email and password");
            setIsLoading(false);
          } else if (data.error === "PasswordError") {
            setPasswordError("Enter Correct password");
            setIsLoading(false);
          }
          // notifyA(data.error);
        } else {
          // notifyB(data.message);
          // console.log(data);
          localStorage.setItem("jwt", data);
          // setUserLogin(true)
          setIsLoading(false);
          navigate("/");
        }
        // console.log(data);
      });
  };

  return (
    <div className="max-w-md mx-auto px-12 my-4 container flex flex-col">
      <div className="">
        <h1 className="text-gray-800 text-5xl font-r font-normal py-10">
          <span className="text-purple-700">book</span>trade
          {/* <span className="font-light text-xl"> beta</span> */}
        </h1>
        <div className="mb-6 font-r tracking-wider">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          />
          {/* invalid email error */}
          {invalidEmail && (
            <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
              {invalidEmail}
            </p>
          )}
          {/* email error */}
          {emailError && (
            <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
              {emailError}
            </p>
          )}
        </div>
        <div className="mb-6 font-r tracking-wider">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
          />
          {/* Password error */}
          {passwordError && (
            <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
              {passwordError}
            </p>
          )}
        </div>
        <div className="grid justify-stretch mt-10 font-r tracking-wider">
          <button
            className={`${
              isLoading ? "bg-purple-400 py-[1px]" : "bg-purple-600 py-3 hover:bg-purple-700"
            } text-white rounded flex items-center justify-center`}
            onClick={() => {
              postData();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <img
                className="h-10"
                src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
                alt="Loading"
              />
            ) : (
              "Log In"
            )}
          </button>
        </div>
        {/* Overall error */}
        {overallError && (
          <p className="text-red-400 px-3 mt-8 font-m tracking-wide text-sm text-center">
            {overallError}
          </p>
        )}

        <div className="flex justify-center mb-4 mt-8 font-r tracking-wide">
          <Link
            to="/signup"
            className="text-gray-600 hover:text-purple-600 text-center"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-10">
          <p className="text-center text-gray-600 font-r tracking-wide">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
