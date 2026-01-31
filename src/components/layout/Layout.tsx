import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  showFooter?: boolean;
}

const Layout = ({ children, isAuthenticated = false, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1 pt-24">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
