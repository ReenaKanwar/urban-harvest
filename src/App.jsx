import React from 'react';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentPage = useSelector((state) => state.nav.currentPage);

  // Render Login page if user is not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  // Render App shell if authenticated
  return (
    <div className="app-container animate-fade-in">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main viewport */}
      <div className="main-content-wrapper">
        {/* Top bar header */}
        <Header />

        {/* Selected content page */}
        <main className="page-container">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'products' && <Products />}
        </main>
      </div>
    </div>
  );
}

export default App;
