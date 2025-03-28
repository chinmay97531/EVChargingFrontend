import { useState } from "react";
import DayMode from "../icons/DayMode.svg";
import NightMode from "../icons/NightMode.svg";
import OpenMenu from "../icons/DropdownMenuOpen.svg";
import CloseMenu from "../icons/DropdownMenuClose.svg";
import { useNavigate } from "react-router-dom";

function NavBar(){

    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));


    function menuHandler(): void{
        setOpenMenu((prev) =>
            !prev
        );
    }

    function Toggle(): void{
        document.documentElement.classList.toggle("dark");
        setIsDarkMode((prev) => !prev);
    }

    function signout() {
        localStorage.removeItem("token");
        navigate("/auth");
    }

    return (
        <nav>
            <div id="navbar" className="flex justify-between items-center px-7 py-5 w-[90%] fixed top-5 left-1/2 translate-x-[-50%] rounded-xl shadow-xl bg-white dark:bg-gray-800 dark:text-white dark:shadow-xl">
                <div className="text-2xl md:text-4xl font-bold italic uppercase text-gray-700 dark:text-gray-300">
                    <div>EV Charging</div>
                </div>
                
                <ul
          className={`flex flex-col md:flex-row md:w-auto md:justify-between text-center gap-6 md:gap-10 [&>li]:cursor-pointer font-medium absolute md:static top-20 right-0 w-64 transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "translate-x-full"} md:translate-x-0 h-auto md:h-auto p-5 md:p-0 shadow-lg md:shadow-none`}>
                    <div onClick={() => navigate("/")}><li className="hover:text-blue-400 dark:hover:text-teal-200">Home</li> </div>
                    <div onClick={() => navigate("/profile")}><li className="hover:text-blue-400 dark:hover:text-teal-200">Profile</li> </div>
                    <div onClick={() => navigate("/bookings")}><li className="hover:text-blue-400 dark:hover:text-teal-200">Bookings</li> </div>
                    <div onClick={() => navigate("/ChargingStations/state")}><li className="hover:text-blue-400 dark:hover:text-teal-200">Charging Stations</li> </div>
                    <div onClick={signout}><li className="hover:text-blue-400 dark:hover:text-teal-200">Logout</li> </div>
                    <li onClick={Toggle} className="hover:text-blue-400 dark:hover:text-teal-200">
                    <img
                        src={isDarkMode ? DayMode : NightMode}
                        alt={isDarkMode ? "Day Mode" : "Night Mode"}
                        className="w-6 h-6 dark:invert translate-x-[400%] md:translate-0"
                    />    
                    </li>
                </ul>

                    <div className="md:hidden">
                        <button onClick={menuHandler}>
                            <img
                                src={openMenu ? CloseMenu : OpenMenu}
                                alt="Menu Icon"
                                className="w-6 h-6 dark:invert"
                            />
                        </button>
                    </div>

            </div>   
                    
        </nav>
    )
}

export default NavBar;