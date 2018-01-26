export const HIDE_MODAL = "HIDE_MODAL";


const hideModal = () => ({
  type: HIDE_MODAL,
  show: false,
  btcPrivateKey: "",
  ethWallet: "",
  btcWallet: ""
});


const removeModal = (history) => (dispatch) => {
  dispatch(hideModal());
  history.push("/");
};

export {
  removeModal
};
