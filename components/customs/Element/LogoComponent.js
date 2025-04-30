// LogoComponent.jsx
import React from 'react';

export default function LogoComponent({ style, imageUrl, outerStyle }) {
  return (
    <div style={{ display: 'flex', justifyContent: outerStyle?.justifyContent || 'flex-start', ...outerStyle }}>
      <img src={imageUrl} alt='logo' style={style} />
    </div>
  );
}
