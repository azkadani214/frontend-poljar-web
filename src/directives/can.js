import { can } from '@/utils/permissions'

export default {
  mounted(el, binding) {
    const permission = binding.value
    
    if (!can(permission)) {
      el.style.display = 'none'
      // Or remove from DOM:
      // el.parentNode?.removeChild(el)
    }
  },
  updated(el, binding) {
    const permission = binding.value
    
    if (!can(permission)) {
      el.style.display = 'none'
    } else {
      el.style.display = ''
    }
  }
}
