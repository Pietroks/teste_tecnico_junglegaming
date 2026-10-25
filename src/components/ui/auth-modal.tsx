import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-[500px] min-h-[600px] bg-[#241612] rounded-[12px] border border-[#3F2319] overflow-hidden flex flex-col relative shadow-2xl justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#CFB28C] hover:text-[#F5F1EB] transition-colors p-1 rounded-full cursor-pointer"
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>

        <div className="p-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`font-medium text-[20px] leading-4 transition-colors cursor-pointer ${
                mode === "login" ? "text-[#E89B55] font-bold" : "text-[#F5F1EB]"
              }`}
            >
              Entrar
            </button>
            <span className="text-[#3F2319] text-xl font-light">|</span>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`font-medium text-[20px] leading-4 transition-colors cursor-pointer ${
                mode === "register"
                  ? "text-[#E89B55] font-bold"
                  : "text-[#F5F1EB]"
              }`}
            >
              Criar conta
            </button>
          </div>

          <p className="font-normal text-[13px] leading-4 text-center text-[#F5F1EB] max-w-[340px] mb-6">
            {mode === "login"
              ? "Entre para gerenciar sua carteira, coleção e perfil de criador"
              : "Crie seu perfil de colecionador e conecte uma carteira quando quiser."}
          </p>

          {mode === "login" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = (formData.get("email") as string) || "";
                login({ email });
                onClose();
              }}
              className="w-full flex flex-col items-center gap-4"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="contato@email.com"
                className="w-full max-w-[340px] h-10 px-4 py-3 bg-[#1E140F] border border-[#3F2319] rounded-[5px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
              />

              <div className="w-full max-w-[340px] h-10 px-4 py-3 bg-[#1E140F] border border-[#D28A4C] rounded-[5px] flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="**************"
                  className="w-full bg-transparent text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none pr-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer shrink-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="w-full max-w-[340px] flex justify-end -mt-1">
                <button
                  type="button"
                  className="text-xs text-[#D28A4C] hover:underline cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                className="w-full max-w-[340px] h-10 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer mt-1"
              >
                Entrar
              </button>

              <div className="w-full max-w-[340px] flex items-center my-1">
                <div className="flex-1 border-t border-[#3F2319]" />
                <span className="px-3 text-xs text-[#CFB28C] select-none">
                  Ou continue com
                </span>
                <div className="flex-1 border-t border-[#3F2319]" />
              </div>

              <button
                type="button"
                onClick={() => {
                  login({ email: "google@email.com", name: "Google User" });
                  onClose();
                }}
                className="w-full max-w-[340px] h-10 rounded-[6px] bg-[#1E140F] border border-[#3F2319] hover:border-[#D28A4C] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#F5F1EB] cursor-pointer transition-colors"
              >
                <GoogleIcon />
                <span>Entrar com o Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  login({ email: "facebook@email.com", name: "Facebook User" });
                  onClose();
                }}
                className="w-full max-w-[340px] h-10 rounded-[6px] bg-[#1E140F] border border-[#3F2319] hover:border-[#D28A4C] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#F5F1EB] cursor-pointer transition-colors"
              >
                <FacebookIcon />
                <span>Entrar com o Facebook</span>
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const username = (formData.get("username") as string) || "";
                const email = (formData.get("email") as string) || "";
                login({ name: username, username, email });
                onClose();
              }}
              className="w-full flex flex-col items-center gap-3.5"
            >
              <input
                type="text"
                name="username"
                required
                placeholder="Nome de usuário"
                className="w-full max-w-[340px] h-10 px-4 py-3 bg-[#1E140F] border border-[#3F2319] rounded-[5px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Digite seu e-mail"
                className="w-full max-w-[340px] h-10 px-4 py-3 bg-[#1E140F] border border-[#3F2319] rounded-[5px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
              />

              <div className="w-full max-w-[340px] h-10 px-4 py-3 bg-[#1E140F] border border-[#3F2319] rounded-[5px] flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Senha"
                  className="w-full bg-transparent text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none pr-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer shrink-0"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="w-full max-w-[340px] h-10 px-4 py-3 bg-[#1E140F] border border-[#3F2319] rounded-[5px] flex items-center justify-between">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="Confirmar senha"
                  className="w-full bg-transparent text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none pr-2"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer shrink-0"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full max-w-[340px] h-10 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer mt-1"
              >
                Criar conta
              </button>

              <div className="w-full max-w-[340px] flex items-center my-1">
                <div className="flex-1 border-t border-[#3F2319]" />
                <span className="px-3 text-xs text-[#CFB28C] select-none">
                  Ou continue com
                </span>
                <div className="flex-1 border-t border-[#3F2319]" />
              </div>

              <button
                type="button"
                onClick={() => {
                  login({ email: "google.user@email.com", name: "Google User" });
                  onClose();
                }}
                className="w-full max-w-[340px] h-10 rounded-[6px] bg-[#1E140F] border border-[#3F2319] hover:border-[#D28A4C] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#F5F1EB] cursor-pointer transition-colors"
              >
                <GoogleIcon />
                <span>Entrar com o Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  login({ email: "facebook.user@email.com", name: "Facebook User" });
                  onClose();
                }}
                className="w-full max-w-[340px] h-10 rounded-[6px] bg-[#1E140F] border border-[#3F2319] hover:border-[#D28A4C] flex items-center justify-center gap-2.5 text-xs font-semibold text-[#F5F1EB] cursor-pointer transition-colors"
              >
                <FacebookIcon />
                <span>Entrar com o Facebook</span>
              </button>
            </form>
          )}
        </div>

        <div className="w-full h-[10px] bg-[#D28A4C]" />
      </div>
    </div>
  );
}
