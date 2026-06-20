import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

const paddingCls = {
  sm: 'p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10',
}

export default function Card({ children, hoverable = false, padding = 'md', className = '' }: CardProps) {
  return (
    <div
      className={`card-base ${hoverable ? 'card-hover' : ''} ${paddingCls[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
