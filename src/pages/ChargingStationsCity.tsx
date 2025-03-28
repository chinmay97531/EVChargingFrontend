import NavBar from "../components/Navbar";
import { useState } from "react";

function ChargingStationsState() {

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    function handleCityClick(city) {
        console.log(city);
    }

  return (
    <div className="bg-gradient-to-b from-white to-gray-800 h-screen dark:from-gray-800 dark:to-white">
        <NavBar />
        <div className="flex justify-center items-center translate-y-50 dark:text-white">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-4xl">Charging Stations avaliable are:</h1>
                {loading && <div className="text-center text-gray-800 dark:text-white p-5">Loading City...</div>}
                {error && <div className="text-center text-red-600">{error}</div>}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-5 p-10">
                    {cities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-8">
                        {cities.map((city, index) => (
                            <div
                                key={index}
                                className="h-400px w-400px border-gray-400 dark:border-gray-500 border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center"
                                onClick={() => handleCityClick(city)}
                            >
                                <p className="text-xl font-semibold text-gray-800">{city}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <div className="text-center text-gray-700 mt-6">No City available.</div>
                )}
                </div>
            </div>
        </div>
    </div>
  );
}

export default ChargingStationsState;