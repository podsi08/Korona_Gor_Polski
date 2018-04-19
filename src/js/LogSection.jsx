import React from 'react';

class LogSection extends React.Component {
    render(){
        return(
            <div className='container animated slideInRight'>
                <Register/>
                <Log/>
            </div>
        )
    }
}

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            surname: '',
            login: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    checkData = (e) => {
        e.preventDefault();


        if(this.state.name.length === 0) {
            this.setState({
                errorMessage: 'Pole imię musi zostać uzupełnione',
                error: true
            })
        } else if (this.state.name.length === 0) {
            this.setState({
                errorMessage: 'Pole nazwisko musi zostać uzupełnione',
                error: true
            })
        } else if (this.state.login.length === 0) {
            this.setState({
                errorMessage: 'Musisz podać login',
                error: true
            })
        } else if (this.state.password.length === 0) {
            this.setState({
                errorMessage: 'Musisz podać hasło',
                error: true
            })
        }

        if(!this.state.error){
            const newUser = {
                name: this.state.name,
                surname: this.state.surname,
                login: this.state.login,
                password: this.state.password,
                notes: []
            };

            fetch('http://localhost:3002/users', {
                method: 'POST',
                body: JSON.stringify(newUser)
            });

        }
    };

    render(){
        return(
            <div>
                <h1>Zarejestruj się</h1>
                <form>
                    <div>
                        {this.state.errorMessage}
                    </div>
                    <h2>Podaj imię:</h2>
                    <input type='text'
                           id='name'
                           value={this.state.text}
                           onChange={this.handleInput}/>
                    <h2>Podaj nazwisko:</h2>
                    <input type='text'
                           id='surname'
                           value={this.state.text}
                           onChange={this.handleInput}/>
                    <h2>Podaj login:</h2>
                    <input type='text'
                           id='login'
                           value={this.state.text}
                           onChange={this.handleInput}/>
                    <h2>Podaj hasło:</h2>
                    <input type='password'
                           id='password'
                           value={this.state.text}
                           onChange={this.handleInput}/><br/>
                    <input type='submit' value='Zarejestruj się' onClick={this.checkData}/>
                </form>
            </div>
        )
    }
}

class Log extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            login: '',
            password: '',
            data: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    checkData = (e) => {
        e.preventDefault();

        fetch('http://localhost:3002/users').then(response => {
            return response.json()
        }).then(data => {
            this.setState({
                data: data
            });
            console.log(data)
        }).catch(err => {
            console.log(err)
        });

        console.log(this.state.data);
        // let chosenUser = this.state.data.filter((elem) => {
        //     return this.state.data.login === elem.login;
        // });
        //
        // console.log(chosenUser);
    };

    render(){
        return(
            <div>
                <h1>Zarejestruj się</h1>
                <form>
                    <h2>Podaj login:</h2>
                    <input type='text'
                           id='login'
                           value={this.state.text}
                           onChange={this.handleInput}/>
                    <h2>Podaj hasło:</h2>
                    <input type='password'
                           id='password'
                           value={this.state.text}
                           onChange={this.handleInput}/><br/>
                    <input type='submit' value='Zaloguj się' onClick={this.checkData}/>
                </form>
            </div>
        )
    }
}

export default LogSection