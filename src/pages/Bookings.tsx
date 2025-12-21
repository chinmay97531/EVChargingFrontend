import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Search, Zap } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Dropdown } from "../components/ui/Dropdown";
import { Modal } from "../components/ui/Modal";
import { StationCard } from "../components/StationCard";
import { BatteryDisplay } from "../components/BatteryDisplay";
import { useBookings, useCreateBooking } from "../hooks/useBookings";
import { useCars } from "../hooks/useCars";
import { useBatteryStatus } from "../hooks/useBatteryStatus";
import { stationService, Station } from "../services/station.service";
import { Booking } from "../services/booking.service";
import { Car } from "../services/car.service";
import { BatteryStatus } from "../services/battery.service";

type SearchType = "location" | "name" | "pincode" | "city";

export default function Bookings() {
  const [searchType, setSearchType] = useState<SearchType>("location");
  const [searchQuery, setSearchQuery] = useState("");
  const [stations, setStations] = useState<Station[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [chargerType, setChargerType] = useState("FAST");

  const { data: bookingsData, isLoading: bookingsLoading } = useBookings();
  const { data: carsData } = useCars();
  const { data: batteryData } = useBatteryStatus(
    selectedCarId ? parseInt(selectedCarId) : undefined
  );
  const createBookingMutation = useCreateBooking();
  const queryClient = useQueryClient();

  const bookings: Booking[] = (bookingsData as any)?.data?.sessions || (bookingsData as any)?.sessions || (Array.isArray(bookingsData) ? bookingsData : []);
  const cars: Car[] = (carsData as any)?.data?.cars || (carsData as any)?.data || (Array.isArray(carsData) ? carsData : []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      let response;
      switch (searchType) {
        case "location":
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                try {
                  const res = await stationService.searchByLocation(
                    position.coords.latitude,
                    position.coords.longitude
                  );
                  setStations(res.data?.stations || []);
                } catch (error) {
                  console.error("Error searching by location:", error);
                } finally {
                  setIsSearching(false);
                }
              },
              (error) => {
                console.error("Geolocation error:", error);
                setIsSearching(false);
              }
            );
          }
          return;
        case "name":
          response = await stationService.searchByName(searchQuery);
          break;
        case "pincode":
          response = await stationService.searchByPostcode(searchQuery);
          break;
        case "city":
          response = await stationService.searchByCity(searchQuery);
          break;
      }
      if (response) {
        setStations(response.data?.stations || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookStation = (station: Station) => {
    setSelectedStation(station);
    setShowBookingModal(true);
  };

  const handleCreateBooking = async () => {
    if (!selectedStation || !selectedCarId || !bookingDate || !bookingTime) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createBookingMutation.mutateAsync({
        lat: selectedStation.geolocation.latitude,
        long: selectedStation.geolocation.longitude,
      });
      setShowBookingModal(false);
      setSelectedStation(null);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Bookings</h1>

        {/* Search Section */}
        <Card title="Search Charging Stations" icon={<Search size={20} />} className="mb-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <Dropdown
                label="Search Type"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as SearchType)}
                options={[
                  { value: "location", label: "Current Location (GPS)" },
                  { value: "name", label: "Station Name" },
                  { value: "pincode", label: "Pincode" },
                  { value: "city", label: "City" },
                ]}
              />
              <div className="md:col-span-2">
                <Input
                  label={searchType === "location" ? "Click search to use GPS" : "Search Query"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchType === "name"
                      ? "Enter station name"
                      : searchType === "pincode"
                      ? "Enter pincode"
                      : searchType === "city"
                      ? "Enter city name"
                      : ""
                  }
                  disabled={searchType === "location"}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  isLoading={isSearching}
                  className="w-full"
                >
                  Search
                </Button>
              </div>
            </div>
              </div>
        </Card>

        {/* Search Results */}
        {stations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Found {stations.length} Station(s)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stations.map((station, index) => (
                <StationCard
                  key={index}
                  station={station}
                  onSelect={() => handleBookStation(station)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Current SOC/SOH Display */}
        {selectedCarId && batteryData?.data && (
          <div className="mb-6">
            <BatteryDisplay batteryStatus={batteryData.data} />
          </div>
        )}

        {/* Booking Information */}
        <Card title="Your Bookings" icon={<Calendar size={20} />} className="mb-6">
          {bookingsLoading ? (
            <p className="text-gray-500">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found. Search and book a charging station to get started.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking: Booking) => (
                <div
                  key={booking.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {booking.chargingStation?.name || "Charging Station"}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(booking.startTime).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>
                            {new Date(booking.startTime).toLocaleTimeString()} -{" "}
                            {new Date(booking.endTime).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap size={16} />
                          <span>{booking.typeOfCharging} Charging</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>Slot #{booking.slotNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "CONFIRMED"
                            ? "bg-blue-100 text-blue-800"
                            : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
              </div>
              ))}
            </div>
          )}
        </Card>

        {/* Booking Modal */}
        <Modal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedStation(null);
          }}
          title="Schedule Booking"
          size="lg"
        >
          {selectedStation && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{selectedStation.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedStation.address.line1}, {selectedStation.address.town}
                </p>
              </div>

              <Dropdown
                label="Select Car"
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
                options={[
                  { value: "", label: "Select a car" },
                  ...cars.map((car: Car) => ({
                    value: car.id.toString(),
                    label: `${car.name} ${car.model} (${car.number})`,
                  })),
                ]}
              />

              {selectedCarId && batteryData?.data && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Current Battery Status</p>
                  <p className="text-lg font-semibold">
                    SOC: {(batteryData.data as BatteryStatus).soc?.toFixed(1) || 'N/A'}% | SOH:{" "}
                    {(batteryData.data as BatteryStatus).soh?.toFixed(1) || 'N/A'}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last Updated: {batteryData.data.timestamp ? new Date((batteryData.data as BatteryStatus).timestamp).toLocaleString() : 'N/A'}
                  </p>
            </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
                <Input
                  label="Time"
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>

              <Dropdown
                label="Charger Type"
                value={chargerType}
                onChange={(e) => setChargerType(e.target.value)}
                options={[
                  { value: "FAST", label: "Fast Charging" },
                  { value: "SLOW", label: "Slow Charging" },
                  { value: "DYNAMIC", label: "Dynamic" },
                ]}
              />

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedStation(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateBooking}
                  isLoading={createBookingMutation.isPending}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
