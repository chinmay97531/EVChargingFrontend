import React from 'react'
import { useProfile, useCarDetails } from '../services/hooks'

const ProfilePage: React.FC = () => {
  const { data: user, isLoading: userLoading } = useProfile()
  const { data: cars, isLoading: carsLoading } = useCarDetails()

  if (userLoading) return <div className="p-6">Loading profile...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 border border-gray-200 rounded shadow">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Username</label>
                <p className="text-lg">{user.username || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Role</label>
                <p className="text-lg capitalize">{user.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <p className={`text-lg ${user.status ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 border border-indigo-200 rounded">
            <h3 className="font-medium text-indigo-900 mb-2">Account Status</h3>
            <div className="text-sm text-indigo-800">
              <p>Your account is verified and active.</p>
              <p className="mt-2">Use the navigation menu to manage your vehicles, bookings, and payments.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 border border-gray-200 rounded shadow">
        <h2 className="text-lg font-medium mb-4">Registered Vehicles</h2>
        {carsLoading ? (
          <div>Loading vehicles...</div>
        ) : cars && cars.length ? (
          <div className="space-y-3">
            {cars.map((car) => (
              <div key={car.id} className="p-3 border border-gray-100 rounded">
                <div className="font-medium">{car.name} — {car.model}</div>
                <div className="text-sm text-gray-600 mt-1">
                  <p>Battery SoC: {car.currentBatteryStatus}% | Capacity: {car.capacityOfBattery} kWh</p>
                  <p>Port: {car.typeOfPort || 'Unknown'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No vehicles registered. Add one from the Vehicles page.</p>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
