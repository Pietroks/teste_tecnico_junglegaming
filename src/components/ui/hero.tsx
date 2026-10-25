import img1 from "@/assets/img1.png";

export default function Hero() {
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
          <button className="w-35 h-10 rounded-[6px] bg-[#D28A4C] hover:bg-[#E89B55] flex items-center justify-center cursor-pointer transition-colors duration-500 self-start">
            <span className="font-medium text-base text-[#140D0A] leading-none">
              EXPLORAR
            </span>
          </button>
        </div>

        <div className="justify-end flex gap-4">
          <button>
            <div className="w-2 h-2 rounded-full bg-[#D28A4C]" />
          </button>
          <button>
            <div className="w-2 h-2 rounded-full bg-[#D28A4C]" />
          </button>
          <button>
            <div className="w-2 h-2 rounded-full bg-[#D28A4C]" />
          </button>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <img
          src={img1}
          alt="Imagem do Hero"
          className="w-full max-w-[450px] aspect-square rounded-3xl object-cover shadow-2xl"
        />
      </div>
    </section>
  );
}
