import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold">
              Aura <span className="text-rose-gold">Beauty</span> Collective
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Nigeria's premier beauty marketplace connecting you with the finest local beauty entrepreneurs and products.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["New Arrivals", "Best Sellers", "Sale", "Gift Sets"].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Our Story", "Become a Seller", "Blog", "Careers"].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Contact Us", "Shipping Info", "Returns", "FAQ"].map((item) => (
                <li key={item}><a href="#" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Aura Beauty Collective. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
