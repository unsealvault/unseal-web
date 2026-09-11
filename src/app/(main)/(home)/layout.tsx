"use client";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ReactNode } from "react"; 

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div> 
      <Navbar />
      <main>{children}</main> 
      <Footer />
    </div>
  );
};

export default layout;
