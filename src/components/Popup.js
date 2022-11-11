const { useContext } = React;
import AlbumService from '../services/AlbumService.js';
import AppContext from '../contexts/AppContext.js';

const Popup = ({ openPopup, image_id }) => {

  const appContext = useContext(AppContext)
  const [albumName, setAlbumName] = React.useState('');
  const [selected, setSelected] = React.useState('');
  const [newAlbum, setNewAlbum] = React.useState(true);

  const handleChange = (event) => {
    setAlbumName(event.target.value);
  }

  const handleChangeSelect = (event) => {
    setSelected(event.target.value);
  }

  const createAlbum = () => {
    if (newAlbum === true) {
      let album_id = AlbumService.createAlbum(albumName)
      AlbumService.addImage(album_id, image_id)
      openPopup(false);
      appContext.setAppMessage('Album created successfuly.');
    } else {
      AlbumService.addImage(selected, image_id)
      openPopup(false);
      appContext.setAppMessage('Image added to album successfuly.');
    }
  }

  const cancel = () => {
    openPopup(false)
  }

  return (
    <div className="popup">
      <div className="actionBtn">
        <button className={"albumBtn" + (newAlbum ? ' selected' : '')} onClick={() => setNewAlbum(true)}>Create New Album</button>
        <button className={"albumBtn" + (newAlbum ? '' : ' selected')} onClick={() => setNewAlbum(false)}>Add To Existing</button>
      </div>
      {newAlbum === true &&
        <input type="text" placeholder="Enter title here" className="albumTitle" onChange={handleChange}></input>
      }
      {newAlbum === false &&
        <select className="selectItems" onChange={handleChangeSelect}>
          <option>Please select</option>
          {AlbumService.getAlbums().map((i) =>
            <option value={i.id} key={i.id}>{i.name}</option>
          )}
        </select>
      }
      <div className="actionBtn">
        <button className="whiteBtn" onClick={cancel}>Cancel</button>
        <button className="modalBtn" onClick={createAlbum}>Save</button>
      </div>
    </div>

  )
}

export default Popup;