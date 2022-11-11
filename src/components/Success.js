const { useContext } = React;
import AppContext from "../contexts/AppContext";

const Success = () => {
  const appContext = useContext(AppContext);

  return appContext.message === null ? null : (
    <div className="success">
      {appContext.message}
      <button onClick={() => appContext.setAppMessage(null)} className="close">X</button>
    </div>

  )
}

export default Success;