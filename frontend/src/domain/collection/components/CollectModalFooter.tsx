import React from 'react'
import { Button } from 'antd'

interface CollectModalFooterProps {
  onCreate: () => void
  onConfirm: () => void
}

const CollectModalFooter: React.FC<CollectModalFooterProps> = ({
  onCreate,
  onConfirm,
}) => {
  return (
    <div className={'mt-2 flex items-center justify-between'}>
      <div
        className={'cursor-pointer text-sm text-blue-400 hover:text-blue-500'}
        onClick={onCreate}
      >
        +&nbsp;Create Collection
      </div>
      <Button type={'primary'} onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  )
}

export default CollectModalFooter
