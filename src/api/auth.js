import api from  '@axios'

export function login(email, password) {
  return api.post('/login', { email, password })
}
  
export function register(user) {
  return api.post('/register', user)
}
  
export function logout() {
  return api.post(`/logout`)
}
