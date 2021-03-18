import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import './classroom.component.css';

import AddPupil from './add-pupil.component';
import Pupil from './pupil.component';
import PupilsList from './pupils-list.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={'/'} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/pupils'} className="nav-link">
                List of pupils
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/add'} className="nav-link">
                Add a new pupil
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/pupils']} component={PupilsList} />
            <Route exact path="/add" component={AddPupil} />
            <Route path="/pupils/:id" component={Pupil} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
