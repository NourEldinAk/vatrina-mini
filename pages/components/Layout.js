import React, { useContext, useEffect } from 'react';
import PrimarySearchAppBar from '../components/Navbar'; // Adjust the path as needed

const Layout = ({ children, styles, siteName }) => {

  return (
    <div>
      <PrimarySearchAppBar styles={styles} siteName={siteName} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
