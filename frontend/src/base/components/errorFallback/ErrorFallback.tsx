import React from 'react'
import { Button, Result } from 'antd'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Result
      status="error"
      title={error.name}
      subTitle={error.message}
      extra={[
        <Button
          type="primary"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Back Home
        </Button>,
        <Button onClick={resetErrorBoundary}>Try Again</Button>,
      ]}
    >
      <div className="mt-4 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-sm font-medium text-gray-600">Stack trace:</h3>
        <pre className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-600">
          {error.stack}
        </pre>
      </div>
    </Result>
  )
}

export default ErrorFallback
