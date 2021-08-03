export default function authHeader() {
    let token = sessionStorage.getItem('token');
  
    if (token !== undefined) {
      return { Authorization: 'Bearer ' + token};
    } else {
      return {};
    }
  }