const fs = require('fs')
const path = require('path')

const basePath = 'C:\\laragon\\www\\poljar-web-frontend'
const plannedFiles = [
  'src/main.js',
  'src/App.vue',
  'src/assets/css/tailwind.css',
  'src/components/public/layout/Navbar.vue',
  'src/components/public/layout/Footer.vue',
  'src/components/public/layout/MobileMenu.vue',
  'src/components/public/home/HeroSection.vue',
  'src/components/public/home/AboutSection.vue',
  'src/components/public/home/ProgramSection.vue',
  'src/components/public/home/NewsSection.vue',
  'src/components/public/home/TestimonialSection.vue',
  'src/components/public/home/StatsSection.vue',
  'src/components/public/home/CTASection.vue',
  'src/components/public/news/NewsCard.vue',
  'src/components/public/news/NewsGrid.vue',
  'src/components/public/news/NewsFeatured.vue',
  'src/components/public/news/NewsSidebar.vue',
  'src/components/public/news/NewsCategories.vue',
  'src/components/public/news/NewsTags.vue',
  'src/components/public/news/NewsSearch.vue',
  'src/components/public/news/NewsComments.vue',
  'src/components/public/blog/BlogCard.vue',
  'src/components/public/blog/BlogGrid.vue',
  'src/components/public/blog/BlogFeatured.vue',
  'src/components/public/blog/BlogSidebar.vue',
  'src/components/public/blog/BlogCategories.vue',
  'src/components/public/blog/BlogTags.vue',
  'src/components/public/blog/BlogSearch.vue',
  'src/components/public/program/ProgramCard.vue',
  'src/components/public/program/ProgramGrid.vue',
  'src/components/public/program/ProgramDetail.vue',
  'src/components/public/organization/TeamCard.vue',
  'src/components/public/organization/TeamGrid.vue',
  'src/components/public/organization/DivisionSection.vue',
  'src/components/public/organization/MemberProfile.vue',
  'src/components/public/contact/ContactForm.vue',
  'src/components/public/contact/ContactInfo.vue',
  'src/components/public/contact/ContactMap.vue',
  'src/components/public/shared/NewsletterSubscribe.vue',
  'src/components/public/shared/Pagination.vue',
  'src/components/public/shared/SearchBox.vue',
  'src/components/public/shared/LoadingSpinner.vue',
  'src/components/public/shared/ErrorMessage.vue',
  'src/components/public/shared/Breadcrumb.vue',
  'src/views/public/Home.vue',
  'src/views/public/About.vue',
  'src/views/public/Programs.vue',
  'src/views/public/ProgramDetail.vue',
  'src/views/public/News.vue',
  'src/views/public/NewsDetail.vue',
  'src/views/public/Blog.vue',
  'src/views/public/BlogDetail.vue',
  'src/views/public/Organization.vue',
  'src/views/public/Contact.vue',
  'src/views/public/Partnership.vue',
  'src/router/index.js',
  'src/stores/index.js',
  'src/stores/auth.js',
  'src/stores/news.js',
  'src/stores/blog.js',
  'src/stores/program.js',
  'src/stores/organization.js',
  'src/stores/newsletter.js',
  'src/stores/ui.js',
  'src/services/api.js',
  'src/services/auth.service.js',
  'src/services/news.service.js',
  'src/services/blog.service.js',
  'src/services/program.service.js',
  'src/services/organization.service.js',
  'src/services/newsletter.service.js',
  'src/services/upload.service.js',
  'src/composables/useAuth.js',
  'src/composables/useNews.js',
  'src/composables/useBlog.js',
  'src/composables/useProgram.js',
  'src/composables/useOrganization.js',
  'src/composables/usePagination.js',
  'src/composables/useSearch.js',
  'src/composables/useToast.js',
  'src/utils/helpers.js',
  'src/utils/validators.js',
  'src/utils/formatters.js',
  'src/utils/constants.js',
  'src/config/app.js',
]

const results = {
  empty: [],
  missing: [],
  ready: [],
}

plannedFiles.forEach((relPath) => {
  const fullPath = path.join(basePath, relPath.replace(/\//g, path.sep))
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath)
    if (stats.size === 0) {
      results.empty.push(relPath)
    } else {
      results.ready.push(relPath)
    }
  } else {
    results.missing.push(relPath)
  }
})

console.log(JSON.stringify(results, null, 2))
