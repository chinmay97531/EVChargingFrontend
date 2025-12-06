import React, { useState } from 'react'
import { useCarDetails, useInsertCar, useDeleteCar } from '../services/hooks'
import { Car } from '../models'

const CarManagement: React.FC = () => {
  const { data: cars, isLoading } = useCarDetails()
  const insert = useInsertCar()
  const remove = useDeleteCar()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    userId: 1,
    name: '',
    model: '',
    number: '',
    currentBatteryHealth: 100,
    capacityOfBattery: 75,
    currentBatteryStatus: 50,
    typeOfPort: 'Type-2',
    fastSupporting: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    insert.mutate(formData, {
      onSuccess: () => {
        setFormData({
          userId: 1,
          name: '',
          model: '',
          number: '',
          currentBatteryHealth: 100,
          capacityOfBattery: 75,
          currentBatteryStatus: 50,
          typeOfPort: 'Type-2',
          fastSupporting: false,
        })
        setShowForm(false)
      },
    })
  }

  if (isLoading) return <div className="p-6">Loading cars...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Vehicles</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
          <h2 className="text-lg font-medium mb-4">Add New Vehicle</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Vehicle Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded" />
            <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required className="p-2 border rounded" />
            <input type="text" name="number" placeholder="License Plate" value={formData.number} onChange={handleChange} className="p-2 border rounded" />
            <input type="number" name="capacityOfBattery" placeholder="Battery Capacity (kWh)" value={formData.capacityOfBattery} onChange={handleChange} className="p-2 border rounded" />
            <input type="number" name="currentBatteryStatus" placeholder="Current SoC (%)" value={formData.currentBatteryStatus} onChange={handleChange} className="p-2 border rounded" />
            <select name="typeOfPort" value={formData.typeOfPort} onChange={handleChange} className="p-2 border rounded">
              <option value="Type-1">Type-1</option>
              <option value="Type-2">Type-2</option>
              <option value="CCS">CCS</option>
            </select>
            <label className="flex items-center col-span-full">
              <input type="checkbox" name="fastSupporting" checked={formData.fastSupporting} onChange={handleChange} className="mr-2" />
              <span>Supports DC Fast Charging</span>
            </label>
            <button type="submit" className="col-span-full bg-green-600 text-white p-2 rounded hover:bg-green-700">{insert.isPending ? 'Adding...' : 'Add Vehicle'}</button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {cars && cars.length ? (
          cars.map((car: Car) => (
            <div key={car.id} className="p-4 bg-white border border-gray-200 rounded shadow hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{car.name} — {car.model}</h3>
                  <p className="text-sm text-gray-600">Plate: {car.number || 'N/A'}</p>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>Battery: {car.currentBatteryStatus}% ({car.capacityOfBattery} kWh capacity)</p>
                    <p>Port: {car.typeOfPort || 'Unknown'} {car.fastSupporting && '(DC Fast Capable)'}</p>
                    <p>Health: {car.currentBatteryHealth}%</p>
                  </div>
                </div>
                <button
                  onClick={() => remove.mutate({ carId: car.id })}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  disabled={remove.isPending}
                >
                  {remove.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-600">No vehicles registered yet. Add one to get started!</div>
        )}
      </div>
    </div>
  )
}

export default CarManagement
