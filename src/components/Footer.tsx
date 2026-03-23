import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold">{settings.websiteName}</h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Premium cosmetic products curated for beauty lovers. Quality you can trust, delivered to your doorstep.
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
            <ul className="space-y-2 text-sm text-primary-foreground/50">
              {["New Arrivals", "Best Sellers", "Sale", "Gift Sets"].map((item) => (
                <li key={item}><a href="#shop" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/50">
              {["About Us", "Contact", "Shipping", "FAQ"].map((item) => (
                <li key={item}><a href="#about" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/50">
              {settings.email && <li>{settings.email}</li>}
              {settings.whatsapp && <li>{settings.whatsapp}</li>}
              {settings.location && <li className="capitalize">{settings.location}, {settings.country}</li>}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/30">
          © {new Date().getFullYear()} {settings.websiteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
