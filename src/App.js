import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import OfflineHome from "./components/OfflineHome";
import Login from "./components/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import OnHome from "./components/OnHome";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/Offhome">
              <OfflineHome />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/Dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/Onhome">
              <OnHome />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
