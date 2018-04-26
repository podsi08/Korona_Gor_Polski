import React from 'react';
import Select from 'react-select';
import Travel from './model/Travel';

class Form extends React.Component {
    constructor(props){
        super(props);

        console.log(props);
        this.state = {
            selectedName: '',
            date: '',
            note: '',
            formMessages: [],
            error: false
        }
    }

    //funkcja pobierająca dane z local storage
    getDataFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('korona_gor'))
    };



    checkData = (e) => {
        e.preventDefault();

        let error = false;
        let messages = [];

        if(this.state.selectedName === ""){
            error = true;
            messages.push(<h3 className='error_message'>Musisz wybrać górę</h3>)
        }

        if(this.state.date.length === 0){
            error = true;
            messages.push(<h3 className='error_message'>Musisz wybrać datę</h3>)
        }

        //jeżeli nie ma błędu, tworzony jest nowy obiekt newTravel wg modelu w ./model/Travel.js
        if (!error){
            messages.push(<h3 className='info_message'>Twoja wycieczka została dodana</h3>);

            let newTravel = new Travel (
                this.state.selectedName.value,
                this.state.date,
                this.state.note
            );

            //wczytuję aktualne dane z local storage
            let storageData = this.getDataFromLocalStorage();

            //jeżeli nic nie ma w local storage to tworzę nową tablicę z obiektem, jeżeli już istnieje tablica
            //z danymi, dodaje na jej koniec nowy obiekt

            if(storageData !== null){
                storageData.push(newTravel);
                this.props.saveToLocalStorage(storageData);
            } else {
                this.props.saveToLocalStorage([newTravel]);
            }

            //po zatwierdzeniu czyszczę okna formularza
            this.setState({
                selectedName: '',
                date: '',
                note: ''
            });
        }

        this.setState({
            formMessages: messages,
            error: error
        })

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

        this.props.mountains.filter((mount) => {
            return this.props.gainedMountains.indexOf(mount.name) === -1
        }).forEach((mount) => {
            mountainsToGain.push({value: mount.name, label: mount.name})
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
                            className='select'
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

                    <div>
                        {this.state.formMessages}
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