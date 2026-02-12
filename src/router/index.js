import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Public Layout
const PublicLayout = () => import('@/views/layouts/PublicLayout.vue')

// Admin Layout
const AdminLayout = () => import('@/views/layouts/AdminLayout.vue')

// Public Pages
const Home = () => import('@/views/public/Home.vue')
const About = () => import('@/views/public/About.vue')
const Programs = () => import('@/views/public/Programs.vue')
const ProgramDetail = () => import('@/views/public/ProgramDetail.vue')
const News = () => import('@/views/public/News.vue')
const NewsDetail = () => import('@/views/public/NewsDetail.vue')
const NewsletterVerify = () => import('@/views/public/newsletter/Verify.vue')
const NewsletterUnsubscribe = () => import('@/views/public/newsletter/Unsubscribe.vue')
const NewsletterPreferences = () => import('@/views/public/newsletter/Preferences.vue')
const Blog = () => import('@/views/public/Blog.vue')
const BlogDetail = () => import('@/views/public/BlogDetail.vue')
const Organization = () => import('@/views/public/Organization.vue')
const Contact = () => import('@/views/public/Contact.vue')
const Partnership = () => import('@/views/public/Partnership.vue')

// Admin Pages
const AdminTokenGate = () => import('@/views/admin/auth/AdminTokenGate.vue')
const AdminLogin = () => import('@/views/admin/Login.vue')
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')
const AdminNews = () => import('@/views/admin/news/Index.vue')
const AdminNewsCreate = () => import('@/views/admin/news/Create.vue')
const AdminNewsEdit = () => import('@/views/admin/news/Edit.vue')
const AdminNewsCategories = () => import('@/views/admin/news/categories/Index.vue')
const AdminUsers = () => import('@/views/admin/users/Index.vue')
const AdminOrganization = () => import('@/views/admin/organization/Index.vue')
const AdminBlog = () => import('@/views/admin/blog/Index.vue')
const AdminBlogCreate = () => import('@/views/admin/blog/Create.vue')
const AdminBlogEdit = () => import('@/views/admin/blog/Edit.vue')
const AdminBlogCategories = () => import('@/views/admin/blog/categories/Index.vue')
const AdminAnalytics = () => import('@/views/admin/analytics/Index.vue')
const AdminComments = () => import('@/views/admin/comments/Index.vue')
const AdminNewsletter = () => import('@/views/admin/newsletter/SubscriberList.vue')
const AdminCampaigns = () => import('@/views/admin/newsletter/CampaignManager.vue')
const AdminSettings = () => import('@/views/admin/settings/Index.vue')
const AdminProfile = () => import('@/views/admin/profile/Index.vue')
const AdminProfileWizard = () => import('@/views/admin/profile/Wizard.vue')
const AdminRoles = () => import('@/views/admin/roles/Index.vue')
const AdminActivities = () => import('@/views/admin/activities/Index.vue')

const routes = [
  // ============================================
  // PUBLIC ROUTES
  // ============================================
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          title: 'Beranda - Polinema Mengajar',
          description: 'Gerakan Sosial Mahasiswa Polinema untuk Pendidikan',
        },
      },
      {
        path: 'tentang-kami',
        name: 'about',
        component: About,
        meta: { title: 'Tentang Kami - Polinema Mengajar' },
      },
      {
        path: 'program',
        name: 'programs',
        component: Programs,
        meta: { title: 'Program - Polinema Mengajar' },
      },
      {
        path: 'program/:slug',
        name: 'program-detail',
        component: ProgramDetail,
        meta: { title: 'Detail Program - Polinema Mengajar' },
      },
      {
        path: 'berita',
        name: 'news',
        component: News,
        meta: { title: 'Berita - Polinema Mengajar' },
      },
      {
        path: 'berita/:slug',
        name: 'news-detail',
        component: NewsDetail,
        meta: { title: 'Detail Berita - Polinema Mengajar' },
      },
      {
        path: 'blog',
        name: 'blog',
        component: Blog,
        meta: { title: 'Blog - Polinema Mengajar' },
      },
      {
        path: 'blog/:slug',
        name: 'blog-detail',
        component: BlogDetail,
        meta: { title: 'Detail Blog - Polinema Mengajar' },
      },
      {
        path: 'organisasi',
        name: 'organization',
        component: Organization,
        meta: { title: 'Organisasi - Polinema Mengajar' },
      },
      {
        path: 'kontak',
        name: 'contact',
        component: Contact,
        meta: { title: 'Kontak - Polinema Mengajar' },
      },
      {
        path: 'kemitraan',
        name: 'partnership',
        component: Partnership,
        meta: { title: 'Kemitraan - Polinema Mengajar' },
      },
      {
        path: 'newsletter/verify',
        name: 'newsletter-verify',
        component: NewsletterVerify,
        meta: { title: 'Verifikasi Newsletter - Polinema Mengajar' },
      },
      {
        path: 'newsletter/unsubscribe',
        name: 'newsletter-unsubscribe',
        component: NewsletterUnsubscribe,
        meta: { title: 'Berhenti Berlangganan - Polinema Mengajar' },
      },
      {
        path: 'newsletter/preferences',
        name: 'newsletter-preferences',
        component: NewsletterPreferences,
        meta: { title: 'Preferensi Newsletter - Polinema Mengajar' },
      },
    ],
  },

  // ============================================
  // ADMIN ROUTES
  // ============================================

  // Admin Token Gate (Layer 1)
  {
    path: '/admin-gate',
    name: 'admin-token-gate',
    component: AdminTokenGate,
    meta: { title: 'Admin Access Gate - Polinema Mengajar' },
  },

  // Admin Login (Layer 2)
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
    meta: { title: 'Admin Login - Polinema Mengajar', guest: true },
  },

  // Admin Protected Routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard,
        meta: { title: 'Dashboard - Admin' },
      },
      {
        path: 'news',
        name: 'admin-news',
        component: AdminNews,
        meta: { title: 'Kelola Berita - Admin', permission: 'berita.view' },
      },
      {
        path: 'news/create',
        name: 'admin-news-create',
        component: AdminNewsCreate,
        meta: { title: 'Tambah Berita - Admin', permission: 'berita.create' },
      },
      {
        path: 'news/:id/edit',
        name: 'admin-news-edit',
        component: AdminNewsEdit,
        meta: { title: 'Edit Berita - Admin', permission: 'berita.update' },
      },
      {
        path: 'news/categories',
        name: 'admin-news-categories',
        component: AdminNewsCategories,
        meta: { title: 'Kategori Berita - Admin', permission: 'berita.update' },
      },
      {
        path: 'blog',
        name: 'admin-blog',
        component: AdminBlog,
        meta: { title: 'Kelola Blog - Admin', permission: 'blog.view' },
      },
      {
        path: 'blog/create',
        name: 'admin-blog-create',
        component: AdminBlogCreate,
        meta: { title: 'Tulis Artikel - Admin', permission: 'blog.create' },
      },
      {
        path: 'blog/:id/edit',
        name: 'admin-blog-edit',
        component: AdminBlogEdit,
        meta: { title: 'Edit Artikel - Admin', permission: 'blog.update' },
      },
      {
        path: 'blog/categories',
        name: 'admin-blog-categories',
        component: AdminBlogCategories,
        meta: { title: 'Kategori Blog - Admin', permission: 'blog.update' },
      },
      {
        path: 'users',
        name: 'admin-users',
        component: AdminUsers,
        meta: { title: 'Kelola Pengguna - Admin', permission: 'pengguna.view' },
      },
      {
        path: 'roles',
        name: 'admin-roles',
        component: AdminRoles,
        meta: { title: 'Peran & Izin - Admin', permission: 'sistem.view' },
      },
      {
        path: 'organization',
        name: 'admin-organization',
        component: AdminOrganization,
        meta: { title: 'Kelola Organisasi - Admin', permission: 'organisasi.view' },
      },
      {
        path: 'analytics',
        name: 'admin-analytics',
        component: AdminAnalytics,
        meta: { title: 'Statistik & Analitik - Admin', permission: 'sistem.view' },
      },
      {
        path: 'comments',
        name: 'admin-comments',
        component: AdminComments,
        meta: { title: 'Kelola Komentar - Admin', permission: 'blog.view' },
      },
      {
        path: 'newsletter',
        name: 'admin-newsletter',
        component: AdminNewsletter,
        meta: { title: 'Newsletter - Admin', permission: 'sistem.view' },
      },
      {
        path: 'newsletter/campaigns',
        name: 'admin-campaigns',
        component: AdminCampaigns,
        meta: { title: 'Kampanye - Admin', permission: 'sistem.view' },
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: AdminSettings,
        meta: { title: 'Pengaturan Sistem - Admin', permission: 'sistem.update' },
      },
      {
        path: 'activities',
        name: 'admin-activities',
        component: AdminActivities,
        meta: { title: 'Log Aktivitas - Admin', permission: 'sistem.view' },
      },
      {
        path: 'profile',
        name: 'admin-profile',
        component: AdminProfile,
        meta: { title: 'Profil Saya - Admin' },
      },
      {
        path: 'profile/wizard',
        name: 'admin-profile-wizard',
        component: AdminProfileWizard,
        meta: { title: 'Lengkapi Profil - Admin' },
      },
    ],
  },

  // 404 Not Found
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '404 - Halaman Tidak Ditemukan' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'Polinema Mengajar'

  // Update meta description
  if (to.meta.description) {
    let descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', to.meta.description)
    }
  }

  // Check authentication for admin routes
  const token = localStorage.getItem('auth_token')
  const adminAccessToken = import.meta.env.VITE_ADMIN_ACCESS_TOKEN
  const sessionAdminToken = sessionStorage.getItem('admin_access_token')

  // Check if trying to access any admin route (excluding the gate itself)
  if (to.path.startsWith('/admin') && to.name !== 'admin-token-gate') {
    // Layer 1 Check: Admin Access Token
    if (!sessionAdminToken || sessionAdminToken !== adminAccessToken) {
      next({ name: 'admin-token-gate', query: { redirect: to.fullPath } })
      return
    }

    // Layer 2 Check: User Auth Token (for protected routes)
    if (to.meta.requiresAuth && !token) {
      next({ name: 'admin-login', query: { redirect: to.fullPath } })
      return
    }

    // Permission Check
    if (to.meta.permission) {
      const authStore = useAuthStore()
      // Sync user if not loaded
      if (!authStore.currentUser && token) {
        try {
          await authStore.fetchUser()
        } catch (e) {
          next({ name: 'admin-login' })
          return
        }
      }

      if (!authStore.hasPermission(to.meta.permission)) {
        toast.error('Akses Ditolak: Anda tidak memiliki izin untuk halaman ini.')
        next({ name: 'admin-dashboard' })
        return
      }
    }

    // Redirect logged in users away from login page
    if (to.meta.guest && token) {
      next({ name: 'admin-dashboard' })
      return
    }
  }

  // Auto redirect from gate if already authenticated at Layer 1
  if (to.name === 'admin-token-gate' && sessionAdminToken === adminAccessToken) {
    if (token) {
      next({ name: 'admin-dashboard' })
    } else {
      next({ name: 'admin-login' })
    }
    return
  }

  next()
})

export default router
