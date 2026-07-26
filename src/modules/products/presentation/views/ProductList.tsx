import Categories from "../components/Categories";
import Link from "next/link";
import ProductFilter from "../components/ProductFilter";
import ProductCard from "@/modules/products/presentation/components/ProductCard";
import { getProductsUseCase } from "../../infrastructure/container";

const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  const products = getProductsUseCase.execute();
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <ProductFilter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
