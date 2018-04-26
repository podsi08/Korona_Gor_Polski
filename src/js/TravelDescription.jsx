import React from "react";

class TravelDescription extends React.Component {
    constructor(props){
        super(props);

        //tworzę referencje, które zostaną wykorzystane przy edycji notatek z podróży (przekazuję this.noteRef.current.innerText
        //jako parametr do funkcji będącej callbackiem kliknięcia w przycisk "zapisz", wartość ta jest w funkcji editNote w
        // YourTravel zapisywana do local storage
        this.dateRef = React.createRef();
        this.noteRef = React.createRef();

        this.state = {
            contenteditable: false,
            buttonText: 'Edytuj notatkę'
        }
    }

    handleClickDelete = () => {
        if(typeof this.props.deleteNoteClick === 'function') {
            this.props.deleteNoteClick(this.props.mountain.name);
        }
    };

    handleClickEdit = () => {
        if(!this.state.contenteditable) {
            this.setState({
                contenteditable: true,
                buttonText: 'Zapisz'
            })

        } else {

            if(typeof this.props.editNoteClick === 'function') {
                this.props.editNoteClick(this.props.mountain.name, this.dateRef.current.innerText, this.noteRef.current.innerText);
            }

            this.setState({
                contenteditable: false,
                buttonText: 'Edytuj notatkę'
            })
        }
    };


    //jeżeli istnieje notatka o zdobyciu wybranej góry to ją wyświetl, jeżeli nie, wyświetl
    //motywującą wiadomość

    renderNote = () => {
        //jeżeli góra jest nizdobyta w propsie przekazany zostaie 'undefined'
        if (typeof this.props.travel !== 'undefined') {
            return(
                <React.Fragment>
                    <h3>Data zdobycia: <span ref={this.dateRef} contentEditable={this.state.contenteditable}>{this.props.travel.date}</span></h3>
                    <div ref={this.noteRef} contentEditable={this.state.contenteditable} className='note'>{this.props.travel.note}</div>
                    <div>
                        <div onClick={this.handleClickEdit} className='note_btn'>{this.state.buttonText}</div>
                        <div onClick={this.handleClickDelete} className='note_btn'>Usuń podróż</div>
                    </div>
                </React.Fragment>
            )
        } else {
            return <span>{this.props.motivationMessage}</span>
        }
    };


    render(){
        //jeżeli wybrano górę, wyświetl informacje o wycieczce lub motywującą wiadomość, jeżeli nie info o wybraniu góry
        if (this.props.mountain !== null) {
            return(
                <div className='description'>
                    <h1>{this.props.mountain.name}</h1>
                    <h3>{this.props.mountain.chain}</h3>
                    <h3>{this.props.mountain.height} m n.p.m.</h3>
                    {this.renderNote()}
                </div>
            )
        } else {
            return(
                <div className='description'>
                    <h1>{this.props.prompt}</h1>
                </div>
            )
        }


    }
}

export default TravelDescription;