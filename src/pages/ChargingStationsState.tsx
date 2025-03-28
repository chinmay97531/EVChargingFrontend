import NavBar from "../components/Navbar";

function ChargingStationsState() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-800 h-screen dark:from-gray-800 dark:to-white">
        <NavBar />
        <div className="flex justify-center items-center translate-y-50 dark:text-white">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl md:text-4xl">Charging Stations avaliable in States</h1>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-5 p-10">
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Andaman & Nicobar</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Andhra Pradesh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Arunachal Pradesh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Assam</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Bihar</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Chandigarh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Chhattisgarh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>D&D and DNH</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Delhi</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Goa</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Gujarat</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Haryana</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Himachal Pradesh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Jammu & Kashmir</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Jharkhand</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Karnataka</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Kerala</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Lakshadweep</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Madhya Pradesh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Maharashtra</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Manipur</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Meghalaya</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Nagaland</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Odisha</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Pondicherry</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Punjab</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Sikkim</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Tamil Nadu</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Telangana</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Tripura</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Uttar Pradesh</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>Uttarakhand</div>
                    <div className={`h-400px w-400px border-gray-400 dark:border-gray-500 cursor-pointer border-2 px-6 py-2 rounded-4xl shadow-2xl transition-all duration-500 hover:scale-110 flex justify-center items-center`}>West Bengal</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ChargingStationsState;