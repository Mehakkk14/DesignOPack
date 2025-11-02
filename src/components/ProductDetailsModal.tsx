import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import QuoteModal from "./QuoteModal";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productDescription: string;
  productCategories?: string[];
  productImages: string[];
}

const ProductDetailsModal = ({ 
  isOpen, 
  onClose, 
  productName,
  productDescription,
  productCategories = [],
  productImages
}: ProductDetailsModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{productName}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={productImages[selectedImageIndex]}
                alt={`${productName} - View ${selectedImageIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productName} thumbnail ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-heading font-semibold">Product Details</h3>
              <p className="text-muted-foreground leading-relaxed">
                {productDescription}
              </p>
              {productCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {productCategories.map((category, index) => (
                    <span 
                      key={index}
                      className="bg-card border border-border px-3 py-1 rounded-full text-xs font-body"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={handleRequestQuote}
                size="lg"
                className="flex-1"
              >
                Request Quote
              </Button>
              <Button 
                onClick={onClose}
                size="lg"
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Nested Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          onClose();
        }}
        productName={productName}
      />
    </>
  );
};

export default ProductDetailsModal;
