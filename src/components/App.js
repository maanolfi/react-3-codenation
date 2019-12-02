import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'


class App extends Component {

  state = { recipe: [] }

  render() {

    const HomeRoute = ({ match }) => (
      <Home searchString={match ? match.params.searchString || '' : ''} />
    )

    const RecipePageRoute = ({ match }) => (
      <RecipePage searchString={match ? match.params.recipe || '' : ''} />
    )


    return (

      <div className="App">
        <Route exact path="/search/:searchString?" children={({ match }) => (
          <Navbar
            searchString={match ? match.params.searchString || '' : ''}
          />
        )} />

        <div className="container mt-10">
          <Switch>
            <Route path="/recipe/:recipe" component={RecipePageRoute} />
            <Route path="/search/:searchString?" component={HomeRoute} />

            <Redirect to="/search" />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)