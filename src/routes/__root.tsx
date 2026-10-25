import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#140D0A] text-foreground">
          <div className="w-full max-w-300 mx-auto px-6 pt-6">
            <Header />
          </div>

          <main className="flex-1 w-full max-w-300 mx-auto px-6 py-8">
            <Outlet />
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
