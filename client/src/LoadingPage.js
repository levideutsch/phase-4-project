import React, { useEffect, useState } from 'react';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <article aria-busy="true">Loading...</article>
      ) : (
        <article>Content of the page after loading</article>
      )}
    </div>
  );
}

export default LoadingPage;