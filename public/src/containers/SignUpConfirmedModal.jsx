import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Popover,
  Tooltip,
  Button,
  OverlayTrigger
} from 'react-bootstrap';


class SignUpConfirmedModal extends Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose(e) {
    //some logic
  }

  render() {
    const { show, btcPrivateKey } = this.props;

    return (
      <div>
        <Modal show={show} onHide={this.handleModalClose}>
          <Modal.Header closeButton className="btc-pk-modal-header">
            <Modal.Title>Registered With Chit-Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body className="btc-pk-modal-body">
            <h1 className="btc-pk-info">Make sure to save your private key somewhere secure. If lost, then there will be no way to retrieve account funds without it.</h1>
            <label className="btc-pk-label">BTC Private Key</label>
            <h3 className="btc-security-measure-key">{btcPrivateKey}</h3>
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
  const {modalState} = state;
  const {show, btcPrivateKey} = modalState;
  return{
    show,
    btcPrivateKey
  };
}

export default connect(mapStateToProps)(SignUpConfirmedModal);

