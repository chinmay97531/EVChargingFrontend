import Hero from "../components/Hero";
import NavBar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="bg-white h-screen dark:bg-gray-800">
        <NavBar />
        <Hero />
    </div>
  );
}

export default Dashboard;