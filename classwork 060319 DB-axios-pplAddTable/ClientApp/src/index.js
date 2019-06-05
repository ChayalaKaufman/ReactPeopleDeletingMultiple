import React from 'react';
import { render } from 'react-dom';
import PersonInfo from './textBoxes';
import PeopleTable from './PeopleTable';
import axios from 'axios';

class App extends React.Component {
    state = {
        currentFirstName: '',
        currentLastName: '',
        currentAge: '',
        forDeletion: [],
        allPeople: []
    }
    onFirstNameChange = e => {
        this.setState({ currentFirstName: e.target.value })
    }

    onLastNameChange = e => {
        this.setState({ currentLastName: e.target.value })
    }

    onAgeChange = e => {
        this.setState({ currentAge: e.target.value })
    }
    onAddClick = () => {

        const copy = [...this.state.allPeople];
        const person = {
            firstName: this.state.currentFirstName,
            lastName: this.state.currentLastName,
            age: this.state.currentAge
        }

        axios.post('/api/sampledata/addperson', person).then(({ data }) => {
            copy.push(data);

            this.setState({
                currentFirstName: '',
                currentLastName: '',
                currentAge: '',
                allPeople: copy
            })
        });
    }

    //old way: 
    //onDeleteClick = (person) => {

    //    axios.post('/api/sampledata/delete', person).then(() => {
    //        const copy = [...this.state.allPeople];
    //        const filtered = copy.filter(p => p.id !== person.id);
    //        this.setState({ allPeople: filtered })
    //    });
    //}

    onDeleteClick = () => {
        axios.post('/api/sampledata/deleteAll', this.state.forDeletion).then(() => {
            const copy = [...this.state.allPeople];
            const filtered = copy.filter(n => !this.state.forDeletion.includes(n));
            this.setState({ allPeople: filtered });
        })
    }

    onDeleteSelect = (id) => {
        const exists = this.state.forDeletion.find(i => i === id);
        if (exists) {
            const copy = [...this.state.forDeletion];
            const filtered = copy.filter(n => n !== id);
            this.setState({ allPeople: filtered });
            console.log(this.state.forDeletion);
        }
        else {
            const copy = [...this.state.forDeletion];
            copy.push(id);
            this.setState({ forDeletion: copy });
        }
    }

    componentDidMount = () => {
        axios.get('/api/sampledata/getPeople').then(({ data }) => {
            this.setState({ allPeople: data });
        });
    }

    render() {
        return (
            <div className="container">
                <PersonInfo
                    currentFirstName={this.state.currentFirstName}
                    currentLastName={this.state.currentLastName}
                    currentAge={this.state.currentAge}
                    firstNameChange={this.onFirstNameChange}
                    lastNameChange={this.onLastNameChange}
                    ageChange={this.onAgeChange}
                    addClick={this.onAddClick}
                />

                <PeopleTable allPeople={this.state.allPeople}
                    forDeletion={this.state.forDeletion}
                    onDeleteClick={this.onDeleteClick}
                    onDeleteSelect={this.onDeleteSelect}
                />
            </div>
        )
    }
}
render(<App />, document.getElementById('root'));


