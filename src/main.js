import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import canDirective from './directives/can'

// Import Tailwind CSS
import './assets/css/main.css'

// Create Vue app
const app = createApp(App)

// Directives
app.directive('can', canDirective)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Use i18n
app.use(i18n)

// Use Toast notifications
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 3,
  newestOnTop: true,
})

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
}

// Mount app
app.mount('#app')
