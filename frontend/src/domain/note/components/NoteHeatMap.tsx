import React, { useEffect, useState } from 'react'
import { noteService } from '../service/noteService.ts'
import { NoteHeatMapItem } from '../types/serviceTypes.ts'
import { shiftDate } from '../../../base/components/heatMap/utils'
import { Tooltip } from 'antd'
import CalendarHeatmap from '../../../base/components/heatMap/CalendarHeatmap.tsx'

const NoteHeatMap: React.FC = () => {
  const today = new Date()
  const [noteHeatMapList, setNoteHeatMapList] = useState<NoteHeatMapItem[]>([])

  useEffect(() => {
    noteService.getHeatMapService().then((res) => {
      setNoteHeatMapList(res.data)
    })
  }, [])

  return (
    <CalendarHeatmap
      startDate={shiftDate(today, -94)}
      endDate={today}
      values={noteHeatMapList}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty'
        }
        return `color-github-${Math.min(4, value.count)}`
      }}
      showWeekdayLabels={false}
      transformDayElement={(element, value) => {
        if (!value) {
          return element
        }
        const date = new Date(value.date)
        const dateString = `${date.getMonth() + 1}/${date.getDate()}`
        const countString = value.count
          ? `${value.count} note submissions`
          : 'No note submitted'
        const rankString = `Rank ${value?.rank}`
        return (
          <Tooltip
            title={`${dateString} ${countString} ${rankString}`}
            placement="top"
          >
            {element}
          </Tooltip>
        )
      }}
    />
  )
}

export default NoteHeatMap
