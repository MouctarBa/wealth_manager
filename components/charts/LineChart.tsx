import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  data: { name: string; value: number }[];
}

export default function MyLineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
