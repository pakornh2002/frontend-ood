import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import payment from "./component/payment"
import admin from "./component/admin"

function App(){
  return(
    <Router>
      <Switch>
        <Route path="/" component={payment} exact/>
        <Route path="/admin" component={admin} exact/>
      </Switch>
    </Router>
  )
}

export default App;