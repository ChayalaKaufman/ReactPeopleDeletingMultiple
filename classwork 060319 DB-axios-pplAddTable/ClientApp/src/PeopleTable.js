import React from 'react';

export default class PeopleTable extends React.Component {
    render() {
        const { allPeople, onDeleteClick, onDeleteSelect } = this.props;
        return (
            <div>
            <button className="btn btn-info" onClick={onDeleteClick}>Delete All</button>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Delete</th>
                    </tr>
                    {allPeople.map((person, index) =>
                            < tr style={/*{ backgroundColor: '#FF0000' }*/} key={index} >
                            <td>{person.id}</td>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.age}</td>
                            <td>
                                    <input type="checkbox"
                                        className="selected"
                                        onChange={() => onDeleteSelect(person.id)}
                                    />
                            </td>
                        </tr >
                    )}
                </tbody>
                </table>
                </div>)
    }
}