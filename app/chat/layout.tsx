import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex w-full">
      {children}
    </div>
  );
}

export default Layout;
