# Firebase Setup Guide for DesignOPack Admin Panel

## ✅ What's Done:
- Firebase SDK installed
- Firebase configuration file created
- Firestore database service for products and quotes
- Admin dashboard created
- Quote requests now save to Firebase
- Authentication setup ready

## 🚀 How to Complete Setup (10 minutes):

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name: **DesignOPack** (or your preferred name)
4. Click Continue
5. Disable Google Analytics (optional, you can enable later)
6. Click "Create project"
7. Wait for project to be created, then click "Continue"

### Step 2: Register Web App
1. In your Firebase project console, click the **Web icon** (</>)
2. Enter app nickname: **DesignOPack Website**
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. You'll see your Firebase configuration - **COPY THIS!** It looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

6. Click "Continue to console"

### Step 3: Enable Firestore Database
1. In the left sidebar, click **"Firestore Database"**
2. Click "Create database"
3. Select **"Start in production mode"** (we'll add security rules later)
4. Choose your location (e.g., asia-south1 for India)
5. Click "Enable"

### Step 4: Enable Authentication
1. In the left sidebar, click **"Authentication"**
2. Click "Get started"
3. Click on **"Email/Password"** provider
4. Toggle **Enable** to ON
5. Click "Save"

### Step 5: Create Admin User
1. Still in Authentication, click **"Users"** tab
2. Click "Add user"
3. Enter your admin email (e.g., admin@designopack.com)
4. Enter a strong password
5. Click "Add user"

### Step 6: Set Up Firestore Collections
1. Go back to **"Firestore Database"**
2. Click "Start collection"
3. Collection ID: **products**
4. Click "Next"
5. Add a dummy document (we'll delete it later):
   - Document ID: (auto-generate)
   - Field: name, Type: string, Value: "Sample Product"
6. Click "Save"

7. Click "Start collection" again
8. Collection ID: **quotes**
9. Add a dummy document:
   - Document ID: (auto-generate)
   - Field: name, Type: string, Value: "Sample Quote"
10. Click "Save"

### Step 7: Update Firestore Security Rules
1. In Firestore Database, click **"Rules"** tab
2. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow anyone to create quote requests
    match /quotes/{quote} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Step 8: Enable Storage (for product images)
1. In the left sidebar, click **"Storage"**
2. Click "Get started"
3. Click "Next" (keep default rules)
4. Choose location (same as Firestore)
5. Click "Done"

### Step 9: Update Storage Rules
1. In Storage, click **"Rules"** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Step 10: Update .env File
Open the `.env` file and add your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Step 11: Restart Dev Server
```bash
npm run dev
```

## 🎉 You're Done!

### Access Admin Panel:
1. Go to http://localhost:8080/admin
2. Login with your admin email and password
3. You can now:
   - View all products
   - View all quote requests
   - Manage your inventory

## 📋 What Works Now:

✅ **Quote Requests**: All quote submissions are saved to Firebase
✅ **Admin Login**: Secure authentication
✅ **Dashboard**: View products and quotes
✅ **Real-time Data**: All data syncs automatically

## 🔜 Next Steps (Optional):

1. **Add Product Management**: Create UI to add/edit/delete products
2. **Image Upload**: Upload product images to Firebase Storage
3. **Quote Status**: Update quote request statuses (new, contacted, quoted, closed)
4. **Email Notifications**: Get email when new quote arrives (via EmailJS)
5. **Analytics**: Track website visitors

## 🔐 Security Notes:

- Your admin password is secure
- Public can only read products and create quotes
- Only authenticated admins can modify data
- Firebase handles all security automatically

## 🆘 Troubleshooting:

**Error: "Firebase app not initialized"**
- Make sure you updated the .env file
- Restart the dev server

**Error: "Permission denied"**
- Check Firestore security rules
- Make sure you're logged in for admin actions

**Can't login to admin**
- Verify you created the user in Firebase Authentication
- Check email and password are correct

## 📱 Admin Panel Features:

- **Dashboard**: Overview of products and quotes
- **Products Tab**: View all products
- **Quotes Tab**: View and manage quote requests with status indicators
- **Secure Login**: Only authorized users can access

Enjoy your new admin panel! 🎨
