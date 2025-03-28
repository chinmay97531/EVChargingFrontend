import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Authentication() {

    const usernameUpRef = useRef<HTMLInputElement>(null);
    const emailUpRef = useRef<HTMLInputElement>(null);
    const passwordUpRef = useRef<HTMLInputElement>(null);

    const emailInRef = useRef<HTMLInputElement>(null);
    const passwordInRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    async function signup() {
        const username = usernameUpRef.current?.value;
        const email = emailUpRef.current?.value;
        const password = passwordUpRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                email,
                password
        })

        alert("You have signed up!");
        navigate("/dashboard")
    }

    async function signin() {
        const username = emailInRef.current?.value;
        const password = passwordInRef.current?.value;
        const respone = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
        })

        const jwt = respone.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }


    return(
        <div className="flex justify-center items-center font-sans-serif min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="w-[350px] h-[440px] overflow-hidden relative border rounded-2xl shadow-[5px_20px_50px_rgba(0,0,0,1)]">
                <input type="checkbox" id="chk" className="hidden" checked={isChecked} onChange={handleCheckboxChange} aria-hidden="false" />
                <div className="w-full h-full relative">
                    <form>
                        <label htmlFor="chk" aria-hidden="true" className={`text-[#fff] justify-center flex mt-[50px] text-[2.3em] font-bold cursor-pointer transition-transform duration-800 ease-in-out ${isChecked ? 'scale-100': 'scale-60'}`}>Sign up</label>
                        <input ref={usernameUpRef} type="text" name="txt" placeholder="User Name" className="w-3/5 h-8 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md" />
                        <input ref={emailUpRef} type="email" name="email" placeholder="Email" className="w-3/5 h-8 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md" />
                        <input ref={passwordUpRef} type="password" name="pswd" placeholder="Password" className="w-3/5 h-8 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md" />
                        <button onClick={signup} className="w-3/5 h-10 mx-auto mt-[30px] block text-white bg-[#573b8a] font-bold text-base rounded-md border-none outline-none transition-colors duration-200 ease-in hover:bg-[#6d44b8] cursor-pointer">Sign up</button>
                    </form>
                </div>

                <div className={`login h-[480px] bg-[#eee] rounded-[60%/10%] absolute top-0 w-full transition-transform duration-800 ease-in-out ${isChecked ? 'translate-y-[340px]' : 'translate-y-[100px]'}`}>
                    <form>
                        <label htmlFor="chk"className={`text-[#573b8a] text-[2.3em] flex justify-center mt-[20px] font-bold cursor-pointer transition-transform duration-800 ease-in-out ${isChecked ? 'scale-60' : 'scale-100'}`}aria-hidden="true">Login</label>
                        <input ref={emailInRef} type="email" name="email" placeholder="Email" required className="w-3/5 h-10 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md" />
                        <input ref={passwordInRef} type="password" name="pswd" placeholder="Password" required className="w-3/5 h-10 bg-[#e0dede] flex mx-auto my-5 p-3 border-none outline-none rounded-md"/>
                        <button onClick={signin} type="submit"className="w-3/5 h-10 mx-auto mt-[30px] block text-white bg-[#573b8a] font-bold text-base rounded-md border-none outline-none transition-colors duration-200 ease-in hover:bg-[#6d44b8] cursor-pointer">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authentication;