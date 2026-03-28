import React from 'react'
import { Divider } from 'antd'
import { NoteRankList } from '../../../../../domain/note'
import { Panel } from '../../../../../base/components'

const RankList: React.FC = () => {
  return (
    <Panel>
      <div className="text-sm font-semibold text-neutral-800">
        Today's Note Ranking
      </div>
      <Divider />
      <NoteRankList />
    </Panel>
  )
}

export default RankList
