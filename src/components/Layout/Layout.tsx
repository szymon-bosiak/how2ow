import React from 'react';
import './layout.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;