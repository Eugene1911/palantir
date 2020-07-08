import React from 'react';
import ContentLoader from 'react-content-loader';

const CategoriesSwitcherSelectorLoader = () => (
  <ContentLoader
    style={{
      height: '80px',
      width: '100%',
    }}
    width={100}
    height={2}
    speed={2}
    primaryColor="#d9d9d9"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0.2" ry="0.2" width="8" height="0.5" />
    <rect x="0" y="0.65" rx="0.2" ry="0.2" width="100" height="1.3" />
  </ContentLoader>
);

export default CategoriesSwitcherSelectorLoader;
