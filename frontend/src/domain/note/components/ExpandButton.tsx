import React from 'react'
import { Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface ExpandButtonProps {
  isCollapsed: boolean
  toggleCollapsed: () => void
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  toggleCollapsed,
  isCollapsed,
}) => {
  return (
    <div>
      <Button
        type="text"
        onClick={toggleCollapsed}
        className="text-sm"
        iconPosition="end"
        icon={
          isCollapsed ? (
            <DownOutlined className={'text-gray-500'} />
          ) : (
            <UpOutlined className={'text-gray-500'} />
          )
        }
      >
        {isCollapsed ? (
          <span className={'text-gray-500'}>Read More</span>
        ) : (
          <span className={'text-gray-500'}>Show Less</span>
        )}
      </Button>
    </div>
  )
}

export default ExpandButton
