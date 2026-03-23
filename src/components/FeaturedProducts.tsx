import { useState, useEffect, useMemo } from "react";
import { ShoppingBag, Heart, Loader2, Search } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useCart } from "@/contexts/CartContext";

import productLipstick from "@/assets/product-lipstick.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productEyeshadow from "@/assets/product-eyeshadow.jpg";
import productHairoil from "@/assets/product-hairoil.jpg";
import productPerfume from "@/assets/product-perfume.jpg";

const API_URL = "https://ctzluwfqilwgelexslco.supabase.co/functions/v1/products-api?project_id=website-13-5801";

interface Product {
  id: string | number;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
}

const demoProducts: Product[] = [
  { id: "demo-1", name: "Velvet Matte Lipstick", price: 4500, image: productLipstick, category: "Makeup" },
  { id: "demo-2", name: "Golden Glow Serum", price: 8200, image: productSerum, category: "Skincare" },
  { id: "demo-3", name: "Sunset Eyeshadow Palette", price: 12000, image: productEyeshadow, category: "Makeup" },
  { id: "demo-4", name: "Argan Hair Oil", price: 6500, image: productHairoil, category: "Haircare" },
  { id: "demo-5", name: "Rose Noir Perfume", price: 15000, image: productPerfume, category: "Fragrance" },
];

const FeaturedProducts = () => {
  const { settings } = useSettings();
  const { addToCart } = useCart();
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.data && Array.isArray(data.data)) {
          setApiProducts(data.data);
        } else if (data.products && Array.isArray(data.products)) {
          setApiProducts(data.products);
        }
      } catch {
        // Keep demo products
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Display logic: if API >= 7, hide demos
  const displayProducts = useMemo(() => {
    if (apiProducts.length >= 7) return apiProducts;
    return [...demoProducts, ...apiProducts];
  }, [apiProducts]);

  const categories = useMemo(() => {
    const cats = new Set(displayProducts.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [displayProducts]);

  const filteredProducts = useMemo(() => {
    let result = displayProducts;
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [displayProducts, activeCategory, searchQuery]);

  const handleAdd = (p: Product) => {
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image });
  };

  const sym = settings.currencySymbol;

  return (
    <section id="shop" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Curated for You</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Our Collection</h2>
        </div>

        {/* Search bar */}
        <div id="search-section" className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as string)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
            <span className="ml-3 text-muted-foreground text-sm">Loading products...</span>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            {searchQuery ? "No products match your search." : "Products are loading. Please refresh."}
          </p>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image || productLipstick}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  {product.category && (
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      {sym}{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full hover:opacity-90 transition-opacity"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add
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
