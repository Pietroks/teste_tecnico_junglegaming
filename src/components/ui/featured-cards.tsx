import { ArrowRight } from "lucide-react";
import img1 from "@/assets/img1.png";
import img3 from "@/assets/img3.png";

export default function FeaturedCards() {
  const cards = [
    {
      id: "1",
      title: "Lançamentos gênesis de edição limitada",
      description:
        "Colecione edições escassas diretamente dos criadores antes da revelação pública.",
      image: img1,
    },
    {
      id: "2",
      title: "Novos Criadores",
      description:
        "Conheça talentos emergentes da cena Web3 e apoie novas tendências antes que estourem no mercado.",
      image: img3,
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-[#241612] border rounded-[8px] flex flex-col sm:flex-row gap-6 shadow-2xl"
          >
            <div className="w-full sm:w-50 shrink-0 overflow-hidden bg-[#1E140F] rounded-[18px]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between h-full gap-3">
              <div className="flex flex-col my-auto p-6 gap-2 items-end">
                <h3 className="font-bold text-[18px] leading-6 text-end text-[#F5F1EB]">
                  {card.title}
                </h3>
                <p className="font-normal text-sm leading-6 text-end text-[#CFB28C]">
                  {card.description}
                </p>
                <button
                  type="button"
                  className="px-3 py-2 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] text-[#140D0A] font-medium text-sm leading-5 flex items-center justify-center cursor-pointer transition-colors duration-300"
                >
                  <span>Explorar</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
