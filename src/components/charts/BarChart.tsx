import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  xAxisKey: string;
  label: string;
  color?: string;
}

export const BarChart = ({
  data,
  dataKey,
  xAxisKey,
  label,
  color = "#3b82f6",
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill={color} name={label} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

