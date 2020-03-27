class Auth {
  constructor() {
    this.authenticated = false;
    this._id = undefined;
    this._token = undefined;
  }

  async login(cb) {
	const response = await fetch('http://localhost:4000/authenticate', {
  		method: 'POST',
  		headers: { 'Content-Type': 'application/json' },
  		body: JSON.stringify({ username: 'testd', password: 'test' }),
	})
    var data = await response.json();

	console.log(data.token)
  	//Set authenticated
  	this.token = data.token;
  	this._id = data._id;
  	if(this._id && this.token){
  		this.authenticated = true;
  		console.log('set')
  	}
    
    cb(data.token);
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();