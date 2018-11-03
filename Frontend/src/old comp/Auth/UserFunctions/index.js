

export const register = newUser => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/users`,
    {
      method: 'POST',
      headers: {
        'Accept': 'Application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: newUser.email, 
        password: newUser.password,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        role: newUser.role
      })
    })
    .then(response => response.json())
    .then((result) => {
      console.log(result.message);
      alert(result.message);
    })
    .catch(err => {
      console.log('err', err);
    });

};

export const login = user => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/login`,
    {
      method: 'POST',
      headers: {
        'Accept': 'Application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, password: user.password })
    })
    .then(response => response.json())
    .then((user) => {
      if (!user.token) {
        console.log('Authentication failed');
        alert('authenrication failed');
      } else {
        console.log('usertoken: ' + user.token); // for testing
        localStorage.setItem('usertoken', JSON.stringify(user.token));

      }
    })
    .catch(err => console.log('err', err));

};

