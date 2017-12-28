export const UPDATE_USERNAME_INPUT = "UPDATE_USERNAME_INPUT";
export const UPDATE_EMAIL_INPUT = "UPDATE_EMAIL_INPUT";
export const UPDATE_PASSWORD_INPUT = "UPDATE_PASSWORD_INPUT";
export const CLEAR_LOGIN = "CLEAR_LOGIN";

const updateUsername = (usr) => ({
  type: "UPDATE_USERNAME_INPUT",
  username: usr,
});

const updateEmail = (email) => ({
  type: "UPDATE_EMAIL_INPUT",
  email,
});

const updatePassword = (pwd) => ({
  type: "UPDATE_PASSWORD_INPUT",
  password: pwd,
});

const inputUsername = (usr) => (dispatch) => {
  dispatch(updateUsername(usr));
};

const inputEmail = (email) => (dispatch) => {
  dispatch(updateEmail(email));
};

const inputPassword = (pwd) => (dispatch) => {
  dispatch(updatePassword(pwd));
};

export { inputUsername, inputEmail, inputPassword };
