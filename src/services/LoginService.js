const LoginService = {

  loginUser(credentials) {
    return new Promise(resolve => {
      fetch('https://www.melivecode.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('accessToken', data.accessToken)
          resolve(true);
        });
    })
  },

  isLoggedIn() {
    if (localStorage.getItem('accessToken')) {
      return true;
    }
    return false;
  },

  logout() {
    localStorage.clear();
  }

}

export default LoginService;