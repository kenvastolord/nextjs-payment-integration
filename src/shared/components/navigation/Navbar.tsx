import Image from "next/image";
import Link from "next/link";
import { Bell, Home } from "lucide-react";
import ProductSearch from "@/modules/products/presentation/components/ProductSearch";
import CartButton from "@/modules/cart/presentation/components/CartButton";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="TrendLama"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          TRENDLAMA.
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <ProductSearch />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />
        <CartButton />
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;
