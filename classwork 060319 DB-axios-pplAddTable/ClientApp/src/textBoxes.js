import React from 'react';

export default class PersonInfo extends React.Component {
    render() {
        return (
            <div className="row">
                <br />
                
                <input type="text" className="form-control"
                    onChange={this.props.firstNameChange}
                    placeholder="First Name" value={this.props.currentFirstName} />
                <br />
                <input type="text" className="form-control"
                    onChange={this.props.lastNameChange}
                    placeholder="Last Name" value={this.props.currentLastName} />
                <br />
                <input type="text" className="form-control"
                    onChange={this.props.ageChange}
                    placeholder="Age" value={this.props.currentAge} />
                <br />
                <button onClick={this.props.addClick}
                    className="btn btn-primary">Add Person</button>
                <br />
            </div>
        )
    }
}