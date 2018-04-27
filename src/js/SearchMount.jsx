import React from 'react';
import Select from 'react-select';
import polishAlphabetSort from './utils';

class SearchMount extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedMount: ''
        }
    }

    handleSelectChange = (selectedOption) => {
        if(typeof this.props.newSearching === 'function') {
            this.props.newSearching(selectedOption.value)
        }

        this.setState({
            selectedMount: selectedOption
        });
    };

    render(){
        //przygotowanie danych do select (filtruję tylko góry, które nie zostały zdobyte)
        let mountains = [];

        //tworzę tablicę z nazwami gór, które zostaną posortowane alfabetycznie
        let mountArray = this.props.mountains.map(mount => mount.name);

        mountArray.sort(polishAlphabetSort);

        //z posortowanej tablicy tworzę obiekty wykorzystywane przez select
        mountArray.forEach(mount => {
            mountains.push({value: mount, label: mount})
        });

        return(
            <Select name='mountain'
                    value={this.state.selectedMount}
                    options={mountains}
                    onChange={this.handleSelectChange}
                    className='search'
            />
        )
    }
}

export default SearchMount;