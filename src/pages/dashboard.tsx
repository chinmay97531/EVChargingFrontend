import NavBar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="bg-white h-screen dark:bg-gray-800">
        <NavBar />
        <div className="flex justify-center items-center translate-y-50 dark:text-white">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-4xl">Powergrid Electric Vehicle Charging Station</h1>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;