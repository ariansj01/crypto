import React, { useContext, useEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FcCurrencyExchange, FcIdea } from 'react-icons/fc';
import { SlWallet } from 'react-icons/sl';
import { TbCoins } from 'react-icons/tb';
import { CiStar } from 'react-icons/ci';
import { LuLayoutDashboard } from 'react-icons/lu';
import Contextariable from '../context/AppContext';
import { FaRegUser } from "react-icons/fa6";
import { SiMinds } from "react-icons/si";
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const Dashboard = () => {
  let {currency, setCurrency, setDeepCurrency, setValidate, setPrices} = useContext(Contextariable);
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('UserName');
    setUserName(storedUserName || 'Guest');
  }, []);

  const menuItems = [
    {
      key: '1',
      icon: <LuLayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/MainContent'
    },
    {
      key: '3',
      icon: <CiStar className="w-5 h-5" />,
      label: 'Interesting',
      path: '/Intresting'
    },
    {
      key: '4',
      icon: <TbCoins className="w-5 h-5" />,
      label: 'Comparison',
      path: '/Comparison'
    },
    {
      key: '5',
      icon: <FcCurrencyExchange className="w-5 h-5" />,
      label: 'Exchange',
      path: '/Exchange'
    },
    {
      key: '7',
      icon: <SlWallet className="w-5 h-5" />,
      label: 'Wallet',
      path: '/Wallet',
      children: [
        {
          icon: <SlWallet className="w-4 h-4" />,
          key: '10',
          label: 'Transaction History',
          path: '/TransHistory'
        }
      ]
    },
    {
      key: '8',
      icon: <FcIdea className="w-5 h-5" />,
      label: 'AI',
      path: '/Ai'
    },
    {
      key: '11',
      icon: <SiMinds className="w-5 h-5" />,
      label: 'AI Chat',
      path: '/AiChat'
    },
    {
      key: '12',
      icon: <FaRegUser className="w-5 h-5" />,
      label: 'Profile',
      path: '/Profile'
    }
  ];

  useEffect(() => {
    let GoDash = sessionStorage.getItem('token');
    if (GoDash) {
      socket.on('cryptoData', (data) => {
        setPrices(data);
        let CurrencyNames = [];
        let Instruments = Object.values(data.instruments);
        let Depths = Object.values(data.depths);
        
        let fillInstruments = Instruments.filter(item => item.assetClass === 'CURRENCY');
        setCurrency(fillInstruments);
        currency.map(item => CurrencyNames.push(item.canonical_symbol));

        const filteredItems = Depths.filter(item => CurrencyNames.includes(item[0]));
        setDeepCurrency(filteredItems);
      });            
      return () => {
        socket.off('cryptoData');
      };
    } else {
      setValidate(false);
    }
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1e293b] text-yellow-400 shadow-lg md:hidden ${
          showMobileMenu ? 'hidden' : 'block'
        }`}
      >
        <MenuOutlined className="text-xl" />
      </motion.button>

      {/* Floating Button for Desktop */}
      {!isMobile && collapsed && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1e293b] text-yellow-400 shadow-lg hidden md:block"
        >
          <MenuUnfoldOutlined className="text-xl" />
        </motion.button>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {(showMobileMenu || !isMobile) && (
            <motion.aside 
              initial={isMobile ? { x: -300 } : { x: 0 }}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -300 } : { x: -300 }}
              transition={{ type: "spring", stiffness: 100 }}
              className={`fixed md:relative z-40 h-full bg-[#1e293b]/95 backdrop-blur-xl border-r border-[#334155]/50 transition-all duration-300 ease-in-out ${
                isMobile ? 'w-72' : collapsed ? 'w-20' : 'w-72'
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-6 border-b border-[#334155]/50"
                >
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: collapsed ? 0 : 1 }}
                    className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                  >
                    CryptoVerse
                  </motion.h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-yellow-400 hover:bg-[#334155]/50 transition-colors"
                  >
                    {isMobile ? <MenuFoldOutlined /> : collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </motion.button>
                </motion.div>

                {/* Sidebar Menu */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                  <ul className="space-y-2">
                    {menuItems.map((item) => (
                      <motion.li 
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <NavLink
                          to={item.path}
                          onClick={isMobile ? closeMobileMenu : undefined}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border-l-4 border-yellow-400'
                                : 'text-gray-300 hover:bg-[#334155]/50 hover:text-yellow-400'
                            }`
                          }
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          {(!collapsed || isMobile) && (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-3 font-medium"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </NavLink>
                        {item.children && (!collapsed || isMobile) && (
                          <motion.ul 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-2 ml-4 space-y-2"
                          >
                            {item.children.map((child) => (
                              <motion.li 
                                key={child.key}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <NavLink
                                  to={child.path}
                                  onClick={isMobile ? closeMobileMenu : undefined}
                                  className={({ isActive }) =>
                                    `flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                      isActive
                                        ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400'
                                        : 'text-gray-300 hover:bg-[#334155]/50 hover:text-yellow-400'
                                    }`
                                  }
                                >
                                  <span className="flex-shrink-0">{child.icon}</span>
                                  <span className="ml-3 text-sm">{child.label}</span>
                                </NavLink>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Sidebar Footer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 border-t border-[#334155]/50"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20"
                    >
                      <span className="text-[#0f172a] font-bold text-lg">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </motion.div>
                    {(!collapsed || isMobile) && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 min-w-0"
                      >
                        <p className="text-sm font-medium text-yellow-400 truncate">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          Crypto Trader
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        {isMobile && showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          />
        )}

        {/* Main Content */}
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`flex-1 overflow-y-auto bg-[#0f172a]/50 backdrop-blur-sm transition-all duration-300`}
          // className={`flex-1 overflow-y-auto bg-[#0f172a]/50 backdrop-blur-sm transition-all duration-300 ${
          //   isMobile ? 'w-full' : collapsed ? 'md:ml-20' : '' // md:ml-72
          // }`}
        >
          <div className="container mx-auto px-4 md:px-6 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
