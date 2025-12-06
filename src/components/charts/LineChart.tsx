import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  xAxisKey: string;
  label: string;
  color?: string;
}

export const LineChart = ({
  data,
  dataKey,
  xAxisKey,
  label,
  color = "#3b82f6",
}: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          name={label}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

