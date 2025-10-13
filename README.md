# Hangatek Website - Modular Structure

This is the modularized version of the Hangatek IT services company website. The project has been broken down into organized, maintainable components while preserving all original functionality.

## 📁 Project Structure

```
Hangatek-ltd/
├── css/
│   ├── main.css                 # Main CSS file (imports all components)
│   ├── combined.css             # Built combined CSS file
│   ├── base.css                 # Base styles and variables
│   ├── components/              # Component-specific CSS
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── modals.css
│   │   └── whatsapp.css
│   └── sections/                # Section-specific CSS
│       ├── hero.css
│       ├── about.css
│       ├── services.css
│       ├── portfolio.css
│       ├── testimonials.css
│       ├── team.css
│       ├── faq.css
│       └── contact.css
├── js/
│   ├── main.js                  # Main JS file (imports all modules)
│   ├── combined.js              # Built combined JS file
│   └── modules/                 # Modular JavaScript files
│       ├── dom-elements.js      # DOM element references
│       ├── state.js             # State management
│       ├── header.js            # Header functionality
│       ├── carousel.js          # Carousel functionality
│       ├── testimonials.js      # Testimonials functionality
│       ├── portfolio.js         # Portfolio filtering
│       ├── faq.js               # FAQ accordion
│       └── forms.js             # Form handling
├── components/                   # Reusable HTML components
│   ├── header.html
│   ├── footer.html
│   └── modals.html
├── sections/                     # Page sections
│   ├── hero.html
│   ├── about.html
│   ├── services.html
│   ├── portfolio.html
│   ├── testimonials.html
│   ├── team.html
│   ├── faq.html
│   └── contact.html
├── index.html                   # Built single-page HTML
├── index-modular.html           # Modular version (requires server)
├── build.js                     # Build script
└── README.md                    # This file
```

## 🚀 How to Use

### Option 1: Use the Built Files (Recommended)
The build script has already created combined files that work without a server:
- `index.html` - Complete single-page HTML
- `css/combined.css` - All CSS combined
- `js/combined.js` - All JavaScript combined

Simply open `index.html` in a browser.

### Option 2: Use Modular Files
For development with live reloading:
1. Serve the files using a local server (e.g., `python -m http.server` or `live-server`)
2. Open `index-modular.html` in your browser

### Option 3: Rebuild from Modules
To rebuild the combined files:
```bash
node build.js
```

## 🎯 Features Preserved

All original functionality has been maintained:
- ✅ Responsive navigation with mobile menu
- ✅ Hero section with service carousel
- ✅ Smooth scrolling navigation
- ✅ Portfolio filtering
- ✅ Testimonials carousel with autoplay
- ✅ FAQ accordion
- ✅ Contact and project request forms
- ✅ Modal dialogs
- ✅ WhatsApp floating button
- ✅ Scroll animations
- ✅ Touch/swipe support for mobile

## 🛠️ Development Benefits

### Modular Structure
- **Maintainable**: Each component is in its own file
- **Reusable**: Components can be easily reused
- **Scalable**: Easy to add new sections or components
- **Organized**: Clear separation of concerns

### CSS Organization
- **Base styles**: Common styles and variables
- **Component styles**: Specific to individual components
- **Section styles**: Specific to page sections
- **Responsive**: All responsive styles included

### JavaScript Modules
- **HeaderManager**: Handles navigation and scroll effects
- **CarouselManager**: Manages service carousel
- **TestimonialsManager**: Handles testimonials carousel
- **PortfolioManager**: Manages portfolio filtering
- **FAQManager**: Handles FAQ accordion
- **FormsManager**: Manages all form interactions

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Customization

To modify the website:
1. Edit the relevant component/section files
2. Run `node build.js` to rebuild
3. Or use the modular version for development

## 📞 Contact Information

- **Company**: Hangatek
- **Address**: 11 KG 248 St, Kigali, Rwanda
- **Phone**: +(250) 789 534 491
- **Email**: info@hangatek.com
- **Website**: Code Your Future

---

*This modular structure makes the Hangatek website more maintainable and easier to work with while preserving all original functionality.*
