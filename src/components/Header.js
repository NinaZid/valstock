import LoginService from '../services/LoginService';
import RouteService from '../services/RouteService';
import AlbumService from '../services/AlbumService';

const Header = () => {

  const [showAlbums, setShowAlbums] = React.useState(false);

  const myAlbums = AlbumService.getAlbums();

  const logout = () => {
    LoginService.logout();
    window.location.hash = 'login';
  }

  const home = () => {
    RouteService.open('dashboard');
  }

  return (
    <div className="nav">
      <div className="logo">
        <img src="../src/static/logo.png" onClick={home} />
      </div>
      {LoginService.isLoggedIn() &&
        <div>
          <button className="navBtns" onClick={() => setShowAlbums(!showAlbums)}>My albums</button>
          {showAlbums &&
            <ul className="albums-dropdown">
              {myAlbums.map(a => {
                return <li className="listAlbums" key={a.id} onClick={() => RouteService.open('album/id/' + a.id)}>{a.name} </li>
              })}
            </ul>
          }
          <button className="navBtns" onClick={() => logout()}>Logout</button>
        </div>
      }
    </div>

  )
}

export default Header;