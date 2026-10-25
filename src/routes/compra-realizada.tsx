import { createFileRoute, Link } from "@tanstack/react-router";
import thankYouImg from "@/assets/thanckyou.png";
import { NFT_ITEMS } from "@/constants/marketplace";

export const Route = createFileRoute("/compra-realizada")({
  component: CompraRealizadaComponent,
});

interface PurchasedItem {
  id: string;
  name: string;
  number: string;
  price: string;
  priceNumber: number;
  image: string;
  quantity: number;
}

function CompraRealizadaComponent() {
  let purchasedItems: PurchasedItem[] = [];

  try {
    const saved = localStorage.getItem("kurio_last_order");
    if (saved) {
      purchasedItems = JSON.parse(saved);
    }
  } catch {
    // ignore
  }

  if (purchasedItems.length === 0) {
    purchasedItems = [
      {
        id: NFT_ITEMS[0].id,
        name: NFT_ITEMS[0].name,
        number: NFT_ITEMS[0].number,
        price: NFT_ITEMS[0].price,
        priceNumber: NFT_ITEMS[0].priceNumber,
        image: NFT_ITEMS[0].image,
        quantity: 1,
      },
      {
        id: NFT_ITEMS[1].id,
        name: NFT_ITEMS[1].name,
        number: NFT_ITEMS[1].number,
        price: NFT_ITEMS[1].price,
        priceNumber: NFT_ITEMS[1].priceNumber,
        image: NFT_ITEMS[1].image,
        quantity: 2,
      },
    ];
  }

  const subtotal = purchasedItems.reduce(
    (acc, item) => acc + item.priceNumber * item.quantity,
    0,
  );
  const networkFee = 0.008;
  const total = subtotal + networkFee;

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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
        <span className="text-[#D28A4C] font-semibold">Compra realizada</span>
      </nav>

      <div className="w-full flex justify-center py-4">
        <div className="w-full max-w-144.5 bg-[#241612] rounded-xl border border-[#3F2319] overflow-hidden flex flex-col shadow-2xl">
          <div className="flex flex-col items-center pt-8 pb-5 px-8 gap-4">
            <img
              src={thankYouImg}
              alt="Thank you"
              className="w-16 h-16 object-contain"
            />
            <h2 className="font-bold text-[16px] leading-4 text-center text-[#F5F1EB]">
              seus nfts agora estao na sua carteira
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#3F2319] py-3.5 border-y border-[#3F2319] text-center bg-[#1E140F]/60">
            <div className="flex flex-col gap-1 px-1">
              <span className="text-[11px] font-normal text-[#CFB28C]">
                ID de transação
              </span>
              <span className="font-bold text-[12px] text-[#F5F1EB] truncate">
                #0x8F4...2B9
              </span>
            </div>

            <div className="flex flex-col gap-1 px-1">
              <span className="text-[11px] font-normal text-[#CFB28C]">
                Data
              </span>
              <span className="font-bold text-[12px] text-[#F5F1EB]">
                {today}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-1">
              <span className="text-[11px] font-normal text-[#CFB28C]">
                Total
              </span>
              <span className="font-bold text-[12px] text-[#D28A4C]">
                {total.toFixed(3)} ETH
              </span>
            </div>

            <div className="flex flex-col gap-1 px-1">
              <span className="text-[11px] font-normal text-[#CFB28C]">
                Carteira
              </span>
              <span className="font-bold text-[12px] text-[#F5F1EB]">
                MetaMask
              </span>
            </div>
          </div>

          <div className="flex flex-col p-6 gap-4">
            <h3 className="font-bold text-[16px] text-[#F5F1EB]">
              Detalhes da transação
            </h3>

            <div className="flex items-center justify-between font-bold text-xs text-[#F5F1EB] border-b border-[#3F2319] pb-2">
              <span className="w-1/2">NFTs</span>
              <span className="w-1/4 text-center">Edições</span>
              <span className="w-1/4 text-right">Subtotal</span>
            </div>

            <div className="flex flex-col gap-3">
              {purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-1.5"
                >
                  <div className="flex items-center gap-3 w-1/2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-[6px] object-cover shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#F5F1EB] leading-tight">
                        {item.name}
                      </span>
                      <span className="font-normal text-xs text-[#CFB28C]">
                        {item.number}
                      </span>
                    </div>
                  </div>

                  <span className="w-1/4 text-center text-xs font-semibold text-[#CFB28C]">
                    {item.quantity}x
                  </span>

                  <span className="w-1/4 text-right font-bold text-sm text-[#D28A4C]">
                    {(item.priceNumber * item.quantity).toFixed(2)} ETH
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#3F2319]">
              <div className="w-56 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-[#CFB28C]">
                  <span>Taxa da rede</span>
                  <span className="font-bold text-[#F5F1EB]">
                    {networkFee.toFixed(3)} ETH
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#3F2319]">
                  <span className="font-bold text-[#F5F1EB]">Total</span>
                  <span className="font-bold text-base text-[#D28A4C]">
                    {total.toFixed(3)} ETH
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 pb-2 border-t border-[#3F2319]">
              <p className="font-normal text-[14px] leading-5.5 text-center text-[#CFB28C]">
                Transação confirmada na Ethereum. A propriedade foi transferida
                para sua carteira conectada e registrada na rede.
              </p>
            </div>

            <div className="flex justify-center pt-2 pb-2">
              <a
                href="https://etherscan.io"
                target="_blank"
                rel="noreferrer"
                className="h-10 px-8 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                Ver no Etherscan
              </a>
            </div>
          </div>

          <div className="w-full h-2.5 bg-[#D28A4C]" />
        </div>
      </div>
    </div>
  );
}
