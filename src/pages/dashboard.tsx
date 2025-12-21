import { Link } from "react-router-dom";
import { ChargingSchedulePredictor } from "../components/ChargingSchedulePredictor";
import { Zap, MapPin, Calendar, BarChart3, Sparkles, TrendingUp, Car, Battery } from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-[90vh] flex items-center">
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-400 rounded-full opacity-20 blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center animate-slide-up">
            {/* Animated Logo */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 rounded-full mb-8 shadow-2xl animate-pulse-glow">
              <Zap className="w-16 h-16 text-white" fill="currentColor" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Powergrid Electric Vehicle
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-300 animate-gradient-shift">
                Charging Station
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Experience the future of EV charging with our intelligent, sustainable, and user-friendly platform.
              Find stations, book slots, and power your journey with AI-powered optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/bookings"
                className="group relative px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                  Find Stations
                </span>
              </Link>
              
              <Link
                to="/bookings"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  View Bookings
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover-lift border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Search</h3>
              <p className="text-gray-700 leading-relaxed">
                Find charging stations by location, pincode, or city with real-time availability and AI-powered recommendations.
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover-lift border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Booking</h3>
              <p className="text-gray-700 leading-relaxed">
                Book charging slots in advance with intelligent scheduling powered by machine learning for optimal charging times.
              </p>
            </div>
          </div>

          <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover-lift border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-700 leading-relaxed">
                Track your charging history, costs, energy consumption, and environmental impact with detailed insights.
              </p>
            </div>
          </div>
        </div>

        {/* AI Model Integration */}
        <div className="mb-16">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">AI-Powered</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Charging Schedule Predictor</h2>
            <p className="text-xl text-gray-600">
              Our machine learning model optimizes your charging schedule based on demand, solar availability, and time of day
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-slide-up">
            <ChargingSchedulePredictor />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">10K+</div>
              <div className="text-indigo-200 text-lg">Active Users</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">500+</div>
              <div className="text-indigo-200 text-lg">Charging Stations</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">50K+</div>
              <div className="text-indigo-200 text-lg">Successful Charges</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">95%</div>
              <div className="text-indigo-200 text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <TrendingUp className="w-16 h-16 text-indigo-600 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-xl text-gray-600">
              Get started with these quick actions to manage your EV charging experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/vehicles"
              className="group bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Manage Vehicles</h3>
              <p className="text-sm text-gray-600">Add and manage your electric vehicles</p>
            </Link>

            <Link
              to="/bookings"
              className="group bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Book Charging</h3>
              <p className="text-sm text-gray-600">Find and book charging stations</p>
            </Link>

            <Link
              to="/stats"
              className="group bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">View Analytics</h3>
              <p className="text-sm text-gray-600">Track your charging statistics</p>
            </Link>

            <Link
              to="/profile"
              className="group bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Battery Status</h3>
              <p className="text-sm text-gray-600">Monitor your vehicle's battery</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;