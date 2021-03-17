import React, {Component} from 'react';
import PupilDataService from '../services/pupil.service';

export default class AddPupil extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.savePupil = this.savePupil.bind(this);
    this.newPupil = this.newPupil.bind(this);

    this.state = {
      id: null,
      firstName: '',
      lastName: '',

      submitted: false,
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  savePupil() {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    const response = PupilDataService.create(data);
    this.setState({
      id: response.data.id,
      firstName: response.data.firstName,
      lastName: response.data.lastName,

      submitted: true,
    });
    console.log(response.data);
  }

  newPupil() {
    this.setState({
      id: null,
      firstName: '',
      lastName: '',

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={this.newPupil}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={this.state.lastName}
              onChange={this.onChangeLastName}
              name="lastName"
            />
          </div>

          <button onClick={this.savePupil} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
      </div>
    );
  }
}
