import {
  HIDE_MODAL
} from '../actions/modal';

import {
  SHOW_MODAL
} from '../actions/auth';

const modalState = (state = {
  show: false,
  btcPrivateKey: '',
  ethWallet: '',
  btcWallet: "",
},
action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: action.show,
        btcPrivateKey: action.btcPrivateKey,
        ethWallet: action.ethWallet,
        btcWallet: action.btcWallet
      };
    case HIDE_MODAL:
      return {
        ...state,
        show: action.show,
        btcPrivateKey: action.btcPrivateKey,
        ethWallet: action.ethWallet,
        btcWallet: action.btcWallet
      };
    default:
      return state;
  }
};

export default modalState;
