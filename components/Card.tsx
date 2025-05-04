import { ReactNode } from 'react'

interface Props { children: ReactNode; className?: string }
export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>{children}</div>
  )
}