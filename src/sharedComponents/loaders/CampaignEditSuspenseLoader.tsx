import React from 'react';
import ContentLoader from 'react-content-loader';

type TCampaignEditSuspenseLoaderProps = {
  rows: number;
};

const CampaignEditSuspenseLoader = ({
  rows,
}: TCampaignEditSuspenseLoaderProps): JSX.Element => (
  <>
    {Array(rows)
      .fill('')
      .map(() => (
        <ContentLoader
          key={Math.random()}
          style={{
            height: '40px',
            width: '100%',
            margin: '12px 0',
          }}
          width={100}
          height={2}
          speed={2}
          primaryColor="#d9d9d9"
          secondaryColor="#ecebeb"
        >
          <rect
            x="2"
            y="0"
            rx="0.2"
            ry="0.2"
            width="15"
            height="100%"
          />
          <rect
            x="18"
            y="0"
            rx="0.2"
            ry="0.2"
            width="84"
            height="100%"
          />
        </ContentLoader>
      ))}
  </>
);

export default CampaignEditSuspenseLoader;
