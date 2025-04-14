import React, { useState } from "react";
import "../styles/sidebar.css";
import { SquareChevronLeft, SquareChevronRight, LayoutDashboard, ClipboardList,Users, BarChart2, HelpCircle, } from "lucide-react";
import logo from '../assets/votexmlogo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState); // notify parent
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
     <div className="sidebar-header">
        <img
          src={logo} alt="VOTEX Logo"  className={`sidebar-logo ${isOpen ? "logo-open" : "logo-closed"}`}
          />
        {isOpen}
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <SquareChevronLeft size={20} /> : <SquareChevronRight size={20} />}
      </button>
      
      <nav className="sidebar-nav">
        <a href="#">
          <LayoutDashboard size={18} className="nav-icon" />
          {isOpen && <span>Dashboard</span>}
        </a>
        <a href="#">
          <ClipboardList size={18} className="nav-icon" />
          {isOpen && <span>Elections</span>}
        </a>
        <a href="#">
          <Users size={18} className="nav-icon" />
          {isOpen && <span>Voters</span>}
        </a>
        <a href="#">
          <BarChart2 size={18} className="nav-icon" />
          {isOpen && <span>Results</span>}
        </a>
        <a href="#">
          <HelpCircle size={18} className="nav-icon" />
          {isOpen && <span>Help</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;

