import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { NFT_ITEMS, type NFTItem } from "@/constants/marketplace";
import { useCart } from "@/context/cart-context";

export const Route = createFileRoute("/finalizar-compra")({
  component: FinalizarCompraComponent,
});

function FinalizarCompraComponent() {
  const { items: cartItems, updateQuantity, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [carouselPage, setCarouselPage] = useState(0);

  const handleQuantityChange = (id: string, delta: number) => {
    updateQuantity(id, delta);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.priceNumber * item.quantity,
    0,
  );
  const networkFee = cartItems.length > 0 ? 0.008 : 0;
  const total = cartItems.length > 0 ? subtotal + networkFee : 0;

  const carouselItems: NFTItem[] = NFT_ITEMS.slice(3, 18);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(carouselItems.length / itemsPerPage);
  const currentCarouselItems = carouselItems.slice(
    carouselPage * itemsPerPage,
    carouselPage * itemsPerPage + itemsPerPage,
  );

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
        <span className="text-[#D28A4C] font-semibold">Finalizar compra</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[782px_1fr] gap-8 items-start w-full">
        <div className="w-full lg:w-[782px] overflow-x-auto pb-2">
          <div className="min-w-[640px] flex flex-col gap-3">
            <div className="w-full flex items-center justify-between pr-6 font-bold text-[16px] leading-4 text-[#F5F1EB] px-2 pb-1">
              <span className="w-75">NFTs</span>
              <span className="w-25 text-center">Preço</span>
              <span className="w-30 text-center">Edições</span>
              <span className="w-25 text-center">Total</span>
              <span className="w-6"></span>
            </div>

            {cartItems.length > 0 ? (
              <div className="flex flex-col gap-3 min-h-58.5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full lg:w-195.75 h-17.5 bg-[#241612] rounded-[6px] flex items-center justify-between pr-6 overflow-hidden"
                >
                  <div className="flex items-center gap-4 w-75">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-17.5 h-17.5 rounded-[6px] object-cover shrink-0"
                    />
                    <div className="flex flex-col justify-center gap-1">
                      <span className="font-bold text-[16px] leading-4 text-[#F5F1EB]">
                        {item.name}
                      </span>
                      <span className="font-normal text-[14px] leading-4 text-[#CFB28C]">
                        {item.number}
                      </span>
                    </div>
                  </div>

                  <div className="w-25 text-center">
                    <span className="font-bold text-[16px] leading-4 text-[#F5F1EB]">
                      {item.price}
                    </span>
                  </div>

                  <div className="w-30 flex items-center justify-center">
                    <div className="flex items-center border border-[#3F2319] rounded-[6px] bg-[#1E140F]">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#F5F1EB]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="w-25 text-center">
                    <span className="font-bold text-[16px] leading-4 text-[#D28A4C]">
                      {(item.priceNumber * item.quantity).toFixed(2)} ETH
                    </span>
                  </div>

                  <div className="w-6 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-6 h-6 flex items-center justify-center text-[#CFB28C] hover:text-red-400 transition-colors cursor-pointer"
                      title="Remover item"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full lg:w-195.5 h-58.5 bg-[#241612] rounded-[6px] flex flex-col items-center justify-center gap-4 text-[#CFB28C]">
              <span>Seu carrinho está vazio</span>
              <Link
                to="/mercado"
                className="px-4 py-2 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-xs transition-colors"
              >
                Explorar Mercado
              </Link>
            </div>
          )}
        </div>
      </div>

        <div className="w-full bg-[#241612] p-6 rounded-xl border border-[#3F2319] flex flex-col gap-6">
          <div className="border-b border-[#3F2319] pb-3">
            <h3 className="font-bold text-lg text-[#F5F1EB]">
              Resumo da carteira
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm text-[#F5F1EB]">
              Código promocional
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleApplyCoupon();
              }}
              className="flex items-center w-full"
            >
              <input
                type="text"
                placeholder="Digite seu código..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 min-w-0 h-10 px-3 bg-[#38220F] border border-[#3F2319] rounded-l-[6px] text-xs text-[#F5F1EB] placeholder:text-[#B39463]/50 outline-none focus:border-[#D28A4C] transition-colors uppercase"
              />
              <button
                type="submit"
                className="h-10 px-4 bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-xs rounded-r-[6px] transition-colors cursor-pointer shrink-0"
              >
                Aplicar
              </button>
            </form>
            {couponApplied && (
              <span className="text-xs text-[#4ADE80]">
                Cupom promocional aplicado com sucesso!
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between text-sm text-[#CFB28C]">
              <span>Subtotal da compra</span>
              <span className="font-bold text-[#F5F1EB]">
                {subtotal.toFixed(2)} ETH
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-[#CFB28C]">
              <span>Taxa de lançamento</span>
              <span className="font-bold text-[#F5F1EB]">(-) 00.00</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-sm text-[#CFB28C]">
                <span>Taxa de rede</span>
                <span className="font-bold text-[#F5F1EB]">
                  {networkFee.toFixed(3)} ETH
                </span>
              </div>
              <span className="text-[10px] text-[#D28A4C] leading-tight">
                Taxa estimada
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#3F2319]">
              <span className="font-bold text-base text-[#F5F1EB]">
                Total da compra
              </span>
              <span className="font-bold text-xl text-[#D28A4C]">
                {total.toFixed(3)} ETH
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/confirmar-compra"
              className="w-full h-11 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              Conectar e finalizar
            </Link>
            <Link
              to="/mercado"
              className="w-full h-11 rounded-[6px] border border-[#3F2319] hover:border-[#D28A4C] bg-[#1E140F] text-[#F5F1EB] hover:text-[#E89B55] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              Continuar explorando
            </Link>
          </div>
        </div>
      </div>

      <section className="pt-24 flex flex-col gap-6 w-full">
        <div className="w-full border-b border-[#3F2319] pb-3">
          <h3 className="font-bold text-2xl text-[#E89B55]">
            Colecionadores também viram
          </h3>
        </div>

        <div className="w-full max-w-300 min-h-75.75 flex items-center justify-between gap-4 overflow-x-auto lg:overflow-visible py-2">
          {currentCarouselItems.map((colItem) => (
            <Link
              key={colItem.id}
              to="/mercado"
              search={{ id: colItem.id }}
              className="w-55 h-63.75 flex flex-col justify-between shrink-0 group cursor-pointer transition-transform hover:-translate-y-1"
            >
              <div className="w-53 h-53 rounded-[13px] overflow-hidden bg-[#241612] mx-auto">
                <img
                  src={colItem.image}
                  alt={colItem.name}
                  className="w-53 h-53 rounded-[13px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col gap-1.5 px-1">
                <div className="flex items-center justify-between font-normal text-[15px] leading-none text-[#F5F1EB]">
                  <span className="truncate">{colItem.name}</span>
                  <span className="shrink-0">{colItem.number}</span>
                </div>

                <span className="font-bold text-[16px] leading-4 text-[#D28A4C]">
                  {colItem.price}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 pt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCarouselPage(idx)}
              className={`rounded-full transition-all cursor-pointer ${
                carouselPage === idx
                  ? "w-2.5 h-2.5 bg-[#D28A4C] scale-110"
                  : "w-2 h-2 bg-[#D28A4C]/40 hover:bg-[#D28A4C]/70"
              }`}
              aria-label={`Página ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
