import logoImg from "@/assets/Logo.png";
import { Link } from "@tanstack/react-router";

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const DiscordIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  const features = [
    {
      letter: "W",
      title: "Segurança da carteira",
      subtitle:
        "Proteja sua carteira e colecione arte digital verificada com confiança.",
    },
    {
      letter: "C",
      title: "Criadores em destaque",
      subtitle:
        "Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.",
    },
    {
      letter: "D",
      title: "Alertas de lançamentos",
      subtitle:
        "Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.",
    },
  ];

  const profileLinks = [
    "Meu perfil",
    "Minha coleção",
    "Atividade",
    "Estúdio do criador",
    "Lista de interesse",
  ];
  const helpLinks = [
    "Central de ajuda",
    "Como comprar NFTs",
    "Carteira e segurança",
    "Política de mercado",
    "Denunciar item",
  ];
  const collectionLinks = [
    "Arte digital",
    "Fotografia",
    "Música",
    "Arte 3D",
    "Utilidade",
  ];
  const wallets = ["MetaMask", "WalletConnect", "Coinbase"];

  return (
    <footer className="w-full max-w-300 mx-auto mt-24 pb-12 flex flex-col">
      <div className="w-full bg-[#241612] pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-[#3F2319] pb-4 px-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start text-start gap-2 px-4 py-6 lg:py-0"
          >
            <div className="w-18.5 h-18.5 rounded-full bg-[#D28A4C] border border-[#3F2319] flex items-center justify-center text-[#140D0A] font-bold text-2xl shadow-lg">
              {item.letter}
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="font-bold text-[17px] text-[#F5F1EB] leading-4">
                {item.title}
              </h4>
              <p className="font-normal text-sm text-[#CFB28C] leading-5.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-center gap-3 px-6 py-6 lg:py-0">
          <h4 className="font-bold text-[18px] text-[#F5F1EB] leading-4">
            Antecipe-se ao próximo lançamento
          </h4>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center w-full"
          >
            <input
              type="email"
              placeholder="Digite seu e-mail..."
              className="flex-1 min-w-0 h-10 px-3 bg-[#38220F] border border-[#3F2319] rounded-l-[6px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-xs rounded-r-[6px] transition-colors cursor-pointer shrink-0"
            >
              Enviar
            </button>
          </form>

          <p className="font-normal text-[13px] leading-5.5 text-[#CFB28C]">
            Receba lançamentos selecionados, histórias de criadores e novidades
            do mercado.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#38220F] p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-2.5">
        <div className="flex items-center">
          <img
            src={logoImg}
            alt="Logo"
            className="w-40 h-[34.3px] object-contain"
          />
        </div>
        <div className="flex items-center">
          <p className="font-normal text-sm text-[#F5F1EB] leading-5.5">
            Feito para colecionadores, criadores e cultura
          </p>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="mailto:contato@kurio.com"
            className="font-normal text-sm text-[#F5F1EB] leading-5.5 hover:text-[#E89B55] transition-colors"
          >
            contato@kurio.com
          </a>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="tel:+551199999999"
            className="font-normal text-sm text-[#F5F1EB] leading-5.5 hover:text-[#E89B55] transition-colors"
          >
            +55 11 4002 8922
          </a>
        </div>
      </div>

      <div className="w-full py-8 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-[#241612]">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-[16px] text-[#F5F1EB]">Meu perfil</h4>
          <nav className="flex flex-col gap-2.5">
            {profileLinks.map((link) =>
              link === "Meu perfil" ? (
                <Link
                  key={link}
                  to="/perfil"
                  className="text-sm font-normal text-[#F5F1EB] hover:text-[#E89B55] transition-colors"
                >
                  {link}
                </Link>
              ) : (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-normal text-[#F5F1EB] hover:text-[#E89B55] transition-colors"
                >
                  {link}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-[16px] text-[#F5F1EB]">
            Central de Ajuda
          </h4>
          <nav className="flex flex-col gap-2.5">
            {helpLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-normal text-[#F5F1EB] hover:text-[#E89B55] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <h4 className="font-bold text-[16px] text-[#F5F1EB]">Coleções</h4>
          <nav className="flex flex-col gap-2.5">
            {collectionLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-normal text-[#F5F1EB] hover:text-[#E89B55] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[16px] text-[#F5F1EB]">
              Redes Sociais
            </h4>
            <div className="flex items-center gap-3">
              {[TwitterIcon, InstagramIcon, DiscordIcon, YoutubeIcon].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded bg-[#1E140F] border border-[#3F2319] flex items-center justify-center text-[#CFB28C] hover:text-[#E89B55] hover:border-[#D28A4C] transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center">
            <h4 className="font-bold text-[14px] text-[#F5F1EB]">
              Carteiras compatíveis
            </h4>
            <div className="w-57 h-6.5 px-2 flex items-center justify-center gap-2.5 border border-[#3F2319] rounded-[6px] bg-[#38220F]">
              {wallets.map((wallet, index) => (
                <div key={wallet} className="flex items-center gap-2.5">
                  <span className="font-bold text-[9px] leading-none tracking-[0.1px] text-[#F5F1EB]">
                    {wallet}
                  </span>
                  {index < wallets.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-[#D28A4C] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="w-full text-sm leading-7 text-center text-[#F5F1EB] mt-3">
        © 2026 Kurio. Propriedade digital para todos.
      </p>
    </footer>
  );
}
