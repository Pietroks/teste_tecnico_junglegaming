import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  User,
  MapPin,
  ShoppingCart,
  Heart,
  Activity,
  Download,
  AlertTriangle,
  LogOut,
  ImageIcon,
  Check,
  Copy,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

export const Route = createFileRoute("/perfil")({
  component: PerfilComponent,
});

type PerfilTab =
  | "dados"
  | "carteiras"
  | "atividades"
  | "lista"
  | "ofertas"
  | "downloads"
  | "suporte";

interface SavedWallet {
  id: string;
  displayName: string;
  nickname: string;
  network: string;
  profileName: string;
  address: string;
  secondaryAddress?: string;
  walletType: string;
  referralCode?: string;
  email?: string;
  ens?: string;
  isPrincipal: boolean;
}

function PerfilComponent() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<PerfilTab>("dados");

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("handson_user");
      if (savedUser && savedUser.toLowerCase().includes("satoshi")) {
        localStorage.removeItem("handson_user");
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const [wallets, setWallets] = useState<SavedWallet[]>(() => {
    try {
      const saved = localStorage.getItem("handson_wallets");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [addToPrincipal, setAddToPrincipal] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleSaveWallet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const displayName = (formData.get("displayName") as string)?.trim() || "";
    const nickname =
      (formData.get("nickname") as string)?.trim() ||
      (formData.get("walletType") as string) ||
      "Minha Carteira";
    const network = (formData.get("network") as string) || "Ethereum";
    const profileName = (formData.get("profileName") as string)?.trim() || "";
    const rawAddress = (formData.get("address") as string)?.trim();
    const address =
      rawAddress ||
      "0x" +
        Math.random().toString(16).substring(2, 6) +
        "..." +
        Math.random().toString(16).substring(2, 6);
    const secondaryAddress =
      (formData.get("secondaryAddress") as string)?.trim() || "";
    const walletType = (formData.get("walletType") as string) || "MetaMask";
    const referralCode = (formData.get("referralCode") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const ens = (formData.get("ens") as string)?.trim() || "";

    const newWallet: SavedWallet = {
      id: Date.now().toString(),
      displayName,
      nickname,
      network,
      profileName,
      address,
      secondaryAddress,
      walletType,
      referralCode,
      email,
      ens,
      isPrincipal: addToPrincipal,
    };

    const updated = [...wallets, newWallet];
    setWallets(updated);
    try {
      localStorage.setItem("handson_wallets", JSON.stringify(updated));
    } catch {
      // storage unavailable
    }

    setSaveSuccess(true);
    form.reset();
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleDeleteWallet = (id: string) => {
    const updated = wallets.filter((w) => w.id !== id);
    setWallets(updated);
    try {
      localStorage.setItem("handson_wallets", JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
  };

  const menuItems = [
    { id: "dados" as const, label: "Dados do perfil", icon: User },
    { id: "carteiras" as const, label: "Carteiras", icon: MapPin },
    { id: "atividades" as const, label: "Atividades", icon: ShoppingCart },
    { id: "lista" as const, label: "Lista de interesse", icon: Heart },
    { id: "ofertas" as const, label: "Ofertas", icon: Activity },
    { id: "downloads" as const, label: "Arquivos baixados", icon: Download },
    { id: "suporte" as const, label: "Suporte", icon: AlertTriangle },
  ];

  return (
    <div className="w-full flex flex-col gap-8 text-[#F5F1EB]">
      <nav className="flex items-center gap-2 text-xs font-normal text-[#CFB28C]">
        <Link to="/" className="hover:text-[#E89B55] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#D28A4C] font-semibold">Meu perfil</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-7 items-start w-full">
        {/* ASIDE */}
        <aside className="w-full lg:w-77.5 min-h-101.75 bg-[#241612] py-2 rounded-xl border border-[#3F2319] flex flex-col justify-between shrink-0">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-[#F5F1EB] px-6 py-3 border-b border-[#3F2319]/40 mb-1">
              Meu perfil
            </h3>

            <nav className="flex flex-col">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === "dados" || item.id === "carteiras") {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`h-11.25 flex items-center px-6 gap-3 transition-colors text-3.75 leading-11.25 text-left select-none cursor-pointer ${
                      isActive
                        ? "text-[#E89B55] font-bold border-l-2 border-[#D28A4C] bg-[#1E140F]/60"
                        : "text-[#CFB28C] font-normal border-l-2 border-transparent hover:text-[#F5F1EB] hover:bg-[#1E140F]/30"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-[#E89B55]" : "text-[#CFB28C]"}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-[#3F2319] pt-1 mt-2">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="h-11.25 w-full flex items-center px-6 gap-3 text-[#D28A4C] hover:text-[#E89B55] font-bold text-3.75 leading-11.25 transition-colors cursor-pointer select-none"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* CONTEÚDO DINÂMICO */}
        <div className="flex-1 w-full bg-[#241612] p-8 rounded-xl border border-[#3F2319]">
          {activeTab === "dados" ? (
            <div className="flex flex-col gap-10">
              {/* PERFIL DO COLECIONADOR */}
              <div className="flex flex-col gap-6">
                <h2 className="font-bold text-2xl text-[#F5F1EB]">
                  Perfil do colecionador
                </h2>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-6 w-full"
                >
                  {/* Linha 1: Nome de exibição ao lado de Nome de usuário */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Nome de exibição
                      </label>
                      <input
                        type="text"
                        defaultValue=""
                        placeholder="Nome de exibição"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Nome de usuário
                      </label>
                      <input
                        type="text"
                        defaultValue=""
                        placeholder="@usuario"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Linha 2: E-mail ao lado de Nome do ENS (select .eth e input nome) */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        E-mail
                      </label>
                      <input
                        type="email"
                        defaultValue=""
                        placeholder="email@exemplo.com"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Nome do ENS
                      </label>
                      <div className="flex items-center w-full gap-2">
                        <select
                          defaultValue=".eth"
                          className="w-24 h-10 px-2 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                        >
                          <option value=".eth">.eth</option>
                          <option value=".sol">.sol</option>
                          <option value=".lens">.lens</option>
                        </select>
                        <input
                          type="text"
                          defaultValue=""
                          placeholder="Digite seu ENS..."
                          className="flex-1 h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Linha 3: Apelido da carteira ao lado de Avatar */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Apelido da carteira
                      </label>
                      <input
                        type="text"
                        defaultValue=""
                        placeholder="Apelido da carteira"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Avatar
                      </label>
                      <div className="flex items-center gap-4 h-10">
                        <div className="w-10 h-10 rounded-full bg-[#1E140F] border border-[#3F2319] flex items-center justify-center text-[#D28A4C] shrink-0">
                          <ImageIcon size={20} />
                        </div>
                        <button
                          type="button"
                          className="px-4 h-9 rounded-lg bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-xs transition-colors cursor-pointer"
                        >
                          Alterar
                        </button>
                        <button
                          type="button"
                          className="px-4 h-9 rounded-lg border border-[#3F2319] hover:border-red-400 text-[#CFB28C] hover:text-red-400 text-xs transition-colors cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* ALTERAR SENHA */}
              <div className="flex flex-col gap-6 pt-6 border-t border-[#3F2319]">
                <h3 className="font-bold text-xl text-[#F5F1EB]">
                  Alterar senha
                </h3>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-4 max-w-md"
                >
                  <div className="flex flex-col gap-2">
                    <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                      Senha atual
                    </label>
                    <input
                      type="password"
                      placeholder="Digite sua senha atual"
                      className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                      Nova senha
                    </label>
                    <input
                      type="password"
                      placeholder="Digite a nova senha"
                      className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                      Confirmar nova senha
                    </label>
                    <input
                      type="password"
                      placeholder="Confirme a nova senha"
                      className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-36 h-10 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm transition-colors cursor-pointer mt-2"
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* TELA 2: CARTEIRAS */
            <div className="flex flex-col gap-6">
              {/* CARTEIRA PRINCIPAL */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#3F2319]">
                  <h2 className="font-bold text-[17px] text-[#F5F1EB]">
                    Carteira principal
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("wallet-form");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-transparent font-bold text-3.75 text-[#E89B55] hover:text-[#D28A4C] transition-colors cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>

                <p className="font-normal text-[14px] text-[#CFB28C]">
                  Estas carteiras ficam disponíveis no pagamento e para receber
                  NFTs comprados.
                </p>

                {/* LISTA DE CARTEIRAS PRINCIPAIS SALVAS */}
                {wallets.filter((w) => w.isPrincipal).length > 0 && (
                  <div className="flex flex-col gap-3">
                    {wallets
                      .filter((w) => w.isPrincipal)
                      .map((w) => (
                        <div
                          key={w.id}
                          className="p-4 rounded-[8px] bg-[#1E140F] border border-[#3F2319] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#D28A4C]/10 border border-[#D28A4C] flex items-center justify-center text-[#D28A4C] font-bold text-sm shrink-0">
                              {w.walletType[0] || "W"}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#F5F1EB]">
                                  {w.nickname}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D28A4C]/20 text-[#D28A4C]">
                                  Principal
                                </span>
                                <span className="text-xs text-[#CFB28C]">
                                  ({w.network})
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[#CFB28C]">
                                <span>{w.address}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(w.address)}
                                  className="hover:text-[#F5F1EB] transition-colors cursor-pointer"
                                  title="Copiar endereço"
                                >
                                  {copiedAddress === w.address ? (
                                    <Check
                                      size={12}
                                      className="text-green-400"
                                    />
                                  ) : (
                                    <Copy size={12} />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-sm text-[#E89B55]">
                              {w.walletType}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteWallet(w.id)}
                              className="text-[#CFB28C] hover:text-red-400 transition-colors p-1 cursor-pointer"
                              title="Remover carteira"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* FEEDBACK DE SUCESSO */}
                {saveSuccess && (
                  <div className="p-3 rounded-[6px] bg-[#241612] border border-[#D28A4C] text-[#E89B55] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <Check size={16} className="text-[#E89B55]" />
                    <span>Carteira salva com sucesso!</span>
                  </div>
                )}

                {/* FORMULÁRIO DE CADASTRO DE CARTEIRA */}
                <form
                  id="wallet-form"
                  onSubmit={handleSaveWallet}
                  className="flex flex-col gap-6 w-full pt-2"
                >
                  {/* Linha 1: Nome de exibição ao lado de Apelido da carteira */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Nome de exibição
                      </label>
                      <input
                        type="text"
                        name="displayName"
                        placeholder="Nome de exibição"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Apelido da carteira
                      </label>
                      <input
                        type="text"
                        name="nickname"
                        placeholder="Apelido da carteira"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Linha 2: Rede select ao lado de Nome de perfil */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Rede
                      </label>
                      <select
                        name="network"
                        defaultValue="Ethereum"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                      >
                        <option value="Ethereum">Ethereum</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Arbitrum">Arbitrum</option>
                        <option value="Optimism">Optimism</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Nome de perfil
                      </label>
                      <input
                        type="text"
                        name="profileName"
                        placeholder="Nome de perfil"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Linha 3: Endereço da carteira ao lado de Input ENS ou carteira secundária opcional sem label */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Endereço da carteira
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Endereço 0x da carteira"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full sm:self-end">
                      <div
                        className="hidden sm:block h-3.75"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        name="secondaryAddress"
                        placeholder="ENS ou carteira secundária (opcional)"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Linha 4: Tipo de carteira select ao lado de Código de indicação */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Tipo de carteira
                      </label>
                      <select
                        name="walletType"
                        defaultValue="MetaMask"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                      >
                        <option value="MetaMask">MetaMask</option>
                        <option value="Coinbase Wallet">Coinbase Wallet</option>
                        <option value="WalletConnect">WalletConnect</option>
                        <option value="Rainbow">Rainbow</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Código de indicação
                      </label>
                      <input
                        type="text"
                        name="referralCode"
                        placeholder="Código de indicação"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Linha 5: E-mail ao lado de Nome ENS (input select .ens ao lado input pro nome) */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@exemplo.com"
                        className="w-full h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                        Nome ENS
                      </label>
                      <div className="flex items-center w-full gap-2">
                        <select
                          name="ensType"
                          defaultValue=".ens"
                          className="w-24 h-10 px-2 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                        >
                          <option value=".ens">.ens</option>
                          <option value=".eth">.eth</option>
                        </select>
                        <input
                          type="text"
                          name="ens"
                          placeholder="Nome ENS"
                          className="flex-1 h-10 px-3 bg-[#1E140F] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/40 outline-none focus:border-[#D28A4C] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-45 h-10 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm transition-colors cursor-pointer mt-2"
                  >
                    Salvar carteira
                  </button>
                </form>
              </div>

              {/* CARTEIRA SECUNDÁRIA */}
              <div className="pt-8 border-t border-[#3F2319] flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#3F2319]">
                  <h3 className="font-bold text-[17px] text-[#F5F1EB]">
                    Carteira secundária
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#CFB28C] hover:text-[#F5F1EB] transition-colors">
                    <input
                      type="checkbox"
                      checked={addToPrincipal}
                      onChange={(e) => setAddToPrincipal(e.target.checked)}
                      className="w-4 h-4 rounded-full accent-[#D28A4C] cursor-pointer"
                    />
                    <span>Adicionar à carteira principal</span>
                  </label>
                </div>

                {wallets.filter((w) => !w.isPrincipal).length === 0 ? (
                  <div className="w-full py-8 px-6 rounded-[8px] bg-[#1E140F]/60 border border-[#3F2319] border-dashed flex items-center justify-center text-center">
                    <p className="text-[14px] text-[#CFB28C]">
                      Você ainda não adicionou uma carteira secundária.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {wallets
                      .filter((w) => !w.isPrincipal)
                      .map((w) => (
                        <div
                          key={w.id}
                          className="p-4 rounded-[8px] bg-[#1E140F] border border-[#3F2319] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#38220F] border border-[#3F2319] flex items-center justify-center text-[#CFB28C] font-bold text-sm shrink-0">
                              {w.walletType[0] || "W"}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#F5F1EB]">
                                  {w.nickname}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-normal bg-[#241612] text-[#CFB28C]">
                                  Secundária
                                </span>
                                <span className="text-xs text-[#CFB28C]">
                                  ({w.network})
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[#CFB28C]">
                                <span>{w.address}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(w.address)}
                                  className="hover:text-[#F5F1EB] transition-colors cursor-pointer"
                                  title="Copiar endereço"
                                >
                                  {copiedAddress === w.address ? (
                                    <Check
                                      size={12}
                                      className="text-green-400"
                                    />
                                  ) : (
                                    <Copy size={12} />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-sm text-[#CFB28C]">
                              {w.walletType}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteWallet(w.id)}
                              className="text-[#CFB28C] hover:text-red-400 transition-colors p-1 cursor-pointer"
                              title="Remover carteira"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
