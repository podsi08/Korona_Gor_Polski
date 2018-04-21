import React from 'react';
import Select from 'react-select';

class Form extends React.Component {
    constructor(props){
        super(props);

        console.log(props);
        this.state = {
            selectedName: '',
            date: '',
            note: '',
            errorMessage: [],
            error: false
        }
    }

    //funkcja pobierająca dane z local storage
    getDataFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('korona_gor'))
    };

    //funkcja zapisująca do local storage
    saveToLocalStorage = (data) => {
        localStorage.setItem('korona_gor', JSON.stringify(data));
    };

    checkData = (e) => {
        e.preventDefault();

        // if(this.state.name.length === 0){
        //     this.setState({
        //         errorMessage: [...this.state.errorMessage, 'Musisz wybrać górę'],
        //         error: true
        //     })
        // }

        if(this.state.date.length === 0){
            this.setState({
                errorMessage: [...this.state.errorMessage, 'Musisz wybrać datę'],
                error: true
            })
        }

        //jeżeli nie ma błędu, tworzony jest nowy obiekt newTravel
        if (!this.state.error){

            let newTravel = {
                name: this.state.selectedName.value,
                date: this.state.date,
                note: this.state.note
            };

            //wczytuję aktualne dane z local storage
            let storage = this.getDataFromLocalStorage();

            //jeżeli nic nie ma w local storage to tworzę nową tablicę z obiektem, jeżeli już istnieje tablica
            //z danymi, dodaje na jej koniec nowy obiekt

            if(storage !== null){
                storage.push(newTravel);
                this.saveToLocalStorage(storage);
            } else {
                this.saveToLocalStorage([newTravel]);
            }

            //po zatwierdzeniu czyszczę okna formularza
            this.setState({
                selectedName: '',
                date: '',
                note: ''

            });
        }
    };

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSelectChange = (selectedOption) => {

        this.setState({
            selectedName: selectedOption
        })
    };

    render(){
        //przygotowanie danych do select (filtruję tylko góry, które nie zostały zdobyte)
        const mountainsToGain = [];

        this.props.data.filter((elem) => {
            return this.props.gainedMountains.indexOf(elem.name) === -1
        }).forEach((elem) => {
            mountainsToGain.push({value: elem.name, label: elem.name})
        });

        return(
            <div className='form'>
                <h1>Dodaj swoje wspomnienia</h1>
                <form>
                    <h3>Jaką zdobyłeś górę?</h3>
                    <Select name='mountain'
                            value={this.state.selectedName}
                            options={mountainsToGain}
                            onChange={this.handleSelectChange}
                            />
                    <h3>Data zdobycia:</h3>
                    <input type='date'
                           id='date'
                           value={this.state.date}
                           onChange={this.handleInput}/>
                    <h3>Opisz swoją wędrówkę:</h3>
                    <textarea id='note'
                           value={this.state.note}
                           onChange={this.handleInput}/><br/>
                    <div className='error_message'>
                        {
                            this.state.errorMessage.map((msg) => {
                                return <div>{msg}</div>
                            })
                        }
                    </div>
                    <input type='submit' value='Dodaj podróż' onClick={this.checkData}/>
                </form>
            </div>
        )
    }
}

// function saveToLocalStorage(data) {
//     localStorage.setItem(taskListLocalStorageKey, JSON.stringify(data));
// }
//
// var taskListLocalStorageKey = 'to_do_list';
//
// //wczytanie danych z local storage
// var storage = JSON.parse(localStorage.getItem(taskListLocalStorageKey));
//
// localStorage.removeItem(taskListLocalStorageKey);

export default Form