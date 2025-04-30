import React from 'react'

export default function ImageComponent({style,imageUrl,outStyle}) {
  return (
    <div style={outStyle}>
        <img src={imageUrl} alt='image' style={style} />
    </div>
  )
}

