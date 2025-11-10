import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export interface Product {
  id?: string;
  name: string;
  categories: string[];
  description: string;
  imageUrl: string;
  features?: string[];
  price?: number;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuoteRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  product?: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt?: Date;
}

export interface Banner {
  id?: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  description?: string;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Products Collection
const productsCollection = 'products';
const quotesCollection = 'quotes';
const bannersCollection = 'banners';
const categoriesCollection = 'categories';

// ===== PRODUCT FUNCTIONS =====

export const addProduct = async (product: Product) => {
  try {
    console.log('🔄 Adding new product to Firestore:', product);
    
    // Clean the product data to remove undefined values
    const cleanProduct = Object.fromEntries(
      Object.entries(product).filter(([_, value]) => value !== undefined)
    );
    
    console.log('🔄 Cleaned product data (no undefined):', cleanProduct);
    
    const docRef = await addDoc(collection(db, productsCollection), {
      ...cleanProduct,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('✅ Product added successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error adding product:', error);
    return { success: false, error };
  }
};

export const getProducts = async () => {
  try {
    console.log('🔍 Fetching products from Firestore...');
    // Fetch all products without Firestore ordering (we'll sort in memory)
    const querySnapshot = await getDocs(collection(db, productsCollection));
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Product);
    });
    
    // Sort products by category name (alphabetically), then by createdAt (oldest first within each category)
    products.sort((a, b) => {
      // Get the first category name for each product (for primary sorting)
      const categoryA = (a.categories && a.categories.length > 0 ? a.categories[0] : '').toLowerCase();
      const categoryB = (b.categories && b.categories.length > 0 ? b.categories[0] : '').toLowerCase();
      
      // First, sort by category name
      if (categoryA < categoryB) return -1;
      if (categoryA > categoryB) return 1;
      
      // If categories are the same, sort by createdAt (ascending - oldest first)
      const timeA = a.createdAt?.getTime() || 0;
      const timeB = b.createdAt?.getTime() || 0;
      return timeA - timeB;
    });
    
    console.log(`✅ Successfully loaded ${products.length} products (sorted by category → timestamp):`, products);
    return { success: true, products };
  } catch (error) {
    console.error('❌ Error getting products:', error);
    return { success: false, products: [], error };
  }
};

export const getProductById = async (id: string) => {
  try {
    const docRef = doc(db, productsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        product: {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate(),
        } as Product,
      };
    } else {
      return { success: false, error: 'Product not found' };
    }
  } catch (error) {
    console.error('Error getting product:', error);
    return { success: false, error };
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    console.log('🔄 Updating product:', id, updates);
    
    // Clean the updates to remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    console.log('🔄 Cleaned update data (no undefined):', cleanUpdates);
    
    const docRef = doc(db, productsCollection, id);
    await updateDoc(docRef, {
      ...cleanUpdates,
      updatedAt: Timestamp.now(),
    });
    console.log('✅ Product updated successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating product:', error);
    return { success: false, error };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, productsCollection, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
};

// ===== QUOTE REQUEST FUNCTIONS =====

export const addQuoteRequest = async (quote: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => {
  try {
    console.log('🔄 Adding quote request to Firestore:', quote);
    
    // Clean up data to prevent Firestore undefined value errors
    const cleanedQuote = Object.fromEntries(
      Object.entries(quote).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
    
    const docRef = await addDoc(collection(db, quotesCollection), {
      ...cleanedQuote,
      status: 'new',
      createdAt: Timestamp.now(),
    });
    
    console.log('✅ Quote request added successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error adding quote request:', error);
    return { success: false, error };
  }
};

export const getQuoteRequests = async () => {
  try {
    console.log('🔄 Fetching quote requests from Firestore...');
    const q = query(collection(db, quotesCollection), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const quotes: QuoteRequest[] = [];
    
    querySnapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      } as QuoteRequest);
    });
    
    console.log('✅ Quote requests fetched successfully:', quotes.length);
    return { success: true, quotes };
  } catch (error) {
    console.error('❌ Error getting quote requests:', error);
    return { success: false, quotes: [], error };
  }
};

// Real-time listener for quote requests
export const subscribeToQuoteRequests = (callback: (quotes: QuoteRequest[]) => void) => {
  try {
    console.log('🔄 Setting up real-time quote requests listener...');
    const q = query(collection(db, quotesCollection), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const quotes: QuoteRequest[] = [];
      querySnapshot.forEach((doc) => {
        quotes.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        } as QuoteRequest);
      });
      
      console.log('✅ Real-time quote update received:', quotes.length, 'quotes');
      callback(quotes);
    }, (error) => {
      console.error('❌ Error in quote requests real-time listener:', error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('❌ Error setting up quote requests listener:', error);
    return () => {}; // Return empty function as fallback
  }
};

export const updateQuoteStatus = async (id: string, status: QuoteRequest['status']) => {
  try {
    console.log('🔄 Updating quote status:', id, 'to', status);
    const docRef = doc(db, quotesCollection, id);
    await updateDoc(docRef, { status });
    console.log('✅ Quote status updated successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating quote status:', error);
    return { success: false, error };
  }
};

export const deleteQuoteRequest = async (id: string) => {
  try {
    console.log('🔄 Deleting quote request:', id);
    const docRef = doc(db, quotesCollection, id);
    await deleteDoc(docRef);
    console.log('✅ Quote request deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting quote request:', error);
    return { success: false, error };
  }
};

// ===== BANNER FUNCTIONS =====

export const addBanner = async (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    console.log('🔄 Adding new banner to Firestore:', banner);
    
    // Check if we already have the maximum number of banners (8)
    const { success, banners } = await getBanners();
    if (success && banners.length >= 8) {
      console.warn('⚠️ Maximum number of banners (8) reached');
      return { 
        success: false, 
        error: 'Maximum number of banners (8) reached. Please delete a banner before adding a new one.' 
      };
    }
    
    // If no order is specified, set it to the next available order
    let order = banner.order;
    if (!order || order < 1) {
      order = banners.length + 1;
    }
    
    const docRef = await addDoc(collection(db, bannersCollection), {
      ...banner,
      order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('✅ Banner added successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error adding banner:', error);
    return { success: false, error };
  }
};

export const getBanners = async () => {
  try {
    console.log('🔍 Fetching banners from Firestore...');
    const q = query(collection(db, bannersCollection), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const banners: Banner[] = [];
    
    querySnapshot.forEach((doc) => {
      banners.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Banner);
    });
    
    console.log(`✅ Successfully loaded ${banners.length} banners:`, banners);
    return { success: true, banners };
  } catch (error) {
    console.error('❌ Error getting banners:', error);
    return { success: false, banners: [], error };
  }
};

export const updateBanner = async (id: string, updates: Partial<Banner>) => {
  try {
    const docRef = doc(db, bannersCollection, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating banner:', error);
    return { success: false, error };
  }
};

export const deleteBanner = async (id: string) => {
  try {
    await deleteDoc(doc(db, bannersCollection, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting banner:', error);
    return { success: false, error };
  }
};

export const getActiveBanners = async () => {
  try {
    console.log('🔍 Fetching active banners...');
    const { success, banners } = await getBanners();
    if (success) {
      const activeBanners = banners.filter(banner => banner.isActive);
      console.log(`✅ Found ${activeBanners.length} active banners out of ${banners.length} total`);
      return { success: true, banners: activeBanners };
    }
    return { success: false, banners: [] };
  } catch (error) {
    console.error('❌ Error getting active banners:', error);
    return { success: false, banners: [], error };
  }
};

// Initialize default banners if none exist
export const initializeDefaultBanners = async () => {
  try {
    console.log('🔄 Checking if default banners need to be initialized...');
    const { success, banners } = await getBanners();
    if (success && banners.length === 0) {
      console.log('📦 No banners found, creating default banners...');
      // Add default banners with working URLs
      const defaultBanners = [
        {
          title: "Premium Packaging Solutions",
          imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
          isActive: true,
          order: 1
        },
        {
          title: "Luxury Hotel Amenities",
          imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80", 
          isActive: true,
          order: 2
        },
        {
          title: "Custom Branding Solutions",
          imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=80",
          isActive: true,
          order: 3
        },
        {
          title: "End-to-End Service",
          imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1600&q=80",
          isActive: true,
          order: 4
        }
      ];
      
      for (const banner of defaultBanners) {
        await addBanner(banner);
      }
      
      console.log('✅ Default banners initialized successfully');
      return { success: true, message: "Default banners initialized" };
    }
    console.log('ℹ️ Banners already exist, skipping initialization');
    return { success: true, message: "Banners already exist" };
  } catch (error) {
    console.error('❌ Error initializing default banners:', error);
    return { success: false, error };
  }
};

// Initialize sample products for testing
// ===== CATEGORY FUNCTIONS =====

export const getCategories = async () => {
  try {
    console.log('🔍 Fetching categories from Firestore...');
    const q = query(collection(db, categoriesCollection), orderBy('displayOrder', 'asc'));
    const querySnapshot = await getDocs(q);
    const categories: Category[] = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Category);
    });
    
    console.log(`✅ Successfully loaded ${categories.length} categories:`, categories);
    return { success: true, categories };
  } catch (error) {
    console.error('❌ Error getting categories:', error);
    return { success: false, categories: [], error };
  }
};

export const addCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    console.log('🔄 Adding new category to Firestore:', category);
    const docRef = await addDoc(collection(db, categoriesCollection), {
      ...category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('✅ Category added successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error adding category:', error);
    return { success: false, error };
  }
};

export const updateCategory = async (id: string, updates: Partial<Category>) => {
  try {
    console.log('🔄 Updating category:', id, updates);
    
    // Clean the updates to remove undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    const docRef = doc(db, categoriesCollection, id);
    await updateDoc(docRef, {
      ...cleanUpdates,
      updatedAt: Timestamp.now(),
    });
    console.log('✅ Category updated successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating category:', error);
    return { success: false, error };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    console.log('🔄 Deleting category:', id);
    await deleteDoc(doc(db, categoriesCollection, id));
    console.log('✅ Category deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting category:', error);
    return { success: false, error };
  }
};

// Initialize default categories if none exist
export const initializeDefaultCategories = async () => {
  try {
    console.log('🔄 Checking if default categories need to be initialized...');
    const { success, categories } = await getCategories();
    if (success && categories.length === 0) {
      console.log('📦 No categories found, creating default categories...');
      
      const defaultCategories = [
        { name: "IN-ROOM ACCESSORIES", description: "Accessories for hotel rooms and guest areas", displayOrder: 1 },
        { name: "DESK ACCESSORIES", description: "Professional desk and office accessories", displayOrder: 2 },
        { name: "NIGHTSTAND ACCESSORIES", description: "Bedside and nightstand accessories", displayOrder: 3 },
        { name: "MINI BAR TABLETOP ACCESSORIES", description: "Mini bar and tabletop accessories", displayOrder: 4 },
        { name: "RESTAURANT & BAR ACCESSORIES", description: "Restaurant and bar service accessories", displayOrder: 5 },
        { name: "BATHROOM ACCESSORIES", description: "Luxury bathroom accessories and amenities", displayOrder: 6 },
        { name: "GIFTING", description: "Gift packaging and presentation solutions", displayOrder: 7 },
        { name: "FOOD PACKAGING", description: "Food and beverage packaging solutions", displayOrder: 8 }
      ];
      
      for (const category of defaultCategories) {
        await addCategory(category);
      }
      
      console.log('✅ Default categories initialized successfully');
      return { success: true, message: "Default categories initialized" };
    }
    console.log('ℹ️ Categories already exist, skipping initialization');
    return { success: true, message: "Categories already exist" };
  } catch (error) {
    console.error('❌ Error initializing default categories:', error);
    return { success: false, error };
  }
};
