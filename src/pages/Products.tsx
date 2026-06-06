import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BedDouble, 
  Monitor, 
  Lamp, 
  Coffee,
  UtensilsCrossed, 
  Bath, 
  Gift, 
  Package 
} from "lucide-react";
import { getCategories, Category } from "@/lib/firebaseService";
import { logger } from "@/lib/logger";

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    logger.emoji.loading('🔄 Products: Loading categories...');
    try {
      const result = await getCategories();
      if (result.success) {
        logger.emoji.loading('✅ Products: Categories loaded successfully:', result.categories);
        setCategories(result.categories);
      } else {
        logger.emoji.error('❌ Products: Failed to load categories:', result.error);
      }
    } catch (error) {
      logger.emoji.error('❌ Products: Error loading categories:', error);
    }
    setLoading(false);
  };

  // Icon mapping for categories
  const categoryIconMap: { [key: string]: any } = {
    "Room Accessories": BedDouble,
    "Bathroom Accessories": Bath,
    "Gifting": Gift,
    "Food Packaging": Package,
    "Restaurant and Bar Accessories ": UtensilsCrossed,
    "Desk Accessories": Monitor,
    "Nightstand Accessories": Lamp,
    "Mini Bar Tabletop Accessories": Coffee,
  };

  // Category images mapping - Using actual product images from Home page
  const categoryImageMap: { [key: string]: string } = {
    "Room Accessories": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "Bathroom Accessories": "/bathroom-equipment.webp",
    "Gifting": "/gifting-solutions.webp",
    "Food Packaging": "/food-packaging.webp",
    "Restaurant and Bar Accessories ": "/restaurant.webp",
    "Desk Accessories": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    "Nightstand Accessories": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    "Mini Bar Tabletop Accessories": "https://images.unsplash.com/photo-1608270861620-7c80b239cc3d?w=800&q=80",
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          role="presentation"
          style={{
            backgroundImage: "url('/ourproducts.webp')"
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 animate-fade-in">
            Our Products
          </h1>
          <p className="text-xl text-white/90 font-body max-w-2xl mx-auto animate-slide-up">
            Explore our comprehensive range of premium hospitality and packaging solutions
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
              <p className="text-foreground text-lg font-body">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-foreground text-lg font-body">No categories available</p>
              <p className="text-sm text-muted-foreground font-body mt-2">
                Categories will be added by the admin
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {categories.map((category, index) => {
                const Icon = categoryIconMap[category.name] || Package;
                const imageUrl = categoryImageMap[category.name] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80";
                const isLastOdd = index === categories.length - 1 && categories.length % 2 === 1;
                
                return (
                  <div key={category.id} className={isLastOdd ? "col-start-1 col-end-2 md:col-start-1 md:col-end-3 md:w-1/2 mx-auto" : ""}>
                    <Link 
                      to={`/products/${encodeURIComponent(category.name)}`}
                      className="group animate-scale-in w-full block"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                    <Card className="h-full overflow-hidden hover-lift border-2 hover:border-primary transition-all duration-300">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={category.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Icon className="text-primary mb-2" size={32} />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors text-foreground line-clamp-2">
                          {category.name}
                        </h3>
                      </CardContent>
                    </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
