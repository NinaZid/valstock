import PicsumService from '../../services/PicsumService.js'
import RouteService from '../services/RouteService.js';
import AlbumService from '../services/AlbumService.js';

const Album = () => {
  const [images, setImages] = React.useState([]);

  let album = AlbumService.getAlbum(RouteService.getParam('id'));

  let promises = [];
  album.images.forEach(i => {
    promises.push(PicsumService.getImage(i));
  })
  Promise.all(promises).then(data => {
    setImages(data);
  })

  const deleteFromAlbum = (album, img) => {
    AlbumService.deleteImage(album, img)
  }

  return (
    <div className="dashboard">
      <h2 className="headerMain">{album.name}</h2>
      <ul className="images">
        {images.map((img, i) => {
          return <li className="dashboardList" key={i}>
            <img src={PicsumService.getOptimizedImage(img)} />
            <span className="remove" onClick={() => deleteFromAlbum(album.id, img.id)}>Remove</span>
          </li>
        })}
      </ul>
      <div className="actionBtn">
        <button className="whiteBtn" onClick={() => RouteService.open('dashboard')}>Go back</button>
      </div>
    </div>
  )
}

export default Album;
