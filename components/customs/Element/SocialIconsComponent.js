import React from 'react';

export default function SocialIconsComponent({ socialIcons = [], outerStyle = {}, style = {} }) {
  return (
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', ...outerStyle }}>
      {socialIcons.map((icon, index) => (
        <a href={icon.url || '#'} target="_blank" rel="noopener noreferrer" key={index}>
          <img src={icon.icon} alt="social" style={{ width: style.width || 40, height: style.height || 40 }} />
        </a>
      ))}
    </div>
  );
}
