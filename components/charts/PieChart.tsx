import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Entry {
  name: string;
  value: number;
}
interface Props {
  data: Entry[];
}

const COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#9013FE', '#D0021B'];

export default function MyPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={60} fill="#8884d8">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" height={20} />
      </PieChart>
    </ResponsiveContainer>
  );
}
