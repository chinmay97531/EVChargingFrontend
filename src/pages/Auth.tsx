import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Authentication() {
  const usernameUpRef = useRef<HTMLInputElement>(null);
  const emailUpRef = useRef<HTMLInputElement>(null);
  const passwordUpRef = useRef<HTMLInputElement>(null);

  const emailInRef = useRef<HTMLInputElement>(null);
  const passwordInRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const username = usernameUpRef.current?.value;
    const email = emailUpRef.current?.value;
    const password = passwordUpRef.current?.value;
    
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await signup({ username, email, password });
      alert("You have signed up successfully!");
      navigate("/profile");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error signing up");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    const email = emailInRef.current?.value;
    const password = passwordInRef.current?.value;
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      navigate("/profile");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error signing in");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center font-sans-serif min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-[350px] h-[440px] overflow-hidden relative border rounded-2xl shadow-[5px_20px_50px_rgba(0,0,0,1)]">
        <input
          type="checkbox"
          id="chk"
          className="hidden"
          checked={isChecked}
          onChange={handleCheckboxChange}
          aria-hidden="false"
        />
        <div className="w-full h-full relative">
          <form onSubmit={handleSignup}>
            <label
              htmlFor="chk"
              aria-hidden="true"
              className={`text-[#fff] justify-center flex mt-[50px] text-[2.3em] font-bold cursor-pointer transition-transform duration-800 ease-in-out ${
                isChecked ? "scale-100" : "scale-60"
              }`}
            >
              Sign up
            </label>
            <input
              ref={usernameUpRef}
              type="text"
              name="txt"
              placeholder="User Name"
              className="w-3/5 h-8 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md"
            />
            <input
              ref={emailUpRef}
              type="email"
              name="email"
              placeholder="Email"
              className="w-3/5 h-8 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md"
            />
            <input
              ref={passwordUpRef}
              type="password"
              name="pswd"
              placeholder="Password"
              className="w-3/5 h-8 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-3/5 h-10 mx-auto mt-[30px] block text-white bg-[#573b8a] font-bold text-base rounded-md border-none outline-none transition-colors duration-200 ease-in hover:bg-[#6d44b8] cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        <div
          className={`login h-[480px] bg-[#eee] rounded-[60%/10%] absolute top-0 w-full transition-transform duration-800 ease-in-out ${
            isChecked ? "translate-y-[340px]" : "translate-y-[100px]"
          }`}
        >
          <form onSubmit={handleSignin}>
            <label
              htmlFor="chk"
              className={`text-[#573b8a] text-[2.3em] flex justify-center mt-[20px] font-bold cursor-pointer transition-transform duration-800 ease-in-out ${
                isChecked ? "scale-60" : "scale-100"
              }`}
              aria-hidden="true"
            >
              Login
            </label>
            <input
              ref={emailInRef}
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-3/5 h-10 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md"
            />
            <input
              ref={passwordInRef}
              type="password"
              name="pswd"
              placeholder="Password"
              required
              className="w-3/5 h-10 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-3/5 h-10 mx-auto mt-[30px] block text-white bg-[#573b8a] font-bold text-base rounded-md border-none outline-none transition-colors duration-200 ease-in hover:bg-[#6d44b8] cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
