import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export default function ThemeProvider({ children }: Props) {
  return <div className="font-sans text-gray-900 antialiased">{children}</div>;
}
