import React from 'react';
import ContentLoader from 'react-content-loader';

const PaginationLoader = () => (
  <div style={{ height: '56px' }}>
    <ContentLoader
      rtl
      style={{
        height: '56px',
        float: 'right',
      }}
      width={80}
      height={2}
      speed={2}
      primaryColor='#d9d9d9'
      secondaryColor='#ecebeb'
    >
      <rect
        x='4.5'
        y='0.8'
        rx='0.2'
        ry='0.2'
        width='8.7'
        height='0.5'
      />
      <circle cx='0.9' cy='1' r='0.85' />
      <circle cx='2.7' cy='1' r='0.85' />
    </ContentLoader>
  </div>
);

export default PaginationLoader;
