import { useState } from "react";
import NavBar from "../components/Navbar";
import Tata1 from "../Images/TataCurvvEV.png";
import Tata2 from "../Images/TataNexonEV.png";
import Hyundai1 from "../Images/HyundaiCreta1.png";
import Mahindra1 from "../Images/MahindraBE6.png";
import Mahindra2 from "../Images/MahindraXEV9e.png";
import MG1 from "../Images/MGCometEV.png";

function Bookings() {
  // Tata Curvv EV
  const [battery1, setBattery1] = useState(75);
  const [timeLeft1, setTimeLeft1] = useState("1h 30m");
  const [amountToPay1, setAmountToPay1] = useState(150);
  const [date1, setDate1] = useState("12/10/2021");

  // Tata Nexon EV
  const [battery2, setBattery2] = useState(62);
  const [timeLeft2, setTimeLeft2] = useState("1h 05m");
  const [amountToPay2, setAmountToPay2] = useState(132);
  const [date2, setDate2] = useState("06/02/2022");

  // Hyundai Ioniq EV
  const [battery3, setBattery3] = useState(89);
  const [timeLeft3, setTimeLeft3] = useState("45m");
  const [amountToPay3, setAmountToPay3] = useState(210);
  const [date3, setDate3] = useState("23/08/2023");

  // Mahindra BE EV
  const [battery4, setBattery4] = useState(54);
  const [timeLeft4, setTimeLeft4] = useState("1h 50m");
  const [amountToPay4, setAmountToPay4] = useState(180);
  const [date4, setDate4] = useState("15/05/2024");

  // Mahindra XEV EV
  const [battery5, setBattery5] = useState(38);
  const [timeLeft5, setTimeLeft5] = useState("2h 20m");
  const [amountToPay5, setAmountToPay5] = useState(240);
  const [date5, setDate5] = useState("19/12/2024");

  // MG Comet EV
  const [battery6, setBattery6] = useState(92);
  const [timeLeft6, setTimeLeft6] = useState("35m");
  const [amountToPay6, setAmountToPay6] = useState(95);
  const [date6, setDate6] = useState("05/03/2025");

  return (
    <div className="bg-white h-screen dark:bg-gray-800">
      <NavBar />
      <div className="flex justify-center items-center translate-y-50 dark:text-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl">Bookings</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 p-10">
            {/* 1. Tata Curvv EV */}
            <div className={`relative group overflow-hidden h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
              <img src={Tata1} alt="Tata Curvv EV" className="w-full h-full" />
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                <div>Battrey Charged: <span className="font-semibold">{battery1}%</span></div>
                <div>Time Taken: <span className="font-semibold">{timeLeft1}</span></div>
                <div>Amount Paid: ₹<span className="font-semibold">{amountToPay1}</span></div>
                <div>Date: <span className="font-semibold">{date1}</span></div>
              </div>
            </div>

            {/* 2. Tata Nexon EV */}
            <div className={`relative group overflow-hidden h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
              <img src={Tata2} alt="Tata Nexon EV" className="w-full h-full" />
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                <div>Battrey Charged: <span className="font-semibold">{battery2}%</span></div>
                <div>Time Taken: <span className="font-semibold">{timeLeft2}</span></div>
                <div>Amount Paid: ₹<span className="font-semibold">{amountToPay2}</span></div>
                <div>Date: <span className="font-semibold">{date2}</span></div>
              </div>
            </div>

            {/* 3. Hyundai Ioniq EV */}
            <div className={`relative group overflow-hidden h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
              <img src={Hyundai1} alt="Hyundai Ioniq EV" className="w-full h-full" />
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                <div>Battrey Charged: <span className="font-semibold">{battery3}%</span></div>
                <div>Time Taken: <span className="font-semibold">{timeLeft3}</span></div>
                <div>Amount Paid: ₹<span className="font-semibold">{amountToPay3}</span></div>
                <div>Date: <span className="font-semibold">{date3}</span></div>
              </div>
            </div>

            {/* 4. Mahindra BE EV */}
            <div className={`relative group overflow-hidden h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
              <img src={Mahindra1} alt="Mahindra BE EV" className="w-full h-full" />
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                <div>Battrey Charged: <span className="font-semibold">{battery4}%</span></div>
                <div>Time Taken: <span className="font-semibold">{timeLeft4}</span></div>
                <div>Amount Paid: ₹<span className="font-semibold">{amountToPay4}</span></div>
                <div>Date: <span className="font-semibold">{date4}</span></div>
              </div>
            </div>

            {/* 5. Mahindra XEV EV */}
            <div className={`relative group overflow-hidden h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
              <img src={Mahindra2} alt="Mahindra XEV EV" className="w-full h-full" />
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                <div>Battrey Charged: <span className="font-semibold">{battery5}%</span></div>
                <div>Time Taken: <span className="font-semibold">{timeLeft5}</span></div>
                <div>Amount Paid: ₹<span className="font-semibold">{amountToPay5}</span></div>
                <div>Date: <span className="font-semibold">{date5}</span></div>
              </div>
            </div>

            {/* 6. MG Comet EV */}
            <div className={`relative group overflow-hidden h-400px w-400px border-white dark:border-white transition-all duration-500 hover:scale-125`}>
              <img src={MG1} alt="MG Comet EV" className="w-full h-full" />
              <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-lg font-bold mb-2">Battery Info</h3>
                <div>Battrey Charged: <span className="font-semibold">{battery6}%</span></div>
                <div>Time Taken: <span className="font-semibold">{timeLeft6}</span></div>
                <div>Amount Paid: ₹<span className="font-semibold">{amountToPay6}</span></div>
                <div>Date: <span className="font-semibold">{date6}</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
