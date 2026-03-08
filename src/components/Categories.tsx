import { Sparkles, Droplets, Scissors, Wind, Wrench } from "lucide-react";

const categories = [
  { name: "Makeup", icon: Sparkles, count: 124, color: "from-primary/20 to-blush" },
  { name: "Skincare", icon: Droplets, count: 89, color: "from-accent/20 to-cream" },
  { name: "Haircare", icon: Scissors, count: 67, color: "from-rose-gold/30 to-secondary" },
  { name: "Fragrance", icon: Wind, count: 45, color: "from-primary/15 to-blush" },
  { name: "Beauty Tools", icon: Wrench, count: 53, color: "from-accent/15 to-cream" },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-cream">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.15em] mb-2">Browse</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className={`group relative flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br ${cat.color} border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <cat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-display font-semibold text-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.count} products</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
