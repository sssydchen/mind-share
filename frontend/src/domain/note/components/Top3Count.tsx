import React from 'react'
import { useTop3Count } from '../index.ts'

const Top3Count: React.FC = () => {
  const { top3Count } = useTop3Count()

  return (
    <div className="mb-4 flex items-center justify-between text-sm font-medium text-neutral-500">
      <div className="flex flex-col items-center">
        <div className="mb-1 text-xs text-neutral-400">
          Top 3 finishes last month
        </div>
        <div className="text-base font-bold text-neutral-700">
          {top3Count?.lastMonthTop3Count ?? 0}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-1 text-xs text-neutral-400">
          Top 3 finishes this month
        </div>
        <div className="text-base font-bold text-neutral-700">
          {top3Count?.thisMonthTop3Count ?? 0}
        </div>
      </div>
    </div>
  )
}

export default Top3Count
