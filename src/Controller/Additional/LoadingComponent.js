import React, { useEffect } from 'react';
import '../../Asset/Css/Loading.css';

function LoadingComponent() {
  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden">
      <div className="loader text-center">
        MADU VACCINATIONS <br /> XIN CHÀO
      </div>
    </div>
  );
}

export default LoadingComponent;
