import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useUIStore } from '@stores/uiStore';
import { authService } from '@services/api/auth';
import { removeAuthData } from '@services/storage/tokenStorage';
import auraLogo from '@assets/aura.svg';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Usuarios', href: '/users', icon: Users },
];

export const Sidebar = () => {
  const {
    sidebarOpen,
    sidebarCollapsed,
    toggleSidebar,
    toggleSidebarCollapse,
  } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      removeAuthData();
      navigate('/login');
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed top-4 left-4 bottom-4 z-50 bg-[#211A40]/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transform transition-all duration-500 ease-out ${
          sidebarCollapsed ? 'w-16' : 'w-72'
        } ${
          sidebarOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        } lg:translate-x-0 lg:opacity-100`}
        style={{
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }}
      >
        <div
          className={`flex items-center border-b border-white/10 transition-all duration-300 ${
            sidebarCollapsed ? 'justify-center p-4' : 'justify-between p-6'
          }`}
        >
          <div className="flex items-center space-x-3">
            <img src={auraLogo} alt="Aura" className="h-8 w-8" />
            {!sidebarCollapsed && (
              <span className="text-xl font-bold text-white transition-opacity duration-300">
                Aura
              </span>
            )}
          </div>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSidebarCollapse}
                className="hidden lg:flex p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Contraer sidebar"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </div>

        <nav
          className={`flex-1 py-6 space-y-2 transition-all duration-300 ${
            sidebarCollapsed ? 'px-2' : 'px-4'
          }`}
        >
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center text-sm font-medium rounded-xl transition-all duration-200 ${
                  sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'
                } ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg transform scale-105 border border-white/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white hover:transform hover:scale-105'
                }`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors ${
                    sidebarCollapsed ? '' : 'mr-3'
                  } ${
                    isActive
                      ? 'text-white'
                      : 'text-white/60 group-hover:text-white'
                  }`}
                />
                {!sidebarCollapsed && (
                  <>
                    <span className="truncate ml-3">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`border-t border-white/10 transition-all duration-300 ${
            sidebarCollapsed ? 'p-2' : 'p-4'
          }`}
        >
          <button
            className={`w-full flex items-center text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-200 hover:transform hover:scale-105 ${
              sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'
            }`}
            title={sidebarCollapsed ? 'Close Session' : ''}
            onClick={handleLogout}
          >
            <LogOut className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && 'Close Session'}
          </button>
        </div>
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 lg:hidden p-3 bg-[#211A40]/95 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 hover:bg-[#211A40] transition-all duration-200"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      {sidebarCollapsed && (
        <button
          onClick={toggleSidebarCollapse}
          className="fixed top-4 left-20 z-30 hidden lg:flex p-2 bg-[#211A40]/95 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 hover:bg-[#211A40] transition-all duration-200"
          title="Expandir sidebar"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      )}
    </>
  );
};
