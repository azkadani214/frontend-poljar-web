/**
 * Check if the user has a specific permission
 * @param {string} permission 
 * @returns {boolean}
 */
export const can = (permission) => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return false
  
  try {
    const user = JSON.parse(userStr)
    const userPermissions = user.permissions || []
    
    // Super admin has all permissions
    if (userPermissions.includes('*')) {
      return true
    }
    
    return userPermissions.includes(permission)
  } catch (e) {
    return false
  }
}

/**
 * Check if the user has a specific role
 * @param {string} roleName 
 * @returns {boolean}
 */
export const hasRole = (roleName) => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return false
  
  try {
    const user = JSON.parse(userStr)
    const userRoles = user.roles || []
    
    return userRoles.some(role => role.name === roleName)
  } catch (e) {
    return false
  }
}

/**
 * Check if the user has any of the specified roles
 * @param {string[]} roleNames 
 * @returns {boolean}
 */
export const hasAnyRole = (roleNames) => {
  return roleNames.some(role => hasRole(role))
}
