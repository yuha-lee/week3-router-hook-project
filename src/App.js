import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import RecipeDetail from "./components/RecipeDetail";
import Chef from "./components/Chef";
import ChefDetail from "./components/ChefDetail";
import RecipeFind from "./components/RecipeFind";
import RecipeNews from "./components/RecipeNews";

/*
  index.js
  ReactDom.render(<App/>, document.getElementById('root'))
  <App/> => html 읽음 => <div id="root"></div>
 */
function App() {
  return (
    <Router>
      <Header/>
      <div className={"container-fluid"}>
        <div className={"jumbotron"}>
          <Switch>
            <Route exact path={"/"} component={Recipe}></Route>
            <Route path={"/recipe_detail/:no"} component={RecipeDetail}></Route>
            <Route path={"/chef"} component={Chef}></Route>
            <Route path={"/chef_detail"} component={ChefDetail}></Route>
            <Route path={"/news"} component={RecipeNews}></Route>
            <Route path={"/find"} component={RecipeFind}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
