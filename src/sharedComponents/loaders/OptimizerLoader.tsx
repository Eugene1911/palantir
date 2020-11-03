import React from 'react';
import ContentLoader from 'react-content-loader';

const OptimizerLoader = (): JSX.Element => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
  >
    <rect x="0" y="0" rx="3" ry="3" width="88" height="12" />
    <rect x="0" y="16" rx="3" ry="3" width="152" height="6" />

    <rect x="0" y="38" rx="3" ry="3" width="90" height="12" />
    <rect x="110" y="38" rx="3" ry="3" width="155" height="12" />
    <rect x="270" y="38" rx="3" ry="3" width="60" height="12" />

    <rect x="0" y="58" rx="3" ry="3" width="90" height="12" />
    <rect x="110" y="58" rx="3" ry="3" width="220" height="12" />
    <rect x="110" y="78" rx="3" ry="3" width="220" height="42" />
  </ContentLoader>
);

export default OptimizerLoader;
