import React from "react";
import Footer from "@/components/footer";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "bg-gray-50 dark:bg-gray-900",
}) => (
  <div className={`flex flex-col min-h-screen ${className} transition-colors duration-300`}>
    <main className="flex-grow relative mx-auto">
      {children}
    </main>
    <Footer />
  </div>
);


export default MainLayout;
