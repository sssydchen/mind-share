import React from 'react'
import { Button, Result } from 'antd'
/**
 * 404 Not Found 组件
 */
const NotFound: React.FC = () => {
  function goBack() {
    window.history.back()
  }
  return (
    <Result
      status="404"
      title="404 Not Found"
      subTitle="Page not found"
      extra={
        <Button type="primary" onClick={goBack}>
          Go Back
        </Button>
      }
    />
  )
}

export default NotFound
