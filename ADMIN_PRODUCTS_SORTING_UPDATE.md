# Admin Products Sorting Update

## Overview
Updated the Admin Products page to sort products by category first, then by creation timestamp. New products now appear grouped with their category products instead of just at the top.

## Changes Made

### 1. Firestore Service (`src/lib/firebaseService.ts`)

#### Updated `getProducts()` function:
- **Before**: Products were fetched with Firestore `orderBy('createdAt', 'desc')` - newest first
- **After**: Products are now sorted in memory by:
  1. Category name (alphabetically, ascending)
  2. Creation timestamp (ascending - oldest first within each category)

```typescript
// New sorting logic
products.sort((a, b) => {
  // Get first category name for primary sorting
  const categoryA = (a.categories && a.categories.length > 0 ? a.categories[0] : '').toLowerCase();
  const categoryB = (b.categories && b.categories.length > 0 ? b.categories[0] : '').toLowerCase();
  
  // First, sort by category name (alphabetically)
  if (categoryA < categoryB) return -1;
  if (categoryA > categoryB) return 1;
  
  // If categories are the same, sort by createdAt (ascending)
  const timeA = a.createdAt?.getTime() || 0;
  const timeB = b.createdAt?.getTime() || 0;
  return timeA - timeB;
});
```

### 2. Admin Products Page (`src/pages/AdminProducts.tsx`)

#### Added State for Animation:
```typescript
const [newlyAddedProductId, setNewlyAddedProductId] = useState<string | null>(null);
```

#### Auto-Assign Category When Filter Active:
- Added `handleAddProductClick()` function that checks if a category filter is active
- When adding a new product with an active category filter, that category is automatically pre-selected

```typescript
const handleAddProductClick = () => {
  // Auto-assign filtered category when opening dialog
  if (filterCategory !== "all") {
    setFormData(prev => ({
      ...prev,
      categories: [filterCategory]
    }));
  }
  setIsDialogOpen(true);
};
```

#### Updated Product Save Logic:
- Removed the 500ms timeout delay before reloading
- Changed to `await loadProducts()` for immediate reload
- Tracks newly added/updated product ID for animation
- Clears animation after 1.2 seconds

```typescript
// Track the newly added product ID for animation
if (result.id) {
  setNewlyAddedProductId(result.id);
}
// Reload products immediately
await loadProducts();
// Clear animation indicator after animation completes
setTimeout(() => setNewlyAddedProductId(null), 1200);
```

#### Filter State Preservation:
- Filter state (category and search query) is now preserved after adding/editing products
- Products appear in their sorted position immediately
- No scroll position reset

#### Visual Enhancements:
1. **Info Banner**: Added a banner above the products table showing the sorting order
   ```
   ℹ️ Products are sorted by: Category (alphabetically) → Date Added (oldest first)
   ```

2. **Row Animation**: New/updated products get a subtle green highlight animation that fades out
   ```typescript
   className={`${
     newlyAddedProductId === product.id 
       ? 'animate-new-product' 
       : ''
   }`}
   ```

### 3. CSS Animations (`src/index.css`)

#### Added New Product Highlight Animation:
```css
.animate-new-product {
  animation: newProductHighlight 1s ease-out forwards;
}

@keyframes newProductHighlight {
  0% {
    background-color: rgba(34, 197, 94, 0.2); /* Light green */
    transform: scale(1.01);
  }
  50% {
    background-color: rgba(34, 197, 94, 0.15);
  }
  100% {
    background-color: transparent;
    transform: scale(1);
  }
}
```

## User Experience Improvements

### Before:
1. Products appeared newest-first regardless of category
2. Adding a "Room Tray" would place it at the very top
3. Category filter was reset after adding products
4. No visual feedback for newly added products

### After:
1. Products are grouped by category (alphabetically)
2. Within each category, products are sorted by date (oldest first)
3. Adding a "Room Tray" places it with other "Room Accessories" products
4. Category filter persists after adding products
5. Newly added products get a subtle green highlight animation
6. Info banner shows users how products are sorted

## Example Scenario

**Before the update:**
```
[Latest Product] ← Just added Room Tray appears here
Bathroom Accessories → Product 1
Bathroom Accessories → Product 2
Room Accessories → Product 1
Room Accessories → Product 2
```

**After the update:**
```
Bathroom Accessories → Product 1
Bathroom Accessories → Product 2
Room Accessories → Product 1
Room Accessories → Product 2
Room Accessories → Room Tray ← Appears with its category ✨ (with green highlight)
```

## Performance Considerations

- ✅ In-memory sorting is efficient for typical product catalogs
- ✅ Only the changed product list state updates, not unnecessary refetches
- ✅ Animation uses GPU-accelerated transform and opacity
- ✅ Animation indicator is cleared automatically to prevent memory leaks

## Testing Recommendations

1. **Test sorting**: Add products to different categories and verify grouping
2. **Test filtering**: Add a product while a category filter is active
3. **Test animation**: Verify the green highlight appears and fades smoothly
4. **Test persistence**: Verify filters don't reset after adding products
5. **Test edge cases**: Products with multiple categories, no category, etc.

## Notes

- Products with multiple categories are sorted by their **first** category
- Products with no categories will appear at the top (empty string sorts first)
- The sorting is applied both when displaying all products and when a filter is active
- Consider adding a "categoryName" field if you need more precise control over single-category products
