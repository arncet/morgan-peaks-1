import React, {Component} from 'react';
import PupilDataService from '../services/pupil.service';
import {Link} from 'react-router-dom';

import './pupils-list.component.css';

class PupilsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchWholeName = this.onChangeSearchWholeName.bind(this);
    this.retrievePupils = this.retrievePupils.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePupil = this.setActivePupil.bind(this);
    this.removeAllPupils = this.removeAllPupils.bind(this);
    this.searchWholeName = this.searchWholeName.bind(this);
    this.deletePupil = this.deletePupil.bind(this);

    this.state = {
      pupils: [],
      currentPupil: null,
      currentIndex: -1,
      searchWholeName: '',
    };
  }

  componentDidMount() {
    this.retrievePupils();
  }

  onChangeSearchWholeName(e) {
    const searchWholeName = e.target.value;
    this.setState({
      searchWholeName: searchWholeName,
    });
  }

  retrievePupils() {
    const response = PupilDataService.getAll();
    this.setState({
      pupils: response.data,
    });
  }

  refreshList() {
    this.retrievePupils();
    this.resetActivePupil();
  }

  resetActivePupil() {
    this.setState({
      currentPupil: null,
      currentIndex: -1,
    });
  }

  setActivePupil(pupil, index) {
    this.setState({
      currentPupil: pupil,
      currentIndex: index,
    });
  }

  removeAllPupils() {
    PupilDataService.deleteAll();
    this.refreshList();
  }

  searchWholeName() {
    const response = PupilDataService.findByWholeName(this.state.searchWholeName);
    this.setState({
      pupils: response.data,
    });
  }

  deletePupil(index) {
    const response = PupilDataService.delete(index);
    this.setState({
      pupils: response.data,
    });
    this.resetActivePupil();
  }

  render() {
    const {searchWholeName, pupils, currentPupil, currentIndex} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchWholeName}
              onChange={this.onChangeSearchWholeName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchWholeName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Pupils List</h4>

          <ul className="list-group">
            {pupils &&
              pupils.map((pupil, index) => (
                <li
                  className={
                    'list-group-item ' +
                    (index === currentIndex ? 'active' : '')
                  }
                  onClick={() => this.setActivePupil(pupil, index)}
                  key={index}
                >
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deletePupil(index)}
                  >
                    Delete
                  </button>
                  <span>
                    {pupil.firstName} {pupil.lastName}
                  </span>
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPupils}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPupil ? (
            <div>
              <h4>Pupil</h4>
              <div>
                <label>
                  <strong>First name:</strong>
                </label>{' '}
                {currentPupil.firstName}
              </div>
              <div>
                <label>
                  <strong>Last name:</strong>
                </label>{' '}
                {currentPupil.lastName}
              </div>

              <Link
                to={'/pupils/' + currentPupil.id}
              >
                <button className="btn btn-warning">
                  Edit
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Pupil...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PupilsList;
