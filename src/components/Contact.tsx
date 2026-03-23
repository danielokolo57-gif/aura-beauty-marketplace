import { useSettings } from "@/contexts/SettingsContext";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const { settings } = useSettings();

  const details = [
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: Phone, label: "Phone", value: settings.whatsapp, href: `tel:${settings.whatsapp}` },
    { icon: MapPin, label: "Location", value: [settings.location, settings.country].filter(Boolean).join(", "), href: undefined },
  ].filter(d => d.value);

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Get in Touch</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Contact Us</h2>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {details.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{value}</a>
                ) : (
                  <p className="text-sm font-medium text-foreground capitalize">{value}</p>
                )}
              </div>
            </div>
          ))}

          {settings.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="text-sm font-medium text-foreground">Chat with us</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
