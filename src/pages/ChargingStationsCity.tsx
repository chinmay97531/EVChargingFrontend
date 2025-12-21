import NavBar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

const CITIES_BY_STATE = {
  "Andaman & Nicobar": ["Port Blair", "Garacharma", "Bombooflat", "Prothrapur"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Ziro"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],
  "D&D and DNH": ["Daman", "Silvassa", "Diu"],
  Delhi: ["New Delhi", "Dwarka", "Saket", "Rohini"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Karnal"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Kullu", "Dharamshala"],
  "Jammu & Kashmir": ["Jammu", "Srinagar", "Udhampur", "Anantnag"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  Lakshadweep: ["Kavaratti", "Agatti"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Manipur: ["Imphal", "Thoubal", "Kakching"],
  Meghalaya: ["Shillong", "Tura", "Jowai"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  Pondicherry: ["Puducherry", "Karaikal", "Mahe"],
  Punjab: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Pathankot", "Hoshiarpur", "Batala",
  "Abohar", "Moga", "Khanna", "Malerkotla", "Barnala", "Firozpur", "Phagwara", "Sri Muktsar Sahib", "Rupnagar",
  "Mohali (SAS Nagar)", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Kapurthala", "Mansa", "Sangrur"],
  Sikkim: ["Gangtok", "Namchi", "Gyalshing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Ghaziabad", "Kanpur", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Haldwani", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
};

function CitiesPage() {
  const navigate = useNavigate();
  const { state } = useParams();
  const stateName = decodeURIComponent(state || "");
  const cities = (CITIES_BY_STATE as Record<string, string[]>)[stateName] || ["City 1", "City 2", "City 3", "City 4"];

  const cardClass = `h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`;

  return (
    <div className="bg-gradient-to-b from-white to-gray-800 min-h-screen dark:from-gray-800 dark:to-white">
      <NavBar />
      <div className="flex justify-center items-center translate-y-50 dark:text-white">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-4xl">{stateName}</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 p-10">
            {cities.map((city: string) => (
              <div
                key={city}
                className={cardClass}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/stations/${encodeURIComponent(stateName)}/${encodeURIComponent(city)}`)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/stations/${encodeURIComponent(stateName)}/${encodeURIComponent(city)}`);
                  }
                }}
              >
                {city}
              </div>
            ))}
          </div>

          {/* Optional: placeholder CTA for next page */}
          {/* <p className="opacity-80 text-sm">
            (Click a city to route to a stations listing, e.g. <code>/stations/{stateName}/&lt;city&gt;</code> )
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default CitiesPage;
