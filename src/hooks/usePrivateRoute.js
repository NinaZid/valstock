import LoginService from "../services/LoginService";
import RouteService from "../services/RouteService";

export default function () {
    
    const [loggedIn] = React.useState(LoginService.isLoggedIn());

    React.useEffect(() => {
        if (!loggedIn)
            RouteService.open('login');
    }, []);

    return loggedIn;
};