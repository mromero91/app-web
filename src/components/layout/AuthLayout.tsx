import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@stores/uiStore';

export const AuthLayout = () => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-[#211A40]">
      {/* Sidebar flotante */}
      <Sidebar />

      {/* Contenido principal con margen dinámico */}
      <main
        className={`min-h-screen transition-all duration-500 ease-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="p-6 bg-white rounded-lg shadow min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
