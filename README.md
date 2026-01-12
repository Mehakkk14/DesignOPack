# Designopack Luxury Showcase

A premium luxury packaging showcase platform designed to display and manage high-end packaging products. This modern web application provides an elegant, interactive experience for customers to explore luxury packaging solutions while offering comprehensive admin controls for product and quote management.

## 🌟 Features

### Customer-Facing
- **Product Showcase**: Beautiful, categorized display of luxury packaging products with high-quality images
- **Interactive Quote System**: Request custom quotes with detailed product specifications via EmailJS integration
- **Product Details Modal**: Comprehensive product information with image galleries
- **WhatsApp Integration**: Direct customer support via WhatsApp button
- **Responsive Design**: Seamless experience across all devices
- **SEO Optimized**: Built with best practices for search engine visibility

### Admin Panel
- **Product Management**: Full CRUD operations for products with drag-and-drop sorting
- **Category Management**: Organize products into custom categories
- **Banner Management**: Control homepage banners and promotional content
- **Quote Management**: Review and manage customer quote requests
- **Secure Authentication**: Protected admin routes with Firebase authentication
- **Real-time Updates**: Instant synchronization with Firebase backend

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui for accessible, customizable components
- **Backend**: Firebase (Firestore Database & Authentication)
- **Email Service**: EmailJS for quote submission handling
- **State Management**: React Hooks & Context API
- **Routing**: React Router v6

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager

### Setup Instructions

1. **Clone the repository**
```bash
git clone <YOUR_REPO_URL>
cd designopack-luxury-showcase-main
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Configure environment variables**
Create necessary Firebase configuration in `src/lib/firebase.ts` with your Firebase project credentials.

4. **Start development server**
```bash
npm run dev
# or
bun dev
```

5. **Build for production**
```bash
npm run build
# or
bun build
```

## 🚀 Deployment

This project is configured for deployment on Vercel with automatic CI/CD. Push to your main branch to trigger automatic deployments.

## 📁 Project Structure

```
designopack-luxury-showcase-main/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── admin/         # Admin panel components
│   │   ├── products/      # Product-related components
│   │   └── ui/            # shadcn/ui components
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions & Firebase config
│   ├── hooks/             # Custom React hooks
│   └── assets/            # Static assets
├── public/                # Public static files
└── scripts/               # Utility scripts
```

## 🔐 Admin Access

Access the admin panel at `/admin/login`. Configure your admin credentials through Firebase Authentication.

## 📧 Email Configuration

Refer to `EMAILJS_SETUP.md` and `EMAILJS_QUOTE_SETUP.md` for detailed EmailJS integration instructions.

## 📚 Documentation

- [Firebase Setup Guide](FIREBASE_SETUP.md)
- [EmailJS Setup Guide](EMAILJS_SETUP.md)
- [Quote System Documentation](QUOTE_SYSTEM_SUMMARY.md)
- [SEO Setup Guide](SEO_SETUP_GUIDE.md)
- [Testing Checklist](TESTING_CHECKLIST.md)
- [Project Handover Document](PROJECT_HANDOVER.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries, please use the contact form on the website or reach out via WhatsApp integration.
