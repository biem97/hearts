import React, { ReactElement } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="px-5 max-w-7xl mx-auto mt-4">{children}</div>
    </div>
  );
}
