import api from  '@axios'

export function login(username, password) {
  return api.post('/members/login/', { username, password })
}
  
export function register(user) {
  return api.post('/members/register', user)
}
  
export function logout() {
  return api.post(`/logout`)
}
