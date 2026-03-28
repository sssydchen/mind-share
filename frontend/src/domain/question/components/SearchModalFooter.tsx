import React from 'react'

const SearchModalFooter: React.FC = () => {
  const keyStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 6px',
    backgroundColor: '#eaeaea',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#555',
    border: '1px solid #ccc',
  }
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1">
        <kbd style={keyStyle}>↵</kbd>
        <span>Select</span>
      </span>
      <span className="flex items-center gap-1">
        <span>
          <kbd style={keyStyle}>↓</kbd> <kbd style={keyStyle}>↑</kbd>
        </span>
        <span>Navigate</span>
      </span>
      <span className="flex items-center gap-1">
        <kbd style={keyStyle}>esc</kbd>
        <span>Close</span>
      </span>
    </div>
  )
}

export default SearchModalFooter
