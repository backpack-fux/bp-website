// components/Layout/MainLayout.tsx

import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl p-4">{children}</div>
    </div>
  );
};

export default MainLayout;
