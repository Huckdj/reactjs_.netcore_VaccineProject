import React from 'react';

function SeenPostReview({ htmlContent }) {
  return (
    <div className='justify-center grid bg-white'>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

export default SeenPostReview;
