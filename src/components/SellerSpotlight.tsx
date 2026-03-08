import { Star, MapPin, ArrowRight } from "lucide-react";

const sellers = [
  { name: "GlowUp Lagos", location: "Lagos, Nigeria", rating: 4.9, products: 48, specialty: "Makeup & Foundations" },
  { name: "NaijaSkin Co.", location: "Abuja, Nigeria", rating: 4.8, products: 35, specialty: "Organic Skincare" },
  { name: "Adura Beauty", location: "Port Harcourt", rating: 4.9, products: 62, specialty: "Palettes & Tools" },
  { name: "CurlQueen NG", location: "Lagos, Nigeria", rating: 4.7, products: 29, specialty: "Natural Haircare" },
];

const SellerSpotlight = () => {
  return (
    <section id="sellers" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.15em] mb-2">Meet the Sellers</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Nigerian Beauty Entrepreneurs</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Supporting local businesses and celebrating the incredible talent of Nigerian beauty creators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <div
              key={seller.name}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <span className="font-display text-xl font-bold text-primary">
                  {seller.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{seller.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {seller.location}
              </div>
              <p className="text-sm text-primary font-medium mt-2">{seller.specialty}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold text-foreground">{seller.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{seller.products} products</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:gap-2 transition-all"
              >
                Visit Store <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerSpotlight;
