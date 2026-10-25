import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/cart-context";

export const Route = createFileRoute("/confirmar-compra")({
  component: ConfirmarCompraComponent,
});

function ConfirmarCompraComponent() {
  const { items: cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [useAnotherWallet, setUseAnotherWallet] = useState(false);
  const [selectedWalletOption, setSelectedWalletOption] =
    useState<string>("all");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.priceNumber * item.quantity,
    0,
  );
  const networkFee = cartItems.length > 0 ? 0.008 : 0;
  const total = cartItems.length > 0 ? subtotal + networkFee : 0;

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("kurio_last_order", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
    clearCart();
    navigate({ to: "/compra-realizada" });
  };

  return (
    <div className="w-full flex flex-col gap-8 text-[#F5F1EB]">
      <nav className="flex items-center gap-2 text-xs font-normal text-[#CFB28C]">
        <Link to="/" className="hover:text-[#E89B55] transition-colors">
          Início
        </Link>
        <span>/</span>
        <Link to="/mercado" className="hover:text-[#E89B55] transition-colors">
          Mercado
        </Link>
        <span>/</span>
        <Link
          to="/finalizar-compra"
          className="hover:text-[#E89B55] transition-colors"
        >
          Finalizar compra
        </Link>
        <span>/</span>
        <span className="text-[#D28A4C] font-semibold">
          Perfil do colecionador
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[763px_1fr] gap-8 items-start w-full">
        <div className="w-full lg:w-190.75 flex flex-col">
          <h2 className="font-bold text-2xl text-[#F5F1EB] mb-6">
            Perfil do colecionador
          </h2>

          <form
            id="collector-profile-form"
            onSubmit={handleConfirmPurchase}
            className="w-full lg:w-190.74 flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-between">
              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Nome de exibição{" "}
                  <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  required
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Nome de usuário{" "}
                  <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-between">
              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Rede <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <select
                  name="network"
                  required
                  defaultValue=""
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    Selecione a rede...
                  </option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Solana">Solana</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Nome do perfil{" "}
                  <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="profileName"
                  required
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-6 w-full justify-between">
              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Endereço da carteira{" "}
                  <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  required
                  placeholder="Endereço 0x da carteira"
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <input
                  type="text"
                  name="secondaryWallet"
                  placeholder="ENS ou carteira secundária (opcional)"
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-between">
              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Tipo de carteira{" "}
                  <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <select
                  name="walletType"
                  required
                  defaultValue=""
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    Selecione o tipo...
                  </option>
                  <option value="MetaMask">MetaMask</option>
                  <option value="Coinbase Wallet">Coinbase Wallet</option>
                  <option value="WalletConnect">WalletConnect</option>
                  <option value="Phantom">Phantom</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Código de indicação{" "}
                  <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="referralCode"
                  required
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-between">
              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  E-mail <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 w-full sm:flex-1">
                <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                  Nome ENS <span className="text-[#EF4444] font-bold">*</span>
                </label>
                <select
                  name="ensName"
                  required
                  defaultValue=""
                  className="w-full h-10 px-3 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] outline-none focus:border-[#D28A4C] transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    Selecione o domínio ENS...
                  </option>
                  <option value="colecionador.eth">colecionador.eth</option>
                  <option value="arte.eth">arte.eth</option>
                  <option value="kurio.eth">kurio.eth</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={useAnotherWallet}
                onChange={(e) => setUseAnotherWallet(e.target.checked)}
                className="w-4 h-4 rounded-full border border-[#3F2319] accent-[#D28A4C] cursor-pointer"
              />
              <span className="font-normal text-3.75 leading-3.75 text-[#F5F1EB] flex items-center gap-1.5">
                Usar outra carteira?
                <span className="w-4 h-4 rounded-full bg-[#3F2319] text-[#CFB28C] text-[10px] font-bold flex items-center justify-center cursor-help">
                  ?
                </span>
              </span>
            </label>

            <div className="flex flex-col gap-2 w-full">
              <label className="font-normal text-3.75 leading-3.75 text-[#F5F1EB]">
                Observação do colecionador (opcional)
              </label>
              <textarea
                placeholder="Escreva uma observação para a transação..."
                rows={3}
                className="w-full px-3 py-2 bg-[#241612] border border-[#3F2319] rounded-[3px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors resize-none"
              />
            </div>
          </form>
        </div>

        <div className="w-full flex flex-col">
          <h2 className="font-bold text-2xl text-[#F5F1EB] mb-6">Seus NFTs</h2>

          <div className="w-full bg-[#241612] p-6 rounded-xl border border-[#3F2319] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3F2319] font-bold text-sm text-[#F5F1EB]">
              <span>NFTs</span>
              <span>Subtotal</span>
            </div>

            <div className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full h-17.5 bg-[#1E140F] rounded-[6px] border border-[#3F2319]/60 flex items-center justify-between pr-4 overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-17.5 h-17.5 rounded-[6px] object-cover shrink-0"
                    />
                    <div className="flex flex-col justify-center gap-0.5">
                      <span className="font-bold text-3.75 leading-tight text-[#F5F1EB]">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-normal text-xs text-[#CFB28C]">
                          {item.number}
                        </span>
                        <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-[#38220F] text-[#D28A4C]">
                          {item.quantity}x
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="font-bold text-3.75 text-[#D28A4C]">
                    {(item.priceNumber * item.quantity).toFixed(2)} ETH
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center py-1">
              <button
                type="button"
                className="text-xs text-[#CFB28C] hover:text-[#E89B55] transition-colors cursor-pointer"
              >
                Tem um código promocional?{" "}
                <span className="text-[#D28A4C] font-semibold underline">
                  Aplique aqui
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#3F2319]">
              <div className="flex items-center justify-between text-sm text-[#CFB28C]">
                <span>Subtotal</span>
                <span className="font-bold text-[#F5F1EB]">
                  {subtotal.toFixed(2)} ETH
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#CFB28C]">
                <span>Desconto lançamento</span>
                <span className="font-bold text-[#F5F1EB]">(-) 00.00</span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#CFB28C]">
                <span>Taxa da rede</span>
                <span className="font-bold text-[#F5F1EB]">
                  {networkFee.toFixed(3)} ETH
                </span>
              </div>

              <div className="text-center pb-2 border-b border-[#3F2319]">
                <span className="text-[10px] text-[#D28A4C]">
                  Taxa estimada
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="font-bold text-base text-[#F5F1EB]">
                  Total
                </span>
                <span className="font-bold text-xl text-[#D28A4C]">
                  {total.toFixed(3)} ETH
                </span>
              </div>
            </div>

            <div className="text-center font-bold text-sm text-[#F5F1EB] pt-2 pb-2 border-b border-[#3F2319]">
              Carteira e rede
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-[#3F2319]">
              <input
                type="radio"
                name="wallet_option"
                id="all_wallets"
                checked={selectedWalletOption === "all"}
                onChange={() => setSelectedWalletOption("all")}
                className="w-4 h-4 rounded-full accent-[#D28A4C] cursor-pointer"
              />
              <label htmlFor="all_wallets" className="cursor-pointer">
                <div className="w-57 h-6.5 px-2 flex items-center justify-center gap-2.5 border border-[#3F2319] rounded-[6px] bg-[#38220F]">
                  {["MetaMask", "WalletConnect", "Coinbase"].map(
                    (wallet, index) => (
                      <div key={wallet} className="flex items-center gap-2.5">
                        <span className="font-bold text-[9px] leading-none tracking-[0.1px] text-[#F5F1EB]">
                          {wallet}
                        </span>
                        {index < 2 && (
                          <span className="w-1 h-1 rounded-full bg-[#D28A4C] shrink-0" />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-[#3F2319]">
              <input
                type="radio"
                name="wallet_option"
                id="wallet_metamask"
                checked={selectedWalletOption === "metamask"}
                onChange={() => setSelectedWalletOption("metamask")}
                className="w-4 h-4 rounded-full accent-[#D28A4C] cursor-pointer"
              />
              <label
                htmlFor="wallet_metamask"
                className="text-sm font-normal text-[#F5F1EB] cursor-pointer"
              >
                MetaMask
              </label>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-[#3F2319]">
              <input
                type="radio"
                name="wallet_option"
                id="wallet_coinbase"
                checked={selectedWalletOption === "coinbase"}
                onChange={() => setSelectedWalletOption("coinbase")}
                className="w-4 h-4 rounded-full accent-[#D28A4C] cursor-pointer"
              />
              <label
                htmlFor="wallet_coinbase"
                className="text-sm font-normal text-[#F5F1EB] cursor-pointer"
              >
                Coinbase Wallet
              </label>
            </div>

            <button
              type="submit"
              form="collector-profile-form"
              className="w-full h-11 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer mt-2"
            >
              Confirmar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
