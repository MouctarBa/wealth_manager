import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface Point {
  value: number;
}
interface Props {
  data: Point[];
  positive?: boolean;
}

export default function Sparkline({ data }: Props) {
  return (
    <ResponsiveContainer width={50} height={20}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={data[data.length - 1].value >= data[0].value ? '#48BB78' : '#F56565'}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
