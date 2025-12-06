import React, { useState } from 'react'
import { useGetChargingSessions, useCreatePayment } from '../services/hooks'

const PaymentPage: React.FC = () => {
  const { data: bookings, isLoading } = useGetChargingSessions()
  const createPayment = useCreatePayment()
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    bookingId: 0,
    amount: 100,
    paymentMode: 'CARD',
  })

  const handleSelectBooking = (bookingId: number) => {
    setSelectedBooking(bookingId)
    setFormData((prev) => ({ ...prev, bookingId }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBooking) {
      alert('Please select a booking')
      return
    }
    createPayment.mutate(
      { bookingId: selectedBooking, amount: formData.amount, paymentMode: formData.paymentMode },
      {
        onSuccess: () => {
          setSelectedBooking(null)
          setFormData({ bookingId: 0, amount: 100, paymentMode: 'CARD' })
          alert('Payment processed successfully!')
        },
        onError: (error: any) => {
          alert(`Payment failed: ${error.response?.data?.message || error.message}`)
        },
      }
    )
  }

  if (isLoading) return <div className="p-6">Loading bookings...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Process Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-4">Select Booking</h2>
          <div className="space-y-3">
            {bookings && bookings.length ? (
              bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleSelectBooking(b.id)}
                  className={`p-4 cursor-pointer border-2 rounded transition ${
                    selectedBooking === b.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Booking #{b.id}</div>
                  <div className="text-sm text-gray-600">
                    Station: {b.chargingStationId} • Slot: {b.slotNumber} • Status: {b.status}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {new Date(b.startTime).toLocaleString()} to {new Date(b.endTime).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-600">No bookings available for payment.</div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 border border-gray-200 rounded">
          <h2 className="text-lg font-medium mb-4">Payment Details</h2>
          {selectedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Booking ID</label>
                <input type="number" value={selectedBooking} disabled className="w-full p-2 border rounded bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="CARD">Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="NET_BANKING">Net Banking</option>
                  <option value="WALLET">Wallet</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={createPayment.isPending}
                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {createPayment.isPending ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          ) : (
            <div className="text-center text-gray-600">Select a booking to continue</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
