import React from 'react';

export default function LogoHeaderComponent({ style, imageUrl, companyName = "Your Company", outerStyle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: outerStyle?.justifyContent || 'flex-start', ...outerStyle }}>
      <img src={imageUrl} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
      <h2 style={{ margin: 0 }}>{companyName}</h2>
    </div>
  );
}