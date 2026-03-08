import { ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";

import productLipstick from "@/assets/product-lipstick.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productEyeshadow from "@/assets/product-eyeshadow.jpg";
import productHairoil from "@/assets/product-hairoil.jpg";
import productPerfume from "@/assets/product-perfume.jpg";
import productFoundation from "@/assets/product-foundation.jpg";
import productBrushset from "@/assets/product-brushset.jpg";
import productMoisturizer from "@/assets/product-moisturizer.jpg";

const products = [
  { id: 1, name: "Velvet Matte Lipstick", price: "₦4,500", seller: "GlowUp Lagos", image: productLipstick, category: "Makeup" },
  { id: 2, name: "Golden Glow Serum", price: "₦8,200", seller: "NaijaSkin Co.", image: productSerum, category: "Skincare" },
  { id: 3, name: "Sunset Eyeshadow Palette", price: "₦12,000", seller: "Adura Beauty", image: productEyeshadow, category: "Makeup" },
  { id: 4, name: "Argan Hair Oil", price: "₦6,500", seller: "CurlQueen NG", image: productHairoil, category: "Haircare" },
  { id: 5, name: "Rose Noir Perfume", price: "₦15,000", seller: "Scent of Lagos", image: productPerfume, category: "Fragrance" },
  { id: 6, name: "Flawless Foundation", price: "₦7,800", seller: "GlowUp Lagos", image: productFoundation, category: "Makeup" },
  { id: 7, name: "Rose Gold Brush Set", price: "₦9,500", seller: "Adura Beauty", image: productBrushset, category: "Beauty Tools" },
  { id: 8, name: "Shea Butter Moisturizer", price: "₦5,200", seller: "NaijaSkin Co.", image: productMoisturizer, category: "Skincare" },
];

const FeaturedProducts = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
                <span className="absolute top-3 left-3 px-3 py-1 bg-card/80 backdrop-blur-sm rounded-full text-[11px] font-semibold text-muted-foreground">
                  {product.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{product.seller}</p>
                <h3 className="font-display text-base font-semibold text-foreground leading-snug">{product.name}</h3>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
