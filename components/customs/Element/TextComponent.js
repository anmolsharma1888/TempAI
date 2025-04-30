import React from 'react'

export default function TextComponent({ style, textarea }) {
  return (
    <div className='w-full'>
      <h2 style={style}>{textarea || "Your Text Here"}</h2>
    </div>
  );
}



