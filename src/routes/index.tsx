import Blog from "@/components/ui/blog";
import FeaturedCards from "@/components/ui/featured-cards";
import Hero from "@/components/ui/hero";
import Marketplace from "@/components/ui/marketplace";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="w-full max-w-300 mx-auto px-6 py-6 flex flex-col">
      <main className="w-full mt-8 gap-24 flex flex-col">
        <Hero />
        <Marketplace />
        <FeaturedCards />
        <Blog />
      </main>
    </div>
  );
}
