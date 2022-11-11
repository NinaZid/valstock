const { useEffect } = React;
const { createRoot } = ReactDOM;
import Login from './src/components/pages/Login.js'
import Header from './src/components/Header.js';
import Dashboard from './src/components/pages/Dashboard.js';
import Success from './src/components/Success.js';
import Details from './src/pages/Details.js';
import RouteService from './src/services/RouteService.js';
import Album from './src/pages/Album.js';
import AppContext from './src/contexts/AppContext.js';

const ReactAppFromCDN = () => {
    const [message, setMessage] = React.useState(null);
    const setAppMessage = (msg) => {
        setMessage(msg)
    };

    const [route, setRoute] = React.useState(() => window.location.hash);

    const hashChanged = () => {
        setRoute(window.location.hash);
    }

    useEffect(() => {
        window.addEventListener('hashchange', hashChanged);

        return () => {
            window.removeEventListener('hashchange', hashChanged);
        }
    }, []);

    let content = null;
    switch (RouteService.getAction()) {
        case '':
        case 'login':
            content = <Login />;
            break;
        case 'dashboard':
            content = <Dashboard />;
            break;
        case 'details':
            content = <Details />
            break;
        case 'album':
            content = <Album />;
            break;
    }

    return (
        <div>
            <AppContext.Provider value={{ message, setAppMessage }}>
                <Header />
                {content}
                <Success />
            </AppContext.Provider>
        </div>
    )
}

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<ReactAppFromCDN />);