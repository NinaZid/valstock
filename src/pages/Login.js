import LoginService from '../../services/LoginService.js'
import Footer from '../Footer.js';
import RouteService from '../services/RouteService.js';

const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({ username: [], password: [] });

    if (LoginService.isLoggedIn()) {
        RouteService.open('dashboard');
    }

    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const submit = () => {
        if (!validate())
            return false;
        LoginService.loginUser({
            username,
            password
        }).then(success => {
            RouteService.open("dashboard");
        })
    }

    const validate = () => {
        let err = { username: [], password: [] };

        if (username.length < 2)
            err.username.push('Username should be at least 2 characters.');
        if (username.indexOf('@') === -1)
            err.username.push('Username should be an email.')
        if (password.length < 6)
            err.password.push('Password should be at least 6 characters.');
        setErrors(err);

        if (err.username.length > 0 || err.password.length > 0)
            return false;

        return true;
    }

    return (
        <React.Fragment>
            <div>
                <h1 className="headerMain">Join our stock community!</h1>
                <p className="headerParagraph">Download free photos and videos powered by the best photographers.</p>
            </div>
            <div className="wrapper">
                <label className="label">Username</label>
                <input type="text" placeholder="Enter username here..." name="username" className="loginInput" onChange={handleChange}></input>
                {errors.username.map((e, i) => <small key={i} className="error">{e}</small>)}
                <label className="label">Password</label>
                <input type="password" placeholder="Enter password here..." name="password" className="loginInput" onChange={handleChange}></input>
                {errors.password.map((e, i) => <small key={i} className="error">{e}</small>)}
                <button className="loginBtn" onClick={submit}>Log in</button>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Login;