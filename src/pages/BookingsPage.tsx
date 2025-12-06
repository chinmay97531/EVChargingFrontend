import React from 'react'
import { useBookings, useCompleteBooking } from '../services/hooks'

const BookingsPage: React.FC = () => {
  const { data: bookings = [], isLoading } = useBookings()
  const complete = useCompleteBooking()

  if (isLoading) return <div className="p-6">Loading bookings...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Bookings</h1>
      <div className="space-y-3">
        {Array.isArray(bookings) && bookings.length ? (
          bookings.map((b: any) => (
            <div key={b.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-medium">Booking #{b.id} — {b.status}</div>
                <div className="text-sm text-gray-600">Station: {b.chargingStationId} • Slot: {b.slotNumber}</div>
              </div>
              <div>
                {b.status !== 'COMPLETED' && (
                  <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={() => complete.mutate({ bookingId: b.id })}>
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No bookings found.</div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
