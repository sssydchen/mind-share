import React, { useEffect, useState } from 'react'

interface TimeAgoProps {
  datetime?: string // 传入的日期时间字符串
}

const TimeAgo: React.FC<TimeAgoProps> = ({ datetime }) => {
  const [timeAgo, setTimeAgo] = useState<string>('')
  // 格式化时间差
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (seconds < 60) return 'just now'
    if (minutes < 60) return `${minutes} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    if (days < 30) return `${days} days ago`
    if (months < 12) return `${months} months ago`
    return `${years} years ago`
  }

  useEffect(() => {
    const date = new Date(datetime || '')
    if (isNaN(date.getTime())) {
      setTimeAgo('Invalid date')
      return
    }
    // 更新初始显示
    setTimeAgo(formatTimeAgo(date))

    // 每分钟更新
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(date))
    }, 60000)

    return () => clearInterval(interval)
  }, [datetime])

  return <span>{timeAgo}</span>
}

export default TimeAgo
