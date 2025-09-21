import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const STATES = [
  "Andaman & Nicobar","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh",
  "Chhattisgarh","D&D and DNH","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh",
  "Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Nagaland","Odisha","Pondicherry","Punjab",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
];

function ChargingStationsState() {
  const navigate = useNavigate();
  const cardClass = `h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`;

  return (
    <div className="bg-gradient-to-b from-white to-gray-800 h-screen dark:from-gray-800 dark:to-white">
      <NavBar />
      <div className="flex justify-center items-center translate-y-50 dark:text-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl">Charging Stations avaliable in States</h1>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 p-10">
            {STATES.map((name) => (
              <div
                key={name}
                className={cardClass}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/state/${encodeURIComponent(name)}/cities`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/state/${encodeURIComponent(name)}/cities`);
                  }
                }}
              >
                {name}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChargingStationsState;
