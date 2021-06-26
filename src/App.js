import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import OfflineHome from "./components/OfflineHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/Offhome">
            <OfflineHome />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
