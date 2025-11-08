import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { getProducts, getCategories, Product, Category } from "@/lib/firebaseService";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    description: string;
    categories: string[];
    images: string[];
  } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadCategories();
    
    // Initialize sample products if needed
    import("@/lib/firebaseService").then(({ initializeSampleProducts }) => {
      initializeSampleProducts().then(() => {
        // Reload products after potential initialization
        setTimeout(() => loadProducts(), 1000);
      });
    });
  }, []);

  const loadProducts = async () => {
    console.log('🔄 Products page: Loading products...');
    try {
      const result = await getProducts();
      if (result.success) {
        console.log('✅ Products page: Products loaded successfully:', result.products);
        // Clean up products - remove price if it's 0 or null
        const cleanedProducts = result.products.map(product => ({
          ...product,
          price: product.price && product.price > 0 ? product.price : undefined
        }));
        setProducts(cleanedProducts);
        console.log('✅ Products page: Cleaned products set:', cleanedProducts);
      } else {
        console.error('❌ Products page: Failed to load products:', result.error);
      }
    } catch (error) {
      console.error('❌ Products page: Error loading products:', error);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    console.log('🔄 Products: Loading categories...');
    try {
      const result = await getCategories();
      if (result.success) {
        console.log('✅ Products: Categories loaded successfully:', result.categories);
        setCategories(result.categories);
      } else {
        console.error('❌ Products: Failed to load categories:', result.error);
      }
    } catch (error) {
      console.error('❌ Products: Error loading categories:', error);
    }
  };

  // Icon mapping for categories
  const categoryIconMap: { [key: string]: any } = {
    "IN-ROOM ACCESSORIES": BedDouble,
    "DESK ACCESSORIES": Monitor,
    "NIGHTSTAND ACCESSORIES": Lamp,
    "MINI BAR TABLETOP ACCESSORIES": Coffee,
    "RESTAURANT & BAR ACCESSORIES": UtensilsCrossed,
    "BATHROOM ACCESSORIES": Bath,
    "GIFTING": Gift,
    "FOOD PACKAGING": Package,
  };

  // Transform categories for display
  const displayCategories = [
    { id: "all", name: "All Products", icon: null },
    ...categories.map(cat => ({
      id: cat.name,
      name: cat.name,
      icon: categoryIconMap[cat.name] || Package
    }))
  ];

  // Show only All Products + first 4 categories by default, toggle to show all
  const [showAllCategories, setShowAllCategories] = useState(false);
  const categoriesToDisplay = showAllCategories
    ? displayCategories
    : [displayCategories[0], ...displayCategories.slice(1, 5)];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.categories && p.categories.includes(selectedCategory));

  // Debug logging
  console.log('🔍 Products page state:', {
    selectedCategory,
    totalProducts: products.length,
    filteredProducts: filteredProducts.length,
    products: products.map(p => ({ id: p.id, name: p.name, categories: p.categories }))
  });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct({
      name: product.name,
      description: product.description,
      categories: product.categories || [],
      images: [product.imageUrl] // Use imageUrl from Product type
    });
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          role="presentation"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')"
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 animate-fade-in">
            Our Products
          </h1>
          <p className="text-xl text-white/90 font-body max-w-2xl mx-auto animate-slide-up">
            Premium hospitality and packaging solutions crafted with excellence
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {categoriesToDisplay.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex items-center gap-2"
                >
                  {Icon && <Icon size={18} />}
                  {cat.name}
                </Button>
              );
            })}

            {/* Show More / Less toggle when there are more than 4 categories */}
            {displayCategories.length > 5 && (
              <Button
                key="more-toggle"
                variant="ghost"
                onClick={() => setShowAllCategories(prev => !prev)}
                className="flex items-center gap-2"
              >
                {showAllCategories ? "Less" : "More"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500 text-lg">No products available</p>
              <p className="text-sm text-gray-400 mt-2">
                Products will be added by the admin
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id || index}
                  className="group overflow-hidden hover-lift animate-scale-in relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* use a taller image container (h-60) and remove extra padding per request */}
                  <div className="relative h-60 overflow-hidden flex items-center justify-center bg-white">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80";
                      }}
                    />
                    {/* Category Tags */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      {(product.categories || []).slice(0, 2).map((category, index) => (
                        <span key={index} className="bg-secondary/60 backdrop-blur-sm border border-white/20 text-white px-2 py-1 rounded-full text-xs font-body font-semibold">
                          {category}
                        </span>
                      ))}
                      {(product.categories || []).length > 2 && (
                        <span className="bg-secondary/60 backdrop-blur-sm border border-white/20 text-white px-2 py-1 rounded-full text-xs font-body font-semibold">
                          +{(product.categories || []).length - 2}
                        </span>
                      )}
                    </div>
                    {/* Hover View Details Button */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewDetails(product)}
                        className="text-sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {product.name}
                    </h3>
                    {product.price && product.price > 0 ? (
                      <p className="text-primary font-semibold mt-1">
                        ₹{product.price}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500 text-lg">No products found in this category</p>
              <p className="text-sm text-gray-400 mt-2">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal 
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedProduct(null);
          }}
          productName={selectedProduct.name}
          productDescription={selectedProduct.description}
          productCategories={selectedProduct.categories}
          productImages={selectedProduct.images}
        />
      )}
    </div>
  );
};

export default Products;
