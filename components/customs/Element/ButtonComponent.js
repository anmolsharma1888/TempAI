import React from 'react'

export default function ButtonComponent({ style, content, url, outerStyle }) {
  return (
    <div style={outerStyle}>
      <a href={url} style={{ display: 'inline-block', width: '100%' }}>
        <button style={{ ...style, width: '100%' }}>{content}</button>
      </a>
    </div>
  )
}
