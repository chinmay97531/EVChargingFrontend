import { useState } from "react";
import Tata1 from "../Images/TataCurvvEV.png";
import Tata2 from "../Images/TataNexonEV.png";
import Hyundai1 from "../Images/HyundaiIoniq5.png";
import Mahindra1 from "../Images/MahindraBE6.png";
import Mahindra2 from "../Images/MahindraXEV9e.png";
import MG1 from "../Images/MGCometEV.png";

function Hero() {
  const [battery1] = useState(75);
  const [timeLeft1] = useState("1h 30m");
  const [amountToPay1] = useState(150);

  return (
    <div className="flex justify-center items-center translate-y-50 dark:text-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl">Powergrid Electric Vehicle Charging Station</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-10">
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                  <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full"/>
                  <div className="flex flex-col justify-center items-center absolute inset-0 bg-black/80 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-500">
                        <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                        <div>Battrey Charge: <span className="font-semibold">{battery1}%</span></div>
                        <div>Time Left: <span className="font-semibold">{timeLeft1}</span></div>
                        <div>Amount To Pay: ₹<span className="font-semibold">{amountToPay1}</span></div>
                  </div>
                </div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                  <img src={Tata2} alt="Tata Nexon EV" className="w-full h-full"/>
                </div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                  <img src={Hyundai1} alt="Hyundai Ioniq 5" className="w-full h-full"/>
                </div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                  <img src={Mahindra1} alt="Mahindra BE6" className="w-full h-full"/>
                </div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                  <img src={Mahindra2} alt="Mahindra XEV9e" className="w-full h-full"/>
                </div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
                  <img src={MG1} alt="MG Comet EV" className="w-full h-full"/>
                </div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>Empty Slot</div>
                <div className={`h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>Empty Slot</div>
          </div>
        </div>
    </div>
  );
};

export default Hero;