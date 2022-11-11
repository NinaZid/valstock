const { useEffect } = React;
import PicsumService from '../../services/PicsumService.js'
import usePrivateRoute from '../hooks/usePrivateRoute.js';
import Popup from '../components/Popup.js';
import RouteService from '../services/RouteService.js';
import Success from '../components/Success.js';

const Dashboard = () => {
  if (!usePrivateRoute())
    return null;

  const [images, setImages] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const loadImages = () => {
    PicsumService.list().then(data => {
      PicsumService.getOptimizedImage(data);
      setImages(data)
    });
  }

  useEffect(() => {
    loadImages()
  }, []);

  const imageDetails = (id) => {
    RouteService.open('details/id/' + id);
  }

  const addToAlbum = (image_id) => {
    setSelectedImage(image_id)
    setShowPopup(true)
  }

  return (
    <div className="dashboard">
      <ul className="images">
        {
          images.map(i => {
            return (
              <li className="dashboardList" key={i.id}>
                <img src={PicsumService.getOptimizedImage(i)}
                  alt={i.autor}
                  onClick={() => imageDetails(i.id)}
                />
                <span className="caption" onClick={() => addToAlbum(i.id)}>Add to album</span>
              </li>
            )
          })
        }
      </ul>
      {showPopup && <Popup openPopup={setShowPopup} image_id={selectedImage} />}
      {showSuccessMsg && <Success />}
    </div>
  )
}

export default Dashboard;