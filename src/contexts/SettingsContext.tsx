import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const PROJECT_ID = "prime-depot-2481";
const PRODUCTS_API = `https://ctzluwfqilwgelexslco.supabase.co/functions/v1/products-api?project_id=${PROJECT_ID}`;
const SETTINGS_API = `https://ctzluwfqilwgelexslco.supabase.co/functions/v1/settings-api?project_id=${PROJECT_ID}`;

export interface StoreSettings {
  websiteName: string;
  email: string;
  whatsapp: string;
  location: string;
  country: string;
  currency: string;
  currencySymbol: string;
}

interface SettingsContextType {
  settings: StoreSettings;
  loading: boolean;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦", USD: "$", GBP: "£", EUR: "€", GHS: "₵", KES: "KSh", ZAR: "R",
};

const defaultSettings: StoreSettings = {
  websiteName: "Aura Beauty Collective",
  email: "",
  whatsapp: "",
  location: "",
  country: "",
  currency: "NGN",
  currencySymbol: "₦",
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [projectRes, settingsRes] = await Promise.allSettled([
          fetch(PRODUCTS_API),
          fetch(SETTINGS_API),
        ]);

        let merged = { ...defaultSettings };

        if (projectRes.status === "fulfilled" && projectRes.value.ok) {
          const data = await projectRes.value.json();
          const p = data.project;
          if (p) {
            merged.websiteName = p.website_name || merged.websiteName;
            merged.email = p.email || "";
            merged.whatsapp = p.phone_number || "";
            merged.location = p.location || "";
            merged.country = p.country || "";
            merged.currency = p.currency || "NGN";
            merged.currencySymbol = CURRENCY_SYMBOLS[p.currency] || p.currency || "₦";
          }
        }

        if (settingsRes.status === "fulfilled" && settingsRes.value.ok) {
          const data = await settingsRes.value.json();
          const s = data.settings;
          if (s?.contact) {
            if (s.contact.whatsapp) merged.whatsapp = s.contact.whatsapp;
            if (s.contact.email) merged.email = s.contact.email;
            if (s.contact.phone) merged.whatsapp = merged.whatsapp || s.contact.phone;
          }
        }

        setSettings(merged);
      } catch {
        // Keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
