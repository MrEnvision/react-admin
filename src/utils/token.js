export function setToken(data) {
  sessionStorage.setItem('adminToken', data);
}

export function getToken() {
  return sessionStorage.getItem('adminToken');
}
