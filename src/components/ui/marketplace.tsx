import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  COLLECTIONS,
  NETWORKS,
  NFT_ITEMS,
  SLIDER_THUMB_CLASSES,
} from "@/constants/marketplace";
import img2 from "@/assets/img2.png";

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("todos");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20);
  const [sortBy, setSortBy] = useState<
    "recentes" | "menor_preco" | "maior_preco"
  >("recentes");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [appliedPrice, setAppliedPrice] = useState<{
    min: number;
    max: number;
  }>({
    min: 0,
    max: 20,
  });

  const ITEMS_PER_PAGE = 9;

  const sortLabels = {
    recentes: "Listados recentemente",
    menor_preco: "Menor preço",
    maior_preco: "Maior preço",
  };

  const filteredItems = NFT_ITEMS.filter((item) => {
    if (selectedCollection && item.collection !== selectedCollection) {
      return false;
    }

    if (selectedNetwork && item.network !== selectedNetwork) {
      return false;
    }

    if (
      item.priceNumber < appliedPrice.min ||
      item.priceNumber > appliedPrice.max
    ) {
      return false;
    }

    if (activeTab === "novos" && !item.isNew) {
      return false;
    }

    if (activeTab === "em_alta" && !item.isTrending) {
      return false;
    }

    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "menor_preco") {
      return a.priceNumber - b.priceNumber;
    }
    if (sortBy === "maior_preco") {
      return b.priceNumber - a.priceNumber;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCollectionChange = (name: string | null) => {
    setSelectedCollection(name);
    setCurrentPage(1);
  };

  const handleNetworkChange = (name: string | null) => {
    setSelectedNetwork(name);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePriceApply = () => {
    setAppliedPrice({ min: minPrice, max: maxPrice });
    setCurrentPage(1);
  };

  return (
    <section className="w-full flex flex-col lg:flex-row gap-8 items-start">
      <aside>
        <div className="gap-10 p-5 text-[#F5F1EB] bg-[#241612] w-full lg:w-77.5 shrink-0 flex flex-col">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-[18px] leading-4 text-[#F5F1EB] mb-3">
              Coleções
            </span>
            <div className="flex flex-col gap-3 px-3">
              <button
                type="button"
                onClick={() => handleCollectionChange(null)}
                className={`w-full flex items-center justify-between font-normal rounded-[6px] text-[15px] leading-10 transition-all cursor-pointer ${
                  selectedCollection === null
                    ? "bg-[#1E140F] text-[#E89B55]"
                    : "text-[#CFB28C] hover:text-[#E89B55] hover:bg-[#1E140F]/50"
                }`}
              >
                <span>Todos</span>
                <span
                  className={`text-[15px] font-bold leading-10 ${
                    selectedCollection === null
                      ? "text-[#E89B55]"
                      : "text-[#CFB28C]/60"
                  }`}
                >
                  ({NFT_ITEMS.length})
                </span>
              </button>

              {COLLECTIONS.map((col) => {
                const isSelected = selectedCollection === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() =>
                      handleCollectionChange(isSelected ? null : col.name)
                    }
                    className={`w-full flex items-center justify-between font-normal rounded-[6px] text-[15px] leading-10 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1E140F] text-[#E89B55]"
                        : "text-[#CFB28C] hover:text-[#E89B55] hover:bg-[#1E140F]/50"
                    }`}
                  >
                    <span>{col.name}</span>
                    <span
                      className={`text-[15px] font-bold leading-10 ${
                        isSelected ? "text-[#E89B55]" : "text-[#CFB28C]/60"
                      }`}
                    >
                      ({col.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-[18px] leading-4 text-[#F5F1EB] mb-3">
              Faixa de Preço
            </span>
            <div className="flex flex-col gap-3">
              <div className="relative w-full h-5 flex items-center">
                <div className="absolute w-full h-1 bg-[#D28A4C] rounded-full" />
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={minPrice}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val <= maxPrice) setMinPrice(val);
                  }}
                  className={SLIDER_THUMB_CLASSES}
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.1"
                  value={maxPrice}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val >= minPrice) setMaxPrice(val);
                  }}
                  className={SLIDER_THUMB_CLASSES}
                />
              </div>
              <div className="flex items-center justify-start gap-3 text-[15px] leading-full text-[#F5F1EB]">
                <span>Preço:</span>
                <span>
                  {minPrice.toFixed(2)} - {maxPrice.toFixed(2)} ETH
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePriceApply}
              className="px-3 py-2 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-bold text-[16px] leading-5 flex items-center justify-center cursor-pointer transition-colors duration-300 self-start"
            >
              Aplicar
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-bold text-[18px] leading-4 text-[#F5F1EB] mb-3">
              Rede
            </span>
            <div className="flex flex-col gap-3 px-3">
              {NETWORKS.map((net) => {
                const isSelected = selectedNetwork === net.name;
                return (
                  <button
                    key={net.name}
                    type="button"
                    onClick={() =>
                      handleNetworkChange(isSelected ? null : net.name)
                    }
                    className={`w-full flex items-center justify-between font-normal rounded-[6px] text-[15px] leading-10 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1E140F] text-[#E89B55]"
                        : "text-[#CFB28C] hover:text-[#E89B55] hover:bg-[#1E140F]/50"
                    }`}
                  >
                    <span>{net.name}</span>
                    <span
                      className={`text-[15px] font-bold leading-10 ${isSelected ? "text-[#E89B55]" : "text-[#CFB28C]/60"}`}
                    >
                      ({net.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-[#241612] mt-6">
          <div>
            <div className="px-5 py-6 flex flex-col gap-4">
              <span className="font-bold text-2xl leading-8 text-[#E89B55]">
                NFT EM DESTAQUE
              </span>
              <p className="font-bold text-[22px] leading-4 text-center text-[#F5F1EB]">
                OFERTA LIMITADA
              </p>
            </div>
            <img
              src={img2}
              alt="NFT em destaque"
              className="rounded-[22px] object-cover overflow-hidden w-full lg:w-77.5 shrink-0 "
            />
          </div>
        </div>
      </aside>

      <div className="flex-1 w-full flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6.75">
          <div className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => handleTabChange("todos")}
              className={`pb-2 border-b-2 transition-all cursor-pointer font-medium text-[15px] leading-4 ${
                activeTab === "todos"
                  ? "border-[#D28A4C] text-[#E89B55]"
                  : "border-transparent text-[#F5F1EB] hover:text-[#E89B55]"
              }`}
            >
              Todos os NFTs
            </button>
            <button
              onClick={() => handleTabChange("novos")}
              className={`pb-2 border-b-2 transition-all cursor-pointer font-medium text-[15px] leading-4 ${
                activeTab === "novos"
                  ? "border-[#D28A4C] text-[#E89B55]"
                  : "border-transparent text-[#F5F1EB] hover:text-[#E89B55]"
              }`}
            >
              Novos lançamentos
            </button>
            <button
              onClick={() => handleTabChange("em_alta")}
              className={`pb-2 border-b-2 transition-all cursor-pointer font-medium text-[15px] leading-4 ${
                activeTab === "em_alta"
                  ? "border-[#D28A4C] text-[#E89B55]"
                  : "border-transparent text-[#F5F1EB] hover:text-[#E89B55]"
              }`}
            >
              Em alta
            </button>
          </div>

          <div className="relative flex items-center gap-2 text-[15px] leading-[100%] font-normal text-[#F5F1EB]">
            <span>Ordenar por:</span>
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] border border-[#D28A4C]/30 text-[#F5F1EB] hover:border-[#D28A4C] transition-colors cursor-pointer bg-[#1E140F]"
            >
              <span>{sortLabels[sortBy]}</span>
              <ChevronDown
                size={14}
                className={`text-[#D28A4C] transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#241612] border border-[#D28A4C]/30 rounded-[6px] shadow-xl z-20 overflow-hidden flex flex-col py-1">
                {(
                  Object.entries(sortLabels) as [
                    keyof typeof sortLabels,
                    string,
                  ][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSortBy(key);
                      setIsSortOpen(false);
                    }}
                    className={`px-3 py-2 text-left text-sm hover:bg-[#1E140F] transition-colors cursor-pointer ${
                      sortBy === key
                        ? "text-[#E89B55] font-bold"
                        : "text-[#F5F1EB]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((item) => (
            <Link
              key={item.id}
              to="/mercado"
              search={{ id: item.id }}
              className="flex flex-col gap-3 hover:border-[#D28A4C] hover:text-[#D28A4C] transition-all cursor-pointer group"
            >
              <div className="bg-[#241612] w-full aspect-square rounded-[15px] h-full flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-start gap-3 mb-3">
                  <span className="font-medium text-[16px] leading-4 text-[#F5F1EB]">
                    {item.name}
                  </span>
                  <span className="font-medium text-[16px] leading-4 text-[#F5F1EB]">
                    {item.number}
                  </span>
                </div>

                <span className="font-bold text-[18px] leading-4 text-[#D28A4C]">
                  {item.price}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2.5 mt-22">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8.75 h-8.75 rounded-lg font-bold text-[18px] leading-4 tracking-normal flex items-center justify-center transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#D28A4C] text-[#140D0A]"
                      : "bg-transparent border border-[#3F2319] text-[#F5F1EB] hover:border-[#D28A4C]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="w-8.75 h-8.75 rounded-lg font-bold text-[18px] leading-4 tracking-normal flex items-center justify-center transition-colors cursor-pointer bg-transparent border border-[#3F2319] text-[#F5F1EB] hover:border-[#D28A4C] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
