# 🎨 POLINEMA MENGAJAR - FRONTEND STRUCTURE

## Vue 3 + Tailwind CSS + Pinia Implementation

**Date**: January 27, 2026  
**Framework**: Vue 3 (Composition API)  
**Styling**: Tailwind CSS  
**State Management**: Pinia  
**API Communication**: Axios  
**Build Tool**: Vite

---

## 📁 PROJECT STRUCTURE

```
poljar-web-frontend/
│
├── public/
│   ├── poljar.ico
│   └── assets/
│       └── images/
│
├── src/
│   ├── main.js
│   ├── App.vue
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   └── tailwind.css
│   │   └── images/
│   │       └── logo/
│   │
│   ├── components/
│   │   ├── public/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.vue
│   │   │   │   ├── Footer.vue
│   │   │   │   └── MobileMenu.vue
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.vue
│   │   │   │   ├── AboutSection.vue
│   │   │   │   ├── ProgramSection.vue
│   │   │   │   ├── NewsSection.vue
│   │   │   │   ├── TestimonialSection.vue
│   │   │   │   ├── StatsSection.vue
│   │   │   │   └── CTASection.vue
│   │   │   │
│   │   │   ├── news/
│   │   │   │   ├── NewsCard.vue
│   │   │   │   ├── NewsGrid.vue
│   │   │   │   ├── NewsFeatured.vue
│   │   │   │   ├── NewsSidebar.vue
│   │   │   │   ├── NewsCategories.vue
│   │   │   │   ├── NewsTags.vue
│   │   │   │   ├── NewsSearch.vue
│   │   │   │   └── NewsComments.vue
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── BlogCard.vue
│   │   │   │   ├── BlogGrid.vue
│   │   │   │   ├── BlogFeatured.vue
│   │   │   │   ├── BlogSidebar.vue
│   │   │   │   ├── BlogCategories.vue
│   │   │   │   ├── BlogTags.vue
│   │   │   │   └── BlogSearch.vue
│   │   │   │
│   │   │   ├── program/
│   │   │   │   ├── ProgramCard.vue
│   │   │   │   ├── ProgramGrid.vue
│   │   │   │   └── ProgramDetail.vue
│   │   │   │
│   │   │   ├── organization/
│   │   │   │   ├── TeamCard.vue
│   │   │   │   ├── TeamGrid.vue
│   │   │   │   ├── DivisionSection.vue
│   │   │   │   └── MemberProfile.vue
│   │   │   │
│   │   │   ├── contact/
│   │   │   │   ├── ContactForm.vue
│   │   │   │   ├── ContactInfo.vue
│   │   │   │   └── ContactMap.vue
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── NewsletterSubscribe.vue
│   │   │       ├── Pagination.vue
│   │   │       ├── SearchBox.vue
│   │   │       ├── LoadingSpinner.vue
│   │   │       ├── ErrorMessage.vue
│   │   │       └── Breadcrumb.vue
│   │   │
│   │   └── admin/
│   │       └── (shadcn-vue components will go here)
│   │
│   ├── views/
│   │   ├── public/
│   │   │   ├── Home.vue
│   │   │   ├── About.vue
│   │   │   ├── Programs.vue
│   │   │   ├── ProgramDetail.vue
│   │   │   ├── News.vue
│   │   │   ├── NewsDetail.vue
│   │   │   ├── Blog.vue
│   │   │   ├── BlogDetail.vue
│   │   │   ├── Organization.vue
│   │   │   ├── Contact.vue
│   │   │   └── Partnership.vue
│   │   │
│   │   └── admin/
│   │       └── (admin views will go here)
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── stores/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── news.js
│   │   ├── blog.js
│   │   ├── program.js
│   │   ├── organization.js
│   │   ├── newsletter.js
│   │   └── ui.js
│   │
│   ├── services/
│   │   ├── api.js (axios instance)
│   │   ├── auth.service.js
│   │   ├── news.service.js
│   │   ├── blog.service.js
│   │   ├── program.service.js
│   │   ├── organization.service.js
│   │   ├── newsletter.service.js
│   │   └── upload.service.js
│   │
│   ├── composables/
│   │   ├── useAuth.js
│   │   ├── useNews.js
│   │   ├── useBlog.js
│   │   ├── useProgram.js
│   │   ├── useOrganization.js
│   │   ├── usePagination.js
│   │   ├── useSearch.js
│   │   └── useToast.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   └── config/
│       └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 📦 PACKAGE.JSON

```json
{
  "name": "polinema-mengajar-frontend",
  "version": "1.0.0",
  "description": "Polinema Mengajar - Frontend Vue 3 Application",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  },
  "dependencies": {
    "vue": "^3.4.15",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "axios": "^1.6.5",
    "@vueuse/core": "^10.7.2",
    "dayjs": "^1.11.10",
    "vue-toastification": "^2.0.0-rc.5",
    "vue3-carousel": "^0.3.1",
    "swiper": "^11.0.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.3",
    "vite": "^5.0.11",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-plugin-vue": "^9.20.1",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "@tailwindcss/aspect-ratio": "^0.4.2"
  }
}
```

---

## 🔧 CONFIGURATION FILES

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Vollkorn', 'serif'],
      },
      colors: {
        primary: {
          orange: '#FF8C42',
          navy: '#1E3A5F',
          blue: '#4A90E2',
        },
      },
      maxWidth: {
        '350px': '1400px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/10': '16 / 10',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🎯 ENVIRONMENT VARIABLES

### .env.example

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000

# Application
VITE_APP_NAME="Polinema Mengajar"
VITE_APP_URL=http://localhost:3000

# Storage
VITE_STORAGE_URL=http://localhost:8000/storage

# Features
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false

# Social Media
VITE_INSTAGRAM_URL=https://instagram.com/polinemamengajar
VITE_YOUTUBE_URL=https://youtube.com/@polinemamengajar
VITE_EMAIL=info@polinemamengajar.org
```

---

## 🚀 INSTALLATION STEPS

### 1. Create Project

```bash
# Create Vue 3 project with Vite
npm create vite@latest polinema-mengajar-frontend -- --template vue

# Navigate to project
cd polinema-mengajar-frontend
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Tailwind plugins
npm install -D @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio

# Install Vue Router
npm install vue-router@4

# Install Pinia
npm install pinia

# Install Axios
npm install axios

# Install VueUse utilities
npm install @vueuse/core

# Install date library
npm install dayjs

# Install toast notifications
npm install vue-toastification@next

# Install carousel (optional)
npm install vue3-carousel swiper
```

### 3. Setup Tailwind CSS

```bash
# Create tailwind.css file
mkdir -p src/assets/css
```

Create `src/assets/css/tailwind.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply font-sans;
  }
}

@layer utilities {
  .nav-scrolled {
    @apply bg-white/95 backdrop-blur-md shadow-md;
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .accordion-content.active {
    max-height: 500px;
  }

  .accordion-icon {
    transition: transform 0.3s ease;
  }

  .accordion-icon.active {
    transform: rotate(45deg);
  }
}
```

### 4. Project Structure Setup

```bash
# Create all necessary directories
mkdir -p src/{components,views,router,stores,services,composables,utils,config}
mkdir -p src/components/{public,admin}
mkdir -p src/components/public/{layout,home,news,blog,program,organization,contact,shared}
mkdir -p src/views/{public,admin}
mkdir -p public/assets/images
```

### 5. Copy Configuration Files

Copy all configuration files provided above to their respective locations.

### 6. Run Development Server

```bash
npm run dev
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Core Setup ✅

- [ ] Install all dependencies
- [ ] Configure Tailwind CSS
- [ ] Setup routing (Vue Router)
- [ ] Setup state management (Pinia)
- [ ] Configure Axios instance
- [ ] Create environment variables

### Phase 2: Layout Components

- [ ] Create Navbar component
- [ ] Create Footer component
- [ ] Create MobileMenu component
- [ ] Create main layout wrapper

### Phase 3: Public Pages

- [ ] Home page
  - [ ] Hero section
  - [ ] About section
  - [ ] Programs section
  - [ ] News section
  - [ ] Stats section
  - [ ] CTA section

- [ ] News/Blog
  - [ ] News listing page
  - [ ] News detail page
  - [ ] Blog listing page
  - [ ] Blog detail page
  - [ ] Sidebar components
  - [ ] Search functionality
  - [ ] Categories/Tags filtering

- [ ] Other Pages
  - [ ] Programs page
  - [ ] About Us page
  - [ ] Organization page
  - [ ] Contact page
  - [ ] Partnership page

### Phase 4: Services & Stores

- [ ] Setup API service layer
- [ ] Create Pinia stores for each module
- [ ] Create composables for reusable logic
- [ ] Error handling utilities

### Phase 5: Admin Panel (Shadcn Vue)

- [ ] Install Shadcn Vue
- [ ] Create admin layout
- [ ] Dashboard components
- [ ] CRUD components

### Phase 6: Testing & Optimization

- [ ] Component testing
- [ ] E2E testing (optional)
- [ ] Performance optimization
- [ ] SEO optimization

---

## 🎨 DESIGN PRINCIPLES

### Maintained from Laravel Blade

1. **Exact Same Styling** - All Tailwind classes preserved
2. **Color Scheme** - Primary orange, navy, blue unchanged
3. **Typography** - Plus Jakarta Sans & Vollkorn fonts
4. **Spacing & Layout** - Grid systems, padding, margins identical
5. **Animations** - Hover effects, transitions matched
6. **Responsive Design** - Mobile-first approach maintained

### Vue 3 Enhancements

1. **Component-Based** - Modular, reusable components
2. **Reactive State** - Pinia for global state management
3. **Composition API** - Modern, TypeScript-ready approach
4. **Performance** - Lazy loading, code splitting
5. **Developer Experience** - Hot reload, better debugging

---

## 🔌 API INTEGRATION

### Axios Instance Configuration

```javascript
// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api/' + import.meta.env.VITE_API_VERSION,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors globally
    return Promise.reject(error)
  },
)

export default api
```

---

## 🎯 NEXT STEPS

1. **Setup Project** - Follow installation steps
2. **Create Core Components** - Layout, navigation
3. **Implement Public Pages** - Start with Home page
4. **Connect to Backend API** - Integrate with Laravel backend
5. **Add Admin Panel** - Shadcn Vue components
6. **Testing & Deployment** - QA and production build

---

**Ready to start building! 🚀**
