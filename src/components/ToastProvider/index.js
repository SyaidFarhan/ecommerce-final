'use client';

import { useEffect, useState } from 'react';

// Dynamically load ToastContainer only on client side
export default function ToastProvider() {
  const [ToastContainer, setToastContainer] = useState(null);

  useEffect(() => {
    // Import react-toastify dynamically on client side
    import('react-toastify').then((mod) => {
      setToastContainer(() => mod.ToastContainer);
    });
    // Import CSS
    import('react-toastify/dist/ReactToastify.css');
  }, []);

  if (!ToastContainer) {
    return null;
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}
