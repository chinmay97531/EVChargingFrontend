import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'

type Point = { label: string; value: number }

export const LineStats: React.FC<{ data: Point; series: Point[] } & any> = ({ series }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={series} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const BarStats: React.FC<{ series: Point[] }> = ({ series }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={series} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#06b6d4" />
    </BarChart>
  </ResponsiveContainer>
)

const COLORS = ['#4f46e5', '#06b6d4', '#f97316', '#ef4444', '#10b981']

export const PieStats: React.FC<{ series: Point[] }> = ({ series }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Legend />
      <Tooltip />
      <Pie data={series} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100}>
        {series.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

export default LineStats
