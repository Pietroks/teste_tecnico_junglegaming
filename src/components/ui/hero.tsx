import { useState } from "react";
import { Link } from "@tanstack/react-router";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img3 from "@/assets/img3.png";

const slides = [
  { id: 1, src: img1, alt: "Destaque Kurio 1" },
  { id: 2, src: img2, alt: "Destaque Kurio 2" },
  { id: 3, src: img3, alt: "Destaque Kurio 3" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col gap-11 max-w-150">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-[#F5F1EB] leading-4 tracking-widest">
                Bem-vindo à Kurio
              </span>
              <h1 className="font-bold text-4xl lg:text-[43px] leading-tight lg:leading-[1.2] text-[#F5F1EB]">
                SEJA DONO DO FUTURO DA ARTE DIGITAL
              </h1>
            </div>

            <p className="font-normal text-sm leading-6 text-[#CFB28C]">
              Descubra NFTs selecionados de criadores emergentes e consagrados.
              Colecione arte digital rara, apoie artistas e tenha uma parte da
              cultura da internet.
            </p>
          </div>
          <Link
            to="/mercado"
            className="w-35 h-10 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] flex items-center justify-center cursor-pointer transition-colors duration-500 self-start no-underline"
          >
            <span className="font-medium text-base text-[#140D0A] leading-none">
              EXPLORAR
            </span>
          </Link>
        </div>

        <div className="justify-end flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ver imagem ${index + 1}`}
              className="p-1 cursor-pointer focus:outline-none transition-transform hover:scale-110"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-[#D28A4C] scale-125"
                    : "bg-[#D28A4C]/35 hover:bg-[#D28A4C]/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <img
          key={slides[currentSlide].src}
          src={slides[currentSlide].src}
          alt={slides[currentSlide].alt}
          className="w-full max-w-[450px] aspect-square rounded-3xl object-cover shadow-2xl transition-opacity duration-300"
        />
      </div>
    </section>
  );
}
