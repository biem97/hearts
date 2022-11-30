import React, { ReactElement } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-slate-300 dark:bg-gray-600">
      <Navbar />
      <div className="h-[calc(100vh-4rem)] px-5 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
