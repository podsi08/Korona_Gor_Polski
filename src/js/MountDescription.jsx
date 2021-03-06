import React from "react";

class MountDescription extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class: ''
        }
    }

    //to do zmiany na getDerivedStateFromProps lub inny cykl życia
    componentWillReceiveProps(){
        this.setState({
            class: 'animated fadeIn'
        }, ()=>{
            setTimeout(() => {
                this.setState({
                    class: ''
                })
            }, 500)
        })
    }

    // componentDidUpdate(prevProps, prevState){
    //     console.log(this.state.class)
    //     if(prevState.class === ''){
    //         this.setState({
    //             class: 'animated fadeIn'
    //         })
    //         // , ()=>{
    //         //     setTimeout(() => {
    //         //         this.setState({
    //         //             class: ''
    //         //         })
    //         //     }, 500)
    //         // })
    //     }
    // }

    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log('działa');
    //     return(
    //         {class: 'animated fadeIn'}
    //     )
    // }

    render(){
        if(this.props.mountain !== null) {
            return(
                <div className='description'>
                    <div className={this.state.class}>
                        <h1>{this.props.mountain.name}</h1>
                        <h3>{this.props.mountain.chain}</h3>
                        <h3>{this.props.mountain.height} m n.p.m.</h3>
                        <span>{this.props.mountain.description}</span>
                    </div>
                </div>
            )
        } else {
            //wykona się jeżeli nie wybrano góry
            return(
                <div className='info'>
                    <h1>{this.props.prompt}</h1>
                    <span>{this.props.info}</span>
                </div>
            )
        }

    }
}

export default MountDescription