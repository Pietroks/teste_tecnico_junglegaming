import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Heart, Mail, Minus, Plus } from "lucide-react";
import { NFT_ITEMS } from "@/constants/marketplace";
import { useCart } from "@/context/cart-context";

interface MercadoSearchParams {
  id?: string;
}

export const Route = createFileRoute("/mercado")({
  validateSearch: (search: Record<string, unknown>): MercadoSearchParams => {
    return {
      id: typeof search.id === "string" ? search.id : undefined,
    };
  },
  component: MercadoComponent,
});

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XTwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const mockReviews = [
  {
    id: 1,
    author: "CryptoVanguard",
    wallet: "0x89A...431B",
    rating: 5,
    date: "12 de Abril, 2026",
    comment:
      "Acabamento visual impressionante na visualização 3D. A confirmação de transação na rede foi imediata e os metadados no IPFS estão impecáveis.",
  },
  {
    id: 2,
    author: "Elena Rostova",
    wallet: "0x3F2...718C",
    rating: 5,
    date: "8 de Abril, 2026",
    comment:
      "Uma das melhores peças desta coleção. A textura das cores e a raridade dos atributos superaram minhas expectativas para exibição na minha galeria privada.",
  },
  {
    id: 3,
    author: "Lucas_NFT",
    wallet: "0x12D...99E4",
    rating: 5,
    date: "28 de Março, 2026",
    comment:
      "Autenticidade garantida por contrato inteligente. Contrato transparente com royalties corretos para o criador original. Vale cada fração de ETH.",
  },
  {
    id: 4,
    author: "SatoshiVault",
    wallet: "0x54C...88A1",
    rating: 5,
    date: "15 de Março, 2026",
    comment:
      "Obra digital rara e marcante. Design futurista e comunidade do artista extremamente ativa no Discord.",
  },
];

function MercadoComponent() {
  const { addItem } = useCart();
  const { id } = Route.useSearch();
  const item = NFT_ITEMS.find((n) => n.id === id) || NFT_ITEMS[0];

  const productImages = [item.image, item.image, item.image, item.image];
  const [selectedImage, setSelectedImage] = useState(item.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedEdition, setSelectedEdition] = useState("1/1");
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<"detalhes" | "avaliacoes">(
    "detalhes",
  );
  const [carouselPage, setCarouselPage] = useState(0);

  useEffect(() => {
    setSelectedImage(item.image);
    setCarouselPage(0);
  }, [item.image]);

  const collectionItems = [
    ...NFT_ITEMS.filter(
      (n) => n.collection === item.collection && n.id !== item.id,
    ),
    ...NFT_ITEMS.filter(
      (n) => n.collection !== item.collection && n.id !== item.id,
    ),
  ];

  const itemsPerPage = 5;
  const totalPages = Math.min(
    3,
    Math.ceil(collectionItems.length / itemsPerPage),
  );
  const currentCarouselItems = collectionItems.slice(
    carouselPage * itemsPerPage,
    carouselPage * itemsPerPage + itemsPerPage,
  );

  const editions = ["1/1", "1/10", "1/50", "Aberta"];

  return (
    <div className="w-full flex flex-col gap-8 text-[#F5F1EB]">
      <nav className="flex items-center gap-2 text-xs font-normal text-[#CFB28C]">
        <Link to="/" className="hover:text-[#E89B55] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#F5F1EB]">Mercado</span>
        <span>/</span>
        <span className="text-[#D28A4C] font-semibold">
          {item.name} {item.number}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 shrink-0">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 rounded-[10px] overflow-hidden border-2 transition-all cursor-pointer bg-[#241612] ${
                  selectedImage === img
                    ? "border-[#D28A4C] scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-[#3F2319]"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 aspect-square rounded-3xl overflow-hidden bg-[#241612] border border-[#3F2319]">
            <img
              src={selectedImage}
              alt={item.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl sm:text-3xl text-[#F5F1EB]">
              {item.name} {item.number}
            </h1>
            <span className="px-2.5 py-1 rounded-[6px] bg-[#241612] border border-[#3F2319] text-xs font-semibold text-[#D28A4C]">
              5 Disponíveis
            </span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-[#3F2319]">
            <span className="font-bold text-3xl text-[#D28A4C]">
              {item.price}
            </span>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#E89B55]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-[#CFB28C]">
                (19 avaliações de colecionadores)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-[16px] text-[#F5F1EB]">
              Sobre este NFT
            </span>
            <p className="font-normal text-sm leading-6 text-[#CFB28C]">
              {item.name} faz parte da aclamada série de avatares gerados em
              alta resolução na rede {item.network}. Uma união perfeita entre
              estética cyberpunk e geometria fractal com raridade comprovada.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-[16px] text-[#F5F1EB]">Edição</span>
            <div className="flex items-center gap-3">
              {editions.map((edition) => (
                <button
                  key={edition}
                  type="button"
                  onClick={() => setSelectedEdition(edition)}
                  className={`px-4 py-1.5 rounded-[6px] text-xs font-bold transition-all cursor-pointer ${
                    selectedEdition === edition
                      ? "bg-[#D28A4C] text-[#140D0A]"
                      : "bg-[#241612] border border-[#3F2319] text-[#F5F1EB] hover:border-[#D28A4C]"
                  }`}
                >
                  {edition}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center border border-[#3F2319] rounded-[6px] bg-[#1E140F]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#F5F1EB]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-[#CFB28C] hover:text-[#F5F1EB] transition-colors cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsFavorited((prev) => !prev)}
                className={`h-10 px-4 rounded-[6px] border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isFavorited
                    ? "border-[#D28A4C] bg-[#D28A4C]/10 text-[#D28A4C]"
                    : "border-[#3F2319] bg-[#241612] text-[#CFB28C] hover:text-[#E89B55] hover:border-[#D28A4C]"
                }`}
              >
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                <span>Favoritar</span>
              </button>

              <Link
                to="/finalizar-compra"
                onClick={() => {
                  addItem(
                    {
                      id: item.id,
                      name: item.name,
                      number: item.number,
                      price: item.price,
                      priceNumber: item.priceNumber,
                      image: item.image,
                    },
                    quantity,
                  );
                }}
                className="h-10 px-6 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                Comprar
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-[#3F2319] text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#CFB28C]">ID do Token:</span>
              <span className="font-mono text-[#F5F1EB]">{item.number}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#CFB28C]">Coleção:</span>
              <span className="text-[#E89B55] font-semibold">
                {item.collection}
              </span>
            </div>
          </div>

          <div className="text-xs text-[#CFB28C]">
            <span className="font-bold text-[#F5F1EB]">Atributos: </span>
            <span>{item.attributes.join(", ")}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#CFB28C]">
              Compartilhar este NFT:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#241612] border border-[#3F2319] flex items-center justify-center text-[#CFB28C] hover:text-[#E89B55] hover:border-[#D28A4C] transition-all"
              >
                <LinkedInIcon size={14} />
              </a>
              <a
                href="mailto:?subject=Confira esse NFT"
                className="w-8 h-8 rounded-full bg-[#241612] border border-[#3F2319] flex items-center justify-center text-[#CFB28C] hover:text-[#E89B55] hover:border-[#D28A4C] transition-all"
              >
                <Mail size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#241612] border border-[#3F2319] flex items-center justify-center text-[#CFB28C] hover:text-[#E89B55] hover:border-[#D28A4C] transition-all"
              >
                <XTwitterIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-24 flex flex-col gap-8 w-full">
        <div className="flex items-center gap-8 border-b border-[#3F2319] w-full">
          <button
            type="button"
            onClick={() => setActiveInfoTab("detalhes")}
            className={`text-base pb-3 -mb-px transition-all cursor-pointer ${
              activeInfoTab === "detalhes"
                ? "font-bold text-[#E89B55] border-b-2 border-[#D28A4C]"
                : "font-normal text-[#F5F1EB] border-b-2 border-transparent hover:text-[#E89B55] hover:border-[#E89B55]/50"
            }`}
          >
            Detalhes do NFT
          </button>
          <button
            type="button"
            onClick={() => setActiveInfoTab("avaliacoes")}
            className={`text-base pb-3 -mb-px transition-all cursor-pointer ${
              activeInfoTab === "avaliacoes"
                ? "font-bold text-[#E89B55] border-b-2 border-[#D28A4C]"
                : "font-normal text-[#F5F1EB] border-b-2 border-transparent hover:text-[#E89B55] hover:border-[#E89B55]/50"
            }`}
          >
            Avaliações de colecionadores (19)
          </button>
        </div>

        {activeInfoTab === "detalhes" ? (
          <div className="flex flex-col gap-6 max-w-4xl">
            <p className="font-normal text-sm leading-6 text-[#CFB28C]">
              {item.details ||
                `${item.name} é uma obra digital única e verificada, cunhada na coleção ${item.collection}. Composta por elementos visuais gerados com precisão matemática e iluminação volumétrica, representa um marco na convergência entre arte contemporânea e imutabilidade criptográfica.`}
            </p>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-base text-[#F5F1EB]">Rede</span>
              <p className="font-normal text-sm leading-6 text-[#CFB28C]">
                Cunhado na blockchain {item.network}. Opera sob o padrão{" "}
                {item.network === "Solana" ? "SPL Token / Metaplex" : "ERC-721"}
                , com validação Proof-of-Stake para transações de alta
                velocidade, taxas otimizadas e registro permanente de
                proveniência com metadados armazenados de forma descentralizada
                no IPFS e Arweave.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-base text-[#F5F1EB]">
                Contrato
              </span>
              <p className="font-normal text-sm leading-6 text-[#CFB28C]">
                Endereço do contrato inteligente auditado: 0x71C...b49F (Padrão{" "}
                {item.network === "Solana" ? "Metaplex Program ID" : "ERC-721"}
                ). O contrato é 100% imutável, verificado diretamente no
                explorador da rede e assegura a custódia descentralizada sem
                intermediários.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-base text-[#F5F1EB]">
                Direitos Autorais
              </span>
              <p className="font-normal text-sm leading-6 text-[#CFB28C]">
                Todos os direitos patrimoniais e morais de criação pertencem
                exclusivamente ao artista original. A aquisição deste NFT
                concede ao titular licença perpétua para posse, exibição digital
                pessoal e revenda no mercado secundário, assegurando royalties
                automáticos de 5% destinados ao autor da obra em cada transação.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-4xl">
            <div className="flex items-center gap-4 p-4 rounded-[10px] bg-[#241612] border border-[#3F2319]">
              <div className="flex items-center text-[#E89B55]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#F5F1EB]">5.0 de 5</span>
              <span className="text-xs text-[#CFB28C]">
                Baseado em 19 avaliações de colecionadores verificados
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {mockReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex flex-col gap-3 p-5 rounded-xl bg-[#1E140F] border border-[#3F2319]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#D28A4C] text-[#140D0A] font-bold text-sm flex items-center justify-center">
                        {rev.author[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#F5F1EB]">
                          {rev.author}
                        </span>
                        <span className="text-xs text-[#CFB28C]/70 font-mono">
                          {rev.wallet}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-[#E89B55]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs text-[#CFB28C]">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#CFB28C] leading-6">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="pt-24 flex flex-col gap-6 w-full">
        <div className="w-full border-b border-[#3F2319] pb-3">
          <h3 className="font-bold text-2xl text-[#E89B55]">
            Mais desta coleção
          </h3>
        </div>

        <div className="w-full max-w-300 min-h-75.75 flex items-center justify-between gap-4 overflow-x-auto lg:overflow-visible py-2">
          {currentCarouselItems.map((colItem) => (
            <Link
              key={colItem.id}
              to="/mercado"
              search={{ id: colItem.id }}
              className="w-55 h-75.75 flex flex-col justify-between shrink-0 group cursor-pointer transition-transform hover:-translate-y-1"
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
