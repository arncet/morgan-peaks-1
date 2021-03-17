import React, {Component} from 'react';
import PupilDataService from '../services/pupil.service';

import './pupil.component.css';

class Pupil extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.getPupil = this.getPupil.bind(this);
    this.updatePupil = this.updatePupil.bind(this);
    this.deletePupil = this.deletePupil.bind(this);

    this.state = {
      currentPupil: {
        id: null,
        firstName: '',
        lastName: '',
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getPupil(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPupil: {
          ...prevState.currentPupil,
          firstName: firstName,
        },
      };
    });
  }

  onChangeLastName(e) {
    const lastName = e.target.value;

    this.setState((prevState) => ({
      currentPupil: {
        ...prevState.currentPupil,
        lastName: lastName,
      },
    }));
  }

  getPupil(id) {
    const response = PupilDataService.get(id);
    this.setState({
      currentPupil: response.data,
    });
    console.log(response.data);
  }

  updatePupil() {
    const response = PupilDataService.update(
        this.state.currentPupil.id,
        this.state.currentPupil,
    );
    console.log(response.data);
    this.setState({
      message: 'The pupil was updated successfully!',
    });
  }

  deletePupil() {
    const response = PupilDataService.delete(this.state.currentPupil.id);
    console.log(response.data);
    this.props.history.push('/pupils');
  }


  render() {
    const {currentPupil} = this.state;

    return (
      <div>
        {currentPupil ? (
          <div className="edit-form">
            <h4>Pupil</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={currentPupil.firstName}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={currentPupil.lastName}
                  onChange={this.onChangeLastName}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePupil}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePupil}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pupil...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Pupil;
