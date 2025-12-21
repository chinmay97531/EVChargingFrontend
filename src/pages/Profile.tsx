import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Car as CarIcon, Battery, DollarSign, TrendingUp, Zap, Calendar, Trash2, Key } from "lucide-react";
import { Card } from "../components/ui/Card";
import { BatteryDisplay } from "../components/BatteryDisplay";
import { Table, TableRow, TableCell } from "../components/ui/Table";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { ChargingSchedulePredictor } from "../components/ChargingSchedulePredictor";
import { useCars, useDeleteCar } from "../hooks/useCars";
import { useBatteryStatus } from "../hooks/useBatteryStatus";
import { usePaymentData } from "../hooks/usePaymentData";
import { useStatistics } from "../hooks/useStatistics";
import { userService } from "../services/user.service";
import { Car } from "../services/car.service";
import { BatteryStatus } from "../services/battery.service";
import { LineChart } from "../components/charts/LineChart";
import { BarChart } from "../components/charts/BarChart";
import { MultiLineChart } from "../components/charts/MultiLineChart";
import NavBar from "../components/Navbar";

export default function Profile() {
  const [selectedCarId, setSelectedCarId] = useState<number | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState<number | null>(null);

  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => userService.getUserDetails(),
  });

  const { data: carsData, isLoading: carsLoading } = useCars();
  const { data: batteryData, isLoading: batteryLoading } = useBatteryStatus(selectedCarId);
  const { data: paymentData, isLoading: paymentLoading } = usePaymentData();
  const { data: statisticsData, isLoading: statsLoading } = useStatistics(selectedCarId);

  const deleteCarMutation = useDeleteCar();

  const cars: Car[] = (carsData as any)?.data?.cars || (carsData as any)?.data || (Array.isArray(carsData) ? carsData : []);
  const user = (userData as any)?.data?.data || userData;
  const batteryStatus: BatteryStatus | undefined = (batteryData as any)?.data?.data || batteryData?.data;
  const paymentInfo = (paymentData as any)?.data?.data || paymentData?.data;
  const statistics = (statisticsData as any)?.data?.data || statisticsData?.data;

  // Set first car as selected by default
  if (cars.length > 0 && !selectedCarId) {
    setSelectedCarId(cars[0].id);
  }

  const handleDeleteCar = (carId: number) => {
    setCarToDelete(carId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (carToDelete) {
      deleteCarMutation.mutate(carToDelete, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setCarToDelete(null);
          if (selectedCarId === carToDelete) {
            setSelectedCarId(undefined);
          }
        },
      });
    }
  };

  // Transform chart data
  const socTrendData = statistics?.graphical?.socTrends
    ? statistics.graphical.socTrends.labels.map((label: string, index: number) => ({
        date: label,
        soc: statistics.graphical.socTrends.datasets[0].data[index],
      }))
    : [];

  const revenueTrendData = statistics?.graphical?.revenueTrends
    ? statistics.graphical.revenueTrends.labels.map((label: string, index: number) => ({
        date: label,
        revenue: statistics.graphical.revenueTrends.datasets[0].data[index],
      }))
    : [];

  const bookingTrendData = statistics?.graphical?.chargingSessionsOverTime
    ? statistics.graphical.chargingSessionsOverTime.labels.map((label: string, index: number) => ({
        date: label,
        sessions: statistics.graphical.chargingSessionsOverTime.datasets[0].data[index],
      }))
    : [];

  const energyConsumptionData = statistics?.graphical?.energyConsumption
    ? statistics.graphical.energyConsumption.labels.map((label: string, index: number) => ({
        date: label,
        grid: statistics.graphical.energyConsumption.datasets[0].data[index],
        solar: statistics.graphical.energyConsumption.datasets[1].data[index],
        total: statistics.graphical.energyConsumption.datasets[2].data[index],
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Dashboard</h1>

        {/* User Information */}
        <Card title="User Information" icon={<User size={20} />} className="mb-6">
          {user ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-lg font-semibold text-gray-800">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading user information...</p>
          )}
        </Card>

        {/* Find Cars Section with API Key */}
        <Card title="Find Cars" icon={<CarIcon size={20} />} className="mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">API Key</p>
              <div className="flex items-center gap-2">
                <Key size={16} className="text-gray-500" />
                <code className="px-3 py-2 bg-gray-100 rounded text-sm font-mono">
                  {import.meta.env.VITE_API_KEY || "DEMO_API_KEY_12345"}
                </code>
              </div>
            </div>
            {carsLoading ? (
              <p className="text-gray-500">Loading cars...</p>
            ) : cars.length === 0 ? (
              <p className="text-gray-500">No cars found. Add a car to get started.</p>
            ) : (
              <div className="space-y-3">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCarId === car.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedCarId(car.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {car.name} {car.model}
                        </h3>
                        <p className="text-sm text-gray-600">License: {car.number}</p>
                        <p className="text-sm text-gray-600">
                          Port: {car.typeOfPort} • {car.fastSupporting ? "Fast" : "Slow"} Charging
                        </p>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCar(car.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Car Details */}
        {selectedCarId && cars.find((c) => c.id === selectedCarId) && (
          <Card title="Car Details" icon={<CarIcon size={20} />} className="mb-6">
            {(() => {
              const car = cars.find((c) => c.id === selectedCarId);
              return car ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Car Name</p>
                    <p className="text-lg font-semibold text-gray-800">{car.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Model</p>
                    <p className="text-lg font-semibold text-gray-800">{car.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">License Number</p>
                    <p className="text-lg font-semibold text-gray-800">{car.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Battery Capacity</p>
                    <p className="text-lg font-semibold text-gray-800">{car.capacityOfBattery} kWh</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Port Type</p>
                    <p className="text-lg font-semibold text-gray-800">{car.typeOfPort}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Charging Support</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {car.fastSupporting ? "Fast Charging" : "Slow Charging"}
                    </p>
                  </div>
                </div>
              ) : null;
            })()}
          </Card>
        )}

        {/* Battery Details */}
        {batteryLoading ? (
          <Card className="mb-6">
            <p className="text-gray-500">Loading battery status...</p>
          </Card>
        ) : batteryStatus ? (
          <BatteryDisplay batteryStatus={batteryStatus} />
        ) : (
          <Card className="mb-6">
            <p className="text-gray-500">No battery data available. Please select a car.</p>
          </Card>
        )}

        {/* Charging Schedule Predictor */}
        <ChargingSchedulePredictor />

        {/* Payment Data */}
        <Card title="Payment Information" icon={<DollarSign size={20} />} className="mb-6">
          {paymentLoading ? (
            <p className="text-gray-500">Loading payment data...</p>
          ) : paymentInfo ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-blue-600">₹{paymentInfo.totalPaid.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Savings</p>
                  <p className="text-2xl font-bold text-green-600">₹{paymentInfo.totalSavings.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Payments</p>
                  <p className="text-2xl font-bold text-gray-800">{paymentInfo.totalPayments}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h3>
                <Table
                  headers={["Date", "Amount", "Original", "Savings", "Mode", "Status"]}
                >
                  {paymentInfo.paymentRecords.map((record: any) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        {new Date(record.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-semibold">₹{record.amount.toFixed(2)}</TableCell>
                      <TableCell>₹{record.originalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-green-600">₹{record.savings.toFixed(2)}</TableCell>
                      <TableCell>{record.paymentMode}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            record.status === "SUCCESS"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No payment data available.</p>
          )}
        </Card>

        {/* Numerical Statistics */}
        {statistics && (
          <Card title="Statistics Overview" icon={<TrendingUp size={20} />} className="mb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-blue-600">
                  {statistics.numerical.totalChargingSessions}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {statistics.numerical.completedSessions}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-purple-600">
                  {statistics.numerical.averageSessionDuration.toFixed(1)} min
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Energy Consumed</p>
                <p className="text-2xl font-bold text-orange-600">
                  {statistics.numerical.totalEnergyConsumed.toFixed(1)} kWh
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Graphical Statistics */}
        {statsLoading ? (
          <Card className="mb-6">
            <p className="text-gray-500">Loading statistics...</p>
          </Card>
        ) : statistics ? (
          <div className="space-y-6 mb-6">
            {/* SOC Trend */}
            {socTrendData.length > 0 && (
              <Card title="SOC Trend" icon={<Battery size={20} />}>
                <LineChart
                  data={socTrendData}
                  dataKey="soc"
                  xAxisKey="date"
                  label="State of Charge (%)"
                  color="#3b82f6"
                />
              </Card>
            )}

            {/* Revenue Trend */}
            {revenueTrendData.length > 0 && (
              <Card title="Revenue Trend" icon={<DollarSign size={20} />}>
                <BarChart
                  data={revenueTrendData}
                  dataKey="revenue"
                  xAxisKey="date"
                  label="Revenue (₹)"
                  color="#10b981"
                />
              </Card>
            )}

            {/* Booking Trend */}
            {bookingTrendData.length > 0 && (
              <Card title="Booking Trend" icon={<Calendar size={20} />}>
                <BarChart
                  data={bookingTrendData}
                  dataKey="sessions"
                  xAxisKey="date"
                  label="Charging Sessions"
                  color="#f59e0b"
                />
              </Card>
            )}

            {/* Energy Consumption Trend */}
            {energyConsumptionData.length > 0 && (
              <Card title="Energy Consumption Trend" icon={<Zap size={20} />}>
                <MultiLineChart
                  labels={statistics.graphical.energyConsumption.labels}
                  datasets={statistics.graphical.energyConsumption.datasets.map((ds: any, idx: number) => ({
                    label: ds.label,
                    data: ds.data,
                    color: idx === 0 ? "#ef4444" : idx === 1 ? "#10b981" : "#3b82f6",
                  }))}
                />
              </Card>
            )}
          </div>
        ) : (
          <Card className="mb-6">
            <p className="text-gray-500">No statistics available. Please select a car.</p>
          </Card>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setCarToDelete(null);
          }}
          title="Delete Car"
        >
          <p className="mb-4">Are you sure you want to delete this car? This action cannot be undone.</p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setCarToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={deleteCarMutation.isPending}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
