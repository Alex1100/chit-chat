import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button
} from 'react-bootstrap';
import {
  removeModal
} from '../actions/modal';


class SignUpConfirmedModal extends Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.props.dispatch(
      removeModal(
        this.props.history
      )
    )
  }

  render() {
    const {
      show,
      btcPrivateKey,
      ethWallet,
      btcWallet
    } = this.props;
    return (
      <div>
        <Modal show={show} onHide={this.handleModalClose}>
          <Modal.Header closeButton className="btc-pk-modal-header">
            <Modal.Title>Registered With Chit-Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body className="btc-pk-modal-body">
            <h1 className="eth-wallet-label">No Private Keys For Eth Wallet: <span className="ethWallet">{ethWallet}</span></h1>
            <h1 className="btc-pk-info">Make sure to save your private key somewhere secure. If lost, then there will be no way to retrieve account funds without it.</h1>
            <h3 className="btc-pk-label">BTC Wallet: <span className="btcWallet">{btcWallet}</span></h3>
            <h3 className="btc-security-measure-key">PRIVATE KEY FOR BTC WALLET: <span className='btcPrivateKey'>{btcPrivateKey}</span></h3>
          </Modal.Body>
          <Modal.Footer className="btc-pk-modal-footer">
            <Button onClick={this.handleModalClose} className="btc-pk-modal-close-btn">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const {
    modalState
  } = state;

  const {
    show,
    btcPrivateKey,
    btcWallet,
    ethWallet
  } = modalState;

  return{
    show,
    btcPrivateKey,
    ethWallet,
    btcWallet
  };
}

export default connect(mapStateToProps)(SignUpConfirmedModal);

