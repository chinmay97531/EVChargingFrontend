import React from 'react'
import { useSessionsOverTime, useRevenueOverTime, useEnergyConsumption, usePaymentsByMode, useSoCTrends } from '../services/hooks'
import { LineStats, BarStats, PieStats } from '../components/StatsCharts'

const StatsDashboard: React.FC = () => {
  const { data: sessions } = useSessionsOverTime('daily')
  const { data: revenue } = useRevenueOverTime('daily')
  const { data: energy } = useEnergyConsumption('daily')
  const { data: payments } = usePaymentsByMode()
  const { data: soc } = useSoCTrends('daily')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Statistics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">Sessions Over Time</h2>
          {sessions ? <LineStats series={sessions} data={sessions} /> : <div>Loading...</div>}
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">Revenue Over Time</h2>
          {revenue ? <LineStats series={revenue} data={revenue} /> : <div>Loading...</div>}
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">Energy Consumption</h2>
          {energy ? <BarStats series={energy} /> : <div>Loading...</div>}
        </div>

        {/* <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">State of Charge (SoC) Trends</h2>
          {soc ? <LineStats series={soc} data={soc} /> : <div>Loading...</div>}
        </div> */}

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium mb-2">Payments By Mode</h2>
          {payments ? <PieStats series={payments as any} /> : <div>Loading...</div>}
        </div>
      </div>
    </div>
  )
}

export default StatsDashboard
