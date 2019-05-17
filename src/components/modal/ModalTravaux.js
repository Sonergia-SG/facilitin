/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';


class  ModalTravaux extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: this.props.open,
            moe:this.props.travauxValues
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({open: newProps.open});
    }

    onCloseModal = () => {
        this.setState({ open: false });
        this.props.onCloseModalType('travaux');
    };

    render(){
        return(
            <div>
                <Modal open={this.state.open}
                       onClose={this.onCloseModal}
                       center
                       styles={{ modal: {border:"2px #00D1B2 solid", }}}
                >
                    <h1 className="modal_title">TRAVAUX</h1>
                    <table className="modal_table">
                    </table>
                </Modal>
            </div>
        )
    }
}

export default ModalTravaux;