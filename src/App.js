import './App.css';
import {Navbar} from "./route/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {PlayerStatusRoute} from "./route/playerStatus/PlayerStatusRoute";

function App() {
  return (
      <Routes>
          <Route path='/' element={<Navbar />}>
              <Route path='player-status' element={<PlayerStatusRoute />} />
              {/*<Route path='shop' element={<Shop />} />*/}
              {/*<Route path='sign-in' element={<SignIn />} />*/}
          </Route>
      </Routes>
  );
}

export default App;
