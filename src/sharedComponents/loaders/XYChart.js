import React from 'react';
import ContentLoader from 'react-content-loader';

const XYChart = ({ height }) => {
  return (
    <ContentLoader
      style={{
        height: '520px',
        width: '100%',
      }}
      speed={2}
      height={360 / 2}
      primaryColor="#d9d9d9"
      secondaryColor="#ecebeb"
    >
      <rect x="20" y="5" rx="0" ry="0" width="1" height="170" />
      <rect x="20" y="175" rx="0" ry="0" width="370" height="1" />

      <rect x="30" y="105" rx="0" ry="0" width="35" height="70" />
      <rect x="70" y="35" rx="0" ry="0" width="35" height="140" />
      <rect x="110" y="55" rx="0" ry="0" width="35" height="120" />
      <rect x="150" y="15" rx="0" ry="0" width="35" height="160" />
      <rect x="190" y="135" rx="0" ry="0" width="35" height="40" />
      <rect x="230" y="85" rx="0" ry="0" width="35" height="90" />
      <rect x="270" y="75" rx="0" ry="0" width="35" height="100" />
      <rect x="310" y="85" rx="0" ry="0" width="35" height="90" />
      <rect x="350" y="25" rx="0" ry="0" width="35" height="150" />
    </ContentLoader>
  );
};

export default XYChart;
