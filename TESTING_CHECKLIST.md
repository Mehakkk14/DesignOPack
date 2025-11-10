# Admin Products Sorting - Testing Checklist

## ✅ Pre-Testing Setup
- [ ] Ensure you have products in at least 2-3 different categories
- [ ] Clear browser cache if needed
- [ ] Login to admin panel

## 🔍 Test Cases

### 1. Basic Sorting Verification
- [ ] Navigate to Admin > Products
- [ ] Verify products are grouped by category (alphabetically)
- [ ] Within each category, verify oldest products appear first
- [ ] Check the info banner displays: "ℹ️ Products are sorted by: Category (alphabetically) → Date Added (oldest first)"

### 2. Add Product - No Filter Active
- [ ] Click "Add Product" button
- [ ] Fill in product details
- [ ] Select a category (e.g., "Room Accessories")
- [ ] Save the product
- [ ] ✅ Verify: Product appears in the correct category group
- [ ] ✅ Verify: Green highlight animation plays on the new row
- [ ] ✅ Verify: Animation fades out after ~1 second

### 3. Add Product - With Category Filter Active
- [ ] Select a category filter (e.g., "Bathroom Accessories")
- [ ] Click "Add Product" button
- [ ] ✅ Verify: Selected category is pre-checked in the form
- [ ] Fill in remaining product details
- [ ] Save the product
- [ ] ✅ Verify: Category filter stays active (not reset to "All")
- [ ] ✅ Verify: New product appears in the filtered list
- [ ] ✅ Verify: New product is in correct position (not at top)
- [ ] ✅ Verify: Green highlight animation plays

### 4. Edit Product
- [ ] Click edit on any product
- [ ] Change product name or other details
- [ ] Save changes
- [ ] ✅ Verify: Product stays in its category group
- [ ] ✅ Verify: Green highlight animation plays on the edited row
- [ ] ✅ Verify: Filters remain active if any were selected

### 5. Search + Category Filter
- [ ] Select a category filter
- [ ] Enter a search term
- [ ] Add a new product
- [ ] ✅ Verify: Both search and category filter remain active
- [ ] ✅ Verify: If the new product matches filters, it appears in list
- [ ] Clear search
- [ ] ✅ Verify: New product is in correct position within category

### 6. Multi-Category Products
- [ ] Add a product with 2+ categories selected
- [ ] ✅ Verify: Product appears under its first category alphabetically
- [ ] Change category filters to view all selected categories
- [ ] ✅ Verify: Product appears in relevant filtered views

### 7. Edge Cases
- [ ] Add product with only one category
- [ ] Add product with all categories selected
- [ ] Try to save product without selecting any category
- [ ] ✅ Verify: Error message appears for no category
- [ ] Add two products to same category quickly
- [ ] ✅ Verify: Both appear in correct order (older first)

### 8. Refresh & Persistence
- [ ] Add a product
- [ ] Click the "Refresh" button
- [ ] ✅ Verify: Sorting is maintained after refresh
- [ ] ✅ Verify: Product is in correct category group
- [ ] Reload the page (F5)
- [ ] ✅ Verify: Sorting is still correct after full page reload

### 9. Delete Product
- [ ] Delete a product from the middle of a category group
- [ ] ✅ Verify: Remaining products maintain correct order
- [ ] ✅ Verify: No visual glitches

### 10. Performance
- [ ] Add multiple products in sequence
- [ ] ✅ Verify: Page remains responsive
- [ ] ✅ Verify: No excessive loading indicators
- [ ] ✅ Verify: Animations don't stack or conflict

## 🎨 Visual Verification

### Animation Quality
- [ ] Green highlight is subtle and professional
- [ ] Animation duration feels smooth (~1 second)
- [ ] No jarring transitions or jumps
- [ ] Row doesn't shift position during animation

### UI Feedback
- [ ] Info banner is visible and clear
- [ ] Category badges display correctly
- [ ] Table remains properly formatted
- [ ] No layout shifts when products load

## 🐛 Common Issues to Watch For

- ❌ Products appearing at top instead of category group
- ❌ Filters resetting after add/edit
- ❌ Animation not appearing
- ❌ Animation persisting too long
- ❌ Scroll jumping to top after add
- ❌ Category not pre-selected when filter active
- ❌ Products not sorted alphabetically by category
- ❌ Oldest products not appearing first within category

## 📊 Test Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| Basic Sorting | ⬜ | |
| Add (No Filter) | ⬜ | |
| Add (With Filter) | ⬜ | |
| Edit Product | ⬜ | |
| Search + Filter | ⬜ | |
| Multi-Category | ⬜ | |
| Edge Cases | ⬜ | |
| Refresh | ⬜ | |
| Delete | ⬜ | |
| Performance | ⬜ | |

**Legend:** ⬜ Not tested | ✅ Passed | ❌ Failed | ⚠️ Issues found

## 📝 Notes

[Add any observations, issues, or suggestions here]
