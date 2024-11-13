import React from 'react';
import './layout.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout({ children }: { children: React.Node }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;