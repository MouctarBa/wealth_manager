import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend } from 'recharts';

interface Data {
  name: string;
  income: number;
  expenses: number;
}
interface Props {
  data: Data[];
}

export default function MyBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data}>
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
        <Legend wrapperStyle={{ bottom: 0, left: 0, fontSize: 10 }} />
        <Bar dataKey="income" name="Income" fill="#68D391" />
        <Bar dataKey="expenses" name="Expenses" fill="#C6F6D5" />
      </BarChart>
    </ResponsiveContainer>
  );
}
