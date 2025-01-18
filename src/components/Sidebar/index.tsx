
import { NavLink, useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { CiLogout } from 'react-icons/ci';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/signin');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-40 w-64 bg-blue-900 text-white transition-transform duration-300 ${
        sidebarOpen ? 'transform-none' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white"
        >
          <FiChevronDown />
        </button>
      </div>

      <div className="mt-6">
        <NavLink
          to="/Dashboard/ECommerce"
          className="block px-6 py-2 text-lg text-white hover:bg-blue-700 transition-all"
        >
          Transações
        </NavLink>
        <NavLink
          to="/Principal/page"
          className="block px-6 py-2 text-lg text-white hover:bg-blue-700 transition-all"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/Profile/page"
          className="block px-6 py-2 text-lg text-white hover:bg-blue-700 transition-all"
        >
          Meu Perfil
        </NavLink>
        <button
          onClick={handleLogout}
          className="block w-full px-6 py-2 text-lg text-white hover:bg-blue-700 transition-all mt-4"
        >
          <CiLogout className="inline mr-2" /> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
