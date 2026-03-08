import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

import productLipstick from "@/assets/product-lipstick.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productEyeshadow from "@/assets/product-eyeshadow.jpg";
import productHairoil from "@/assets/product-hairoil.jpg";
import productPerfume from "@/assets/product-perfume.jpg";
import productFoundation from "@/assets/product-foundation.jpg";
import productBrushset from "@/assets/product-brushset.jpg";
import productMoisturizer from "@/assets/product-moisturizer.jpg";

const API_URL = "https://ctzluwfqilwgelexslco.supabase.co/functions/v1/products-api?project_id=prime-depot-2481";

interface Product {
  id: string | number;
  name: string;
  price: number | string;
  category?: string;
  description?: string;
  image?: string;
  seller?: string;
}

const fallbackProducts: Product[] = [
  { id: 1, name: "Velvet Matte Lipstick", price: "₦4,500", seller: "GlowUp Lagos", image: productLipstick, category: "Makeup" },
  { id: 2, name: "Golden Glow Serum", price: "₦8,200", seller: "NaijaSkin Co.", image: productSerum, category: "Skincare" },
  { id: 3, name: "Sunset Eyeshadow Palette", price: "₦12,000", seller: "Adura Beauty", image: productEyeshadow, category: "Makeup" },
  { id: 4, name: "Argan Hair Oil", price: "₦6,500", seller: "CurlQueen NG", image: productHairoil, category: "Haircare" },
  { id: 5, name: "Rose Noir Perfume", price: "₦15,000", seller: "Scent of Lagos", image: productPerfume, category: "Fragrance" },
  { id: 6, name: "Flawless Foundation", price: "₦7,800", seller: "GlowUp Lagos", image: productFoundation, category: "Makeup" },
  { id: 7, name: "Rose Gold Brush Set", price: "₦9,500", seller: "Adura Beauty", image: productBrushset, category: "Beauty Tools" },
  { id: 8, name: "Shea Butter Moisturizer", price: "₦5,200", seller: "NaijaSkin Co.", image: productMoisturizer, category: "Skincare" },
];

const formatPrice = (price: number | string): string => {
  if (typeof price === "string") return price;
  return `₦${price.toLocaleString()}`;
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch {
        setError(true);
        // Keep fallback products visible
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart!`, {
      description: "View your cart to checkout.",
    });
  };

  return (
    <section id="shop" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.15em] mb-2">Curated for You</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Featured Products</h2>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-muted-foreground font-medium">Loading products...</span>
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Products are loading. Please refresh.
          </p>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image || productLipstick}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  {product.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-card/80 backdrop-blur-sm rounded-full text-[11px] font-semibold text-muted-foreground capitalize">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  {product.seller && (
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{product.seller}</p>
                  )}
                  <h3 className="font-display text-base font-semibold text-foreground leading-snug">{product.name}</h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full hover:opacity-90 transition-opacity"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
