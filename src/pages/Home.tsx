import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BedDouble, 
  Bath, 
  Gift, 
  ShoppingBag,
  Award,
  CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import banner1 from "@/assets/banner1.webp";
import banner2 from "@/assets/banner2.webp";
import banner3 from "@/assets/banner3.webp";
import banner4 from "@/assets/banner4.webp";
import ctaBackground from "@/assets/cta-background.png";
import { getActiveBanners, Banner } from "@/lib/firebaseService";
import { logger } from "@/lib/logger";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Client logos
import tajChandigarh from "@/assets/clients/taj-chandigarh.png";
import theParkDelhi from "@/assets/clients/the-park-delhi.png";
import tajLakefront from "@/assets/clients/taj-lakefront-bhopal.png";
import ajitBhawan from "@/assets/clients/ajit-bhawan.png";
import sarovarMahagun from "@/assets/clients/sarovar-portico-mahagun.png";
import prideHotels from "@/assets/clients/pride-hotels.png";
import sarovarGaurs from "@/assets/clients/sarovar-portico-gaurs.png";
import sahanaCorbett from "@/assets/clients/sahana-corbett.png";
import pilibhitHouse from "@/assets/clients/pilibhit-house.png";
import tajCorbett from "@/assets/clients/taj-corbett.png";
import tajRishikesh from "@/assets/clients/taj-rishikesh.png";
import jaypeePalace from "@/assets/clients/jaypee-palace.png";
import hyattRegency from "@/assets/clients/hyatt-regency.png";
import parkPlaza from "@/assets/clients/park-plaza.png";
import rawlaNarlai from "@/assets/clients/rawla-narlai.png";
import radisson from "@/assets/clients/radisson.png";
import mastiffHotel from "@/assets/clients/mastiff-hotel.png";
import tajAmerJaipur from "@/assets/clients/taj-amer-jaipur.png";
import tajRishikeshFull from "@/assets/clients/taj-rishikesh-full.png";
import crownePlaza from "@/assets/clients/crowne-plaza.png";
import sarovarAgra from "@/assets/clients/sarovar-premiere-agra.png";
import grandMercure from "@/assets/clients/grand-mercure.png";
import holidayInn from "@/assets/clients/holiday-inn.png";
import parkInn from "@/assets/clients/park-inn.png";
import citrusClassic from "@/assets/clients/citrus-classic.png";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  
  // Fallback to static banners if no Firebase banners are available
  const staticBanners = [banner1, banner2, banner3, banner4];
  
  useEffect(() => {
    loadBanners();
    
    // Initialize default banners if needed
    import("@/lib/firebaseService").then(({ initializeDefaultBanners }) => {
      initializeDefaultBanners().then(() => {
        // Reload banners after potential initialization
        setTimeout(() => loadBanners(), 1000);
      });
    });
  }, []);

  const loadBanners = async () => {
    logger.emoji.loading('🔄 Home: Loading active banners...');
    const result = await getActiveBanners();
    if (result.success && result.banners.length > 0) {
      logger.emoji.loading('✅ Home: Active banners loaded:', result.banners);
      setBanners(result.banners);
      setBannerImages(result.banners.map(banner => banner.imageUrl));
    } else {
      logger.emoji.loading('⚠️ Home: No active banners found, using static fallback');
      // Use static banners as fallback
      setBannerImages(staticBanners);
    }
  };
  
  useEffect(() => {
    // Start slider after 3 seconds
    const startTimer = setTimeout(() => {
      setIsSliderActive(true);
    }, 3000);
    
    return () => clearTimeout(startTimer);
  }, []);
  
  useEffect(() => {
    if (!isSliderActive || bannerImages.length === 0) return;
    
    // Change image every 3 seconds (as requested)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isSliderActive, bannerImages.length]);
  const categories = [
    {
      icon: BedDouble,
      title: "In-Room Accessories",
      description: "Premium menu folders, trays, tissue boxes, and more in elegant Leatherette",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    },
    {
      icon: Bath,
      title: "Bathroom Equipments",
      description: "Luxury amenities and accessories in Resin and Leatherette finishes",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    },
    {
      icon: Gift,
      title: "Gifting Solutions",
      description: "Customized hampers, photo frames, greeting cards, and corporate gifts",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    },
    {
      icon: ShoppingBag,
      title: "Food Packaging",
      description: "Premium boxes and carry bags in SBS, Kraft, and Kappa Board",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80",
    },
  ];

  const clientLogos = [
    { name: "Taj Chandigarh", logo: tajChandigarh },
    { name: "The Park New Delhi", logo: theParkDelhi },
    { name: "Taj Lakefront Bhopal", logo: tajLakefront },
    { name: "The Ajit Bhawan", logo: ajitBhawan },
    { name: "Sarovar Portico Mahagun", logo: sarovarMahagun },
    { name: "The Pride Hotels & Resorts", logo: prideHotels },
    { name: "Sarovar Portico The Gaurs", logo: sarovarGaurs },
    { name: "Sahana The Corbett Wilderness", logo: sahanaCorbett },
    { name: "Pilibhit House IHCL", logo: pilibhitHouse },
    { name: "Taj Corbett Resort & Spa", logo: tajCorbett },
    { name: "Taj Rishikesh Resort & Spa", logo: tajRishikesh },
    { name: "Jaypee Palace Hotel", logo: jaypeePalace },
    { name: "Hyatt Regency Delhi", logo: hyattRegency },
    { name: "Park Plaza Faridabad", logo: parkPlaza },
    { name: "Rawla Narlai Heritage Resort", logo: rawlaNarlai },
    { name: "Radisson", logo: radisson },
    { name: "Mastiff Hotel", logo: mastiffHotel },
    { name: "Taj Amer Jaipur", logo: tajAmerJaipur },
    { name: "Taj Rishikesh Resort & Spa Uttarakhand", logo: tajRishikeshFull },
    { name: "Crowne Plaza", logo: crownePlaza },
    { name: "Crystal Sarovar Premiere Agra", logo: sarovarAgra },
    { name: "Grand Mercure Agra", logo: grandMercure },
    { name: "Holiday Inn IHG", logo: holidayInn },
    { name: "Park Inn by Radisson", logo: parkInn },
    { name: "Citrus Classic", logo: citrusClassic },
  ];

  const features = [
    "15+ Years of Excellence",
    "Premium Quality Materials",
    "Customization Available",
    "Trusted by 100+ Hotels"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-black to-secondary">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out will-change-opacity"
              style={{
                backgroundImage: `url(${image})`,
                opacity: index === currentImageIndex ? 0.5 : 0,
                zIndex: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-[2]" />
        <div className="container mx-auto px-4 relative z-[3] text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-10 leading-tight">
              End-to-End Packaging Partner for
              <br />
              <span className="text-primary">Premium Hospitality Brands</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg">
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="text-lg">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Strip */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center justify-center gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="text-primary flex-shrink-0" size={24} />
                <span className="font-body font-medium text-foreground text-sm md:text-base">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Our Product Categories
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
              Discover our comprehensive range of premium hospitality and packaging solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link 
                  key={index} 
                  to="/products"
                  className="group animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Card className="h-full overflow-hidden hover-lift border-2 hover:border-primary transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Icon className="text-primary mb-2" size={32} />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Award className="text-primary mx-auto mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Trusted by India's Leading Hotels
            </h2>
            <p className="text-muted-foreground font-body">
              Proud partners of premium hospitality brands
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {clientLogos.map((client, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 basis-1/2 md:basis-1/4"
                >
                  <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 h-32 flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full w-auto h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ctaBackground})`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg text-gray-200 font-body mb-8 max-w-2xl mx-auto">
            Let's create premium packaging solutions that perfectly represent your luxury brand
          </p>
          <Button size="lg" asChild className="text-lg bg-maroon hover:bg-red-900 text-white border-none">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
