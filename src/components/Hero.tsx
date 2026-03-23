import { useState, useEffect, useCallback } from "react";
import { useSettings } from "@/contexts/SettingsContext";

import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import slide4 from "@/assets/hero-slide-4.jpg";
import slide5 from "@/assets/hero-slide-5.jpg";

const slides = [slide1, slide2, slide3, slide4, slide5];

const typingPhrases = [
  "Discover Beauty",
  "Glow With Confidence",
  "Premium Cosmetic Collection",
  "Your Beauty, Elevated",
];

const Hero = () => {
  const { settings } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    const phrase = typingPhrases[phraseIndex];
    const speed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(phrase.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex + 1 === phrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(phrase.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex <= 1) {
          setIsDeleting(false);
          setPhraseIndex(prev => (prev + 1) % typingPhrases.length);
          setCharIndex(0);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section id="home" className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: currentSlide === i ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/30" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === i ? "w-8 bg-primary" : "w-3 bg-primary-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl space-y-6">
          <p className="text-rose-gold font-body text-xs font-semibold uppercase tracking-[0.25em]">
            {settings.websiteName}
          </p>

          <div className="min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-primary-foreground">
              {displayText}
              <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 animate-pulse" />
            </h1>
          </div>

          <p className="text-lg text-primary-foreground/70 font-light max-w-md leading-relaxed">
            Premium cosmetics curated for those who demand excellence. 
            Authentic beauty products delivered to your door.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#shop"
              className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Shop Now
            </a>
            <a
              href="#about"
              className="inline-flex items-center px-10 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold text-sm rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/20 backdrop-blur-sm transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
