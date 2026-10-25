import { useState } from "react";
import logoImg from "@/assets/Logo.png";
import { Link } from "@tanstack/react-router";
import { SearchIcon, ShoppingCartIcon, User, Menu, X } from "lucide-react";
import logoutIcon from "@/assets/Logout.png";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import AuthModal from "@/components/ui/auth-modal";

export default function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full h-11.25 flex items-center justify-between text-[#F5F1EB] mx-auto border-b-[0.3px] border-[#D28A4C] mb-6">
        <Link to="/" className="shrink-0">
          <img
            src={logoImg}
            alt="Logo"
            className="w-32 sm:w-40 h-[34.3px] object-contain"
          />
        </Link>

        <nav className="hidden md:flex h-full items-center gap-6 lg:gap-10">
          <Link
            to="/"
            className="h-full flex items-center text-base tracking-normal font-normal text-[#F5F1EB] border-b-2 border-transparent hover:text-[#E89B55] hover:border-[#E89B55] [&.active]:text-[#E89B55] [&.active]:border-[#E89B55] [&.active]:font-bold transition-all mb-[-0.3px]"
          >
            Início
          </Link>
          <Link
            to="/mercado"
            className="h-full flex items-center text-base tracking-normal font-normal text-[#F5F1EB] border-b-2 border-transparent hover:text-[#E89B55] hover:border-[#E89B55] [&.active]:text-[#E89B55] [&.active]:border-[#E89B55] [&.active]:font-bold transition-all mb-[-0.3px]"
          >
            Mercado
          </Link>
          <Link
            to="/realtime"
            className="h-full flex items-center text-base tracking-normal font-normal text-[#F5F1EB] border-b-2 border-transparent hover:text-[#E89B55] hover:border-[#E89B55] [&.active]:text-[#E89B55] [&.active]:border-[#E89B55] [&.active]:font-bold transition-all mb-[-0.3px]"
          >
            Criadores
          </Link>
          <Link
            to="/"
            className="h-full flex items-center text-base tracking-normal font-normal text-[#F5F1EB] border-b-2 border-transparent hover:text-[#E89B55] hover:border-[#E89B55] [&.active]:text-[#E89B55] [&.active]:border-[#E89B55] [&.active]:font-bold transition-all mb-[-0.3px]"
          >
            Aprenda
          </Link>
        </nav>

        <nav className="h-full flex items-center gap-4 sm:gap-7">
          <SearchIcon
            size={20}
            className="text-[#F5F1EB] cursor-pointer hover:text-[#E89B55] transition-colors duration-300"
          />

          <Link
            to="/finalizar-compra"
            className="relative flex items-center cursor-pointer bg-transparent border-none p-0 outline-none"
          >
            <ShoppingCartIcon
              size={24}
              className="text-[#F5F1EB] hover:text-[#E89B55] transition-colors duration-300"
            />

            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#D28A4C] text-[#140D0A] border-2 border-[#140D0A] flex items-center justify-center text-[10px] font-bold leading-none select-none">
              {itemCount}
            </span>
          </Link>
          {isAuthenticated ? (
            <Link
              to="/perfil"
              className="rounded-[6px] bg-[#D28A4C] px-3 py-1.75 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#E89B55] transition-colors duration-500"
            >
              <User size={18} className="text-[#140D0A]" />
              <p className="font-medium text-sm sm:text-base text-[#140D0A]">Meu perfil</p>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-[6px] bg-[#D28A4C] px-2 py-1.75 flex items-center justify-center gap-1 cursor-pointer hover:bg-[#E89B55] transition-colors duration-500"
            >
              <img src={logoutIcon} alt="Logout" />
              <p className="font-medium text-sm sm:text-base text-[#140D0A]">Entrar</p>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-[#F5F1EB] hover:text-[#E89B55] p-1 cursor-pointer transition-colors"
            aria-label="Menu principal"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-[#241612] border border-[#3F2319] rounded-xl p-4 flex flex-col gap-2 mb-6 shadow-2xl animate-in fade-in duration-150">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium text-[#F5F1EB] hover:text-[#E89B55] py-2 border-b border-[#3F2319]/50 transition-colors"
          >
            Início
          </Link>
          <Link
            to="/mercado"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium text-[#F5F1EB] hover:text-[#E89B55] py-2 border-b border-[#3F2319]/50 transition-colors"
          >
            Mercado
          </Link>
          <Link
            to="/realtime"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium text-[#F5F1EB] hover:text-[#E89B55] py-2 border-b border-[#3F2319]/50 transition-colors"
          >
            Criadores
          </Link>
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-medium text-[#F5F1EB] hover:text-[#E89B55] py-2 transition-colors"
          >
            Aprenda
          </Link>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
