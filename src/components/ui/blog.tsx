import { posts } from "@/constants/blog";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <section className="w-full flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-3">
        <h2 className="font-bold text-[28px] sm:text-4xl text-[#F5F1EB] leading-[100%]">
          Diário da Cunhagem
        </h2>
        <p className="font-normal text-sm sm:text-base text-[#CFB28C] leading-[100%]">
          Histórias, guias e insights para colecionadores sobre o universo da
          propriedade digital.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-[#241612] rounded flex flex-col h-full group cursor-pointer"
          >
            <div className="w-full rounded-xl overflow-hidden bg-[#1E140F]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between px-4 pt-3 pb-4">
              <div className="flex flex-col gap-3">
                <span className="font-medium text-[12px] leading-4 text-[#CFB28C] flex gap-2">
                  <p>{post.date}</p> | <p>{post.readTime}</p>
                </span>

                <h3 className="font-bold text-4 leading-[100%] text-[#F5F1EB] group-hover:text-[#E89B55] transition-colors">
                  {post.title}
                </h3>

                <p className="font-medium text-[12px] leading-4 text-[#CFB28C]">
                  {post.excerpt}
                </p>
              </div>

              <button
                type="button"
                className="self-start flex items-center gap-2 text-sm font-bold text-[#D28A4C] hover:text-[#E89B55] transition-colors cursor-pointer group/btn w-full mt-4"
              >
                <span>Ler mais</span>
                <ArrowRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
