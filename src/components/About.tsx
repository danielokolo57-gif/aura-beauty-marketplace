import { useSettings } from "@/contexts/SettingsContext";
import { Award, Shield, Truck } from "lucide-react";

const About = () => {
  const { settings } = useSettings();
  const name = settings.websiteName;

  const features = [
    { icon: Award, title: "Premium Quality", desc: "Every product is carefully selected and verified for authenticity." },
    { icon: Shield, title: "100% Authentic", desc: "We guarantee all products are genuine and sourced directly." },
    { icon: Truck, title: "Fast Delivery", desc: `Swift delivery across ${settings.country || "your location"}.` },
  ];

  return (
    <section id="about" className="py-20 bg-cream">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">About Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Welcome to {name}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            At {name}, we are dedicated to providing premium cosmetic products that enhance natural beauty. 
            Based in {settings.location || "Nigeria"}, we curate the finest beauty products from trusted brands 
            and deliver them right to your doorstep. Our mission is to make luxury beauty accessible to everyone 
            who believes in the power of self-care and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
