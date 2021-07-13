import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import OfflineHome from "./components/OfflineHome";
import Login from "./components/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import OnHome from "./components/OnHome";
import Dashboard from "./components/Dashboard";
import AboutUs from "./components/AboutUs";
import PrivateRoute from "./PrivateRoute";

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
            <Route exact path="/About">
              <AboutUs />
            </Route>
            {/* <Route exact path="/Dashboard">
              <Dashboard />
            </Route> */}
            <PrivateRoute exact path="/Dashboard" component={Dashboard} />
            {/* <Route exact path="/Onhome">
              <OnHome />
            </Route> */}
            <PrivateRoute exact path="/Onhome" component={OnHome} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
