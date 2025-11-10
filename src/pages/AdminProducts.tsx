import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories, Product, Category } from "@/lib/firebaseService";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { ImageUpload } from "@/components/ui/image-upload";

const AdminProducts = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newlyAddedProductId, setNewlyAddedProductId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    categories: [] as string[],
    description: "",
    imageUrl: "",
    price: undefined as number | undefined,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/admin/login");
        return;
      }
      setIsAuthenticated(true);
      setLoading(false);
      await loadProducts();
      await loadCategories();
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadProducts = async () => {
    console.log('🔄 AdminProducts: Loading products...');
    try {
      const result = await getProducts();
      if (result.success) {
        console.log('✅ AdminProducts: Products loaded successfully:', result.products);
        setProducts(result.products);
      } else {
        console.error('❌ AdminProducts: Failed to load products:', result.error);
      }
    } catch (error) {
      console.error('❌ AdminProducts: Error loading products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    }
  };

  const loadCategories = async () => {
    console.log('🔄 AdminProducts: Loading categories...');
    try {
      const result = await getCategories();
      if (result.success) {
        console.log('✅ AdminProducts: Categories loaded successfully:', result.categories);
        setCategories(result.categories);
      } else {
        console.error('❌ AdminProducts: Failed to load categories:', result.error);
      }
    } catch (error) {
      console.error('❌ AdminProducts: Error loading categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one category is selected
    if (formData.categories.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one category",
        variant: "destructive",
      });
      return;
    }
    
    try {
      console.log('🔄 AdminProducts: Submitting product data:', formData);
      
      // Validate required fields
      if (!formData.name || !formData.description || !formData.imageUrl) {
        throw new Error('Missing required fields');
      }
      
      const productData: any = { 
        name: formData.name,
        categories: formData.categories,
        description: formData.description,
        imageUrl: formData.imageUrl,
        inStock: true
      };
      
      // Only add price if it exists and is greater than 0
      if (formData.price && formData.price > 0) {
        productData.price = formData.price;
      }
      
      console.log('🔄 AdminProducts: Final product data:', productData);
      if (editingProduct) {
        console.log('🔄 AdminProducts: Updating existing product:', editingProduct.id);
        const result = await updateProduct(editingProduct.id, productData);
        console.log('✅ AdminProducts: Product update result:', result);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
        setNewlyAddedProductId(editingProduct.id);
      } else {
        console.log('🔄 AdminProducts: Adding new product');
        const result = await addProduct(productData);
        console.log('✅ AdminProducts: Product add result:', result);
        if (!result.success) {
          throw new Error(result.error || 'Failed to add product');
        }
        // Track the newly added product ID for animation
        if (result.id) {
          setNewlyAddedProductId(result.id);
        }
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }
      resetForm();
      setIsDialogOpen(false);
      console.log('🔄 AdminProducts: Reloading products after save (keeping filters)...');
      // Reload products without resetting filters - products will appear in sorted position
      await loadProducts();
      // Clear the newly added indicator after animation completes (1s animation + 200ms buffer)
      setTimeout(() => setNewlyAddedProductId(null), 1200);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categories: product.categories || [],
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price && product.price > 0 ? product.price : undefined,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      categories: [],
      description: "",
      imageUrl: "",
      price: undefined,
    });
    setEditingProduct(null);
  };

  const handleAddProductClick = () => {
    // When opening dialog for new product, auto-assign filtered category
    if (filterCategory !== "all") {
      setFormData(prev => ({
        ...prev,
        categories: [filterCategory]
      }));
    }
    setIsDialogOpen(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || (product.categories && product.categories.includes(filterCategory));
    return matchesSearch && matchesCategory;
  });

  // Debug logging for filtered products
  console.log('🔍 AdminProducts filter state:', {
    filterCategory,
    searchQuery,
    totalProducts: products.length,
    filteredProducts: filteredProducts.length,
    products: products.map(p => ({ id: p.id, name: p.name, categories: p.categories }))
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('🔄 Manual refresh triggered');
                loadProducts();
              }}
            >
              Refresh
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600"
                  onClick={handleAddProductClick}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Update product information" : "Add a new product to your catalog"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="categories">Categories *</Label>
                  <div className="grid grid-cols-2 gap-3 p-4 border rounded-md bg-gray-50">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={cat.id}
                          checked={formData.categories.includes(cat.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                categories: [...formData.categories, cat.name]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                categories: formData.categories.filter(c => c !== cat.name)
                              });
                            }
                          }}
                        />
                        <Label 
                          htmlFor={cat.id} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {cat.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.categories.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">Please select at least one category</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="price">Price (Optional)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="Leave empty if no price"
                  />
                </div>
                <div className="col-span-2">
                  <ImageUpload
                    label="Product Image"
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
          </div>
        </div>

        {/* Filters */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border">
        {/* Info banner */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
          <span className="font-medium">ℹ️ Products are sorted by:</span> Category (alphabetically) → Date Added (oldest first)
        </div>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || filterCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first product"}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow 
                  key={product.id}
                  className={`${
                    newlyAddedProductId === product.id 
                      ? 'animate-new-product' 
                      : ''
                  }`}
                >
                  <TableCell>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {(product.categories || []).map((cat, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{product.price && product.price > 0 ? `₹${product.price}` : ""}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-purple-600">{products.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <p className="text-sm text-gray-600">Categories Used</p>
          <p className="text-2xl font-bold text-orange-600">
            {new Set(products.flatMap((p) => p.categories || [])).size}
          </p>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminProducts;
