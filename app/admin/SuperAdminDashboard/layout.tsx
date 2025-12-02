import React from "react";
import Sidebar from "./Components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default layout;
