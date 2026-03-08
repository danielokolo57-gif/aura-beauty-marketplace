import heroBg from "@/assets/hero-beauty.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Beauty model" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-xl space-y-6 animate-fade-in-up">
          <p className="text-rose-gold font-body text-sm font-semibold uppercase tracking-[0.2em]">
            Nigerian Beauty Marketplace
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-primary-foreground">
            Discover Beauty from Nigerian Sellers
          </h1>
          <p className="text-lg text-primary-foreground/80 font-light max-w-md">
            Curated products from the finest beauty entrepreneurs across Nigeria. 
            Authentic. Premium. Beautiful.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#shop"
              className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:opacity-90 transition-opacity shadow-lg"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="inline-flex items-center px-8 py-3.5 bg-primary-foreground/10 text-primary-foreground font-semibold text-sm rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/20 backdrop-blur-sm transition-colors"
            >
              Explore Categories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
