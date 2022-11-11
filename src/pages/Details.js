const { useEffect } = React;
import PicsumService from '../../services/PicsumService.js'
import RouteService from '../services/RouteService.js';
import Popup from '../components/Popup.js';

const Details = () => {
  const [image, setImage] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const loadImage = (id) => {
    PicsumService.getImage(id).then(data => {
      setImage(data);
    });
  }

  useEffect(() => {
    loadImage(RouteService.getParam('id'));
  }, []);

  const goBack = () => {
    RouteService.open('dashboard');
  }

  const downloadImg = (url) => {
    PicsumService.downloadImage(url)
  }

  const addToAlbum = (image_id) => {
    setSelectedImage(image_id)
    setShowPopup(true)
  }

  return image === null ? null : (
    <div className="details">
      <div className="actionBtn">
        <button className="whiteBtn" onClick={() => addToAlbum(image.id)}>Add to album +</button>
        <button className="detailsBtns" onClick={() => downloadImg(image.download_url)}>Download</button>
      </div>
      <div className="imgDetails">
        <img src={PicsumService.getOptimizedImage(image)} />
      </div>
      <h3 className="uploaded">Uploaded by</h3>
      <h2>{image.author}</h2>
      <button className="whiteBtn" onClick={goBack}>Go back</button>
      {showPopup && <Popup openPopup={setShowPopup} image_id={selectedImage} />}
    </div>
  )
}

export default Details;
