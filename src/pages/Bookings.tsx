import { useState } from "react";
import NavBar from "../components/Navbar";
import Tata1 from "../Images/TataCurvvEV.png";

function Bookings() {

    const [battery1, setBattery] = useState(75);
      const [timeLeft1, setTimeLeft] = useState("1h 30m");
      const [amountToPay1, setAmountToPay] = useState(150);
      const [date1, setDate] = useState("12/10/2021");

    return(
        <div className="bg-white h-screen dark:bg-gray-800">
            <NavBar />
            <div className="flex justify-center items-center translate-y-50 dark:text-white">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl md:text-4xl">Bookings</h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-10">
                        <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                           <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                           <div className="flex flex-col justify-center items-center absolute inset-0 bg-black/80 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
                              <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                              <div>Battrey Charged: <span className="font-semibold">{battery1}%</span></div>
                              <div>Time Taken: <span className="font-semibold">{timeLeft1}</span></div>
                              <div>Amount Paid: ₹<span className="font-semibold">{amountToPay1}</span></div>
                              <div>Date: <span className="font-semibold">{date1}</span></div>
                           </div>
                        </div>
                        <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                          <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                        </div>
                        <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                          <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                        </div>
                        <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                          <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                        </div>
                        <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                          <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                        </div>
                        <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                          <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookings;