import React from "react";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => (
  <div className={cn("flex min-h-screen flex-col", className)}>
    <main className="flex-1 overflow-x-hidden px-6 sm:px-8 md:px-10 lg:px-12">
      {children}
    </main>
    <Footer />
  </div>
);


export default MainLayout;
