import { Outlet } from 'react-router-dom';
import auraLogo from '@assets/aura.svg';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#211A40] flex flex-col">
      {/* Header fijo en la parte superior */}
      <header className="w-full px-4 pt-8 flex">
        <img src={auraLogo} alt="Aura" className="h-12 w-auto" />
      </header>

      {/* Contenido centrado */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
