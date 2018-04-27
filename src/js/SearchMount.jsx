import React from 'react';
import Select from 'react-select';

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

    //funkcja sortująca napisy z uwzględnieniem polskich znaków
    mySort = (alphabet) => {
        return function(a, b) {
            let indexA = alphabet.indexOf(a[0]);
            let indexB = alphabet.indexOf(b[0]);

            if (indexA === indexB) {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
                return 0;
            } else {
                return indexA - indexB;
            }
        }
    };

    render(){
        //przygotowanie danych do select (filtruję tylko góry, które nie zostały zdobyte)
        let mountains = [];
        const alphabet = 'AaĄąBbCcĆćDdEeFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż';

        //tworzę tablicę z nazwami gór, które zostaną posortowane alfabetycznie
        let mountArray = this.props.mountains.map(mount => mount.name);

        mountArray.sort(this.mySort(alphabet));

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