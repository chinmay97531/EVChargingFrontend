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
    <div className="flex justify-center items-center font-sans-serif min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="w-[380px] h-[500px] overflow-hidden relative border-2 border-white/20 rounded-3xl shadow-2xl backdrop-blur-md bg-white/10 animate-slide-up">
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
              className={`text-white justify-center flex mt-[50px] text-[2.3em] font-bold cursor-pointer transition-all duration-500 ease-in-out ${
                isChecked ? "scale-100 opacity-100" : "scale-75 opacity-50"
              }`}
            >
              Sign up
            </label>
            <input
              ref={usernameUpRef}
              type="text"
              name="txt"
              placeholder="User Name"
              className="w-3/5 h-10 bg-white/90 backdrop-blur-sm flex mx-auto my-4 p-3 border-2 border-white/30 outline-none rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            <input
              ref={emailUpRef}
              type="email"
              name="email"
              placeholder="Email"
              className="w-3/5 h-10 bg-white/90 backdrop-blur-sm flex mx-auto my-4 p-3 border-2 border-white/30 outline-none rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            <input
              ref={passwordUpRef}
              type="password"
              name="pswd"
              placeholder="Password"
              className="w-3/5 h-10 bg-white/90 backdrop-blur-sm flex mx-auto my-4 p-3 border-2 border-white/30 outline-none rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-3/5 h-12 mx-auto mt-[30px] block text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-base rounded-xl border-none outline-none transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        <div
          className={`login h-[520px] bg-gradient-to-br from-white to-indigo-50 rounded-[60%/10%] absolute top-0 w-full transition-all duration-700 ease-in-out shadow-2xl ${
            isChecked ? "translate-y-[360px]" : "translate-y-[80px]"
          }`}
        >
          <form onSubmit={handleSignin}>
            <label
              htmlFor="chk"
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-[2.3em] flex justify-center mt-[20px] font-bold cursor-pointer transition-all duration-500 ease-in-out ${
                isChecked ? "scale-75 opacity-50" : "scale-100 opacity-100"
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
              className="w-3/5 h-10 bg-white/90 backdrop-blur-sm flex mx-auto my-4 p-3 border-2 border-indigo-200 outline-none rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            <input
              ref={passwordInRef}
              type="password"
              name="pswd"
              placeholder="Password"
              required
              className="w-3/5 h-10 bg-white/90 backdrop-blur-sm flex mx-auto my-4 p-3 border-2 border-indigo-200 outline-none rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-3/5 h-12 mx-auto mt-[30px] block text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-base rounded-xl border-none outline-none transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
